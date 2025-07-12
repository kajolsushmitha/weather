import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { WeatherData } from '../types/weather';
import WeatherIcon from '../components/WeatherIcon';

// Custom marker icon
const customIcon = new Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function MapClickHandler({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapView() {
  const [selectedLocation, setSelectedLocation] = useState<[number, number]>([20, 0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const API_KEY = '24eda372ca98c1a40cde6e83fa7cd3b5';

  const fetchWeather = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeather(data);
      setSelectedLocation([lat, lng]);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    fetchWeather(lat, lng);
  };

  useEffect(() => {
    // Get user's location on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedLocation([latitude, longitude]);
          fetchWeather(latitude, longitude);
        },
        () => {
          console.log('Unable to retrieve your location');
        }
      );
    }
  }, []);

  return (
    <div className="h-[calc(100vh-4rem)] relative">
      <div className="absolute top-4 left-4 right-4 z-10 bg-white/90 backdrop-blur-md rounded-lg p-4 shadow-lg max-w-md mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Interactive Weather Map</h2>
        <p className="text-sm text-gray-600">Click anywhere on the map to check the weather for that location.</p>
      </div>
      
      <MapContainer
        center={selectedLocation}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler onLocationSelect={handleLocationSelect} />
        {weather && (
          <Marker position={selectedLocation} icon={customIcon}>
            <Popup className="weather-popup">
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
                  <h3 className="font-bold text-xl mb-1">{weather.name}</h3>
                  <div className="flex items-center">
                    <WeatherIcon code={weather.weather[0].icon} size={40} className="mr-2" />
                    <span className="text-3xl font-bold">{Math.round(weather.main.temp)}°C</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 capitalize mb-3">{weather.weather[0].description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500 text-sm">Humidity</p>
                      <p className="font-semibold">{weather.main.humidity}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Wind</p>
                      <p className="font-semibold">{weather.wind.speed} m/s</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Pressure</p>
                      <p className="font-semibold">{weather.main.pressure} hPa</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Feels Like</p>
                      <p className="font-semibold">{Math.round(weather.main.feels_like)}°C</p>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}