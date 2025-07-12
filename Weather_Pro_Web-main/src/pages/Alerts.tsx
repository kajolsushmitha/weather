import { Toaster } from 'react-hot-toast';
import AlertForm from '../components/AlertForm';
import AlertSender from '../components/AlertSender';
import AlertInfo from '../components/AlertInfo';

export default function Alerts() {
  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchLocationName(position.coords.latitude, position.coords.longitude);
        },
        () => {
          toast.error('Unable to retrieve your location');
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  };

  const fetchLocationName = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=24eda372ca98c1a40cde6e83fa7cd3b5`
      );
      const data = await response.json();
      if (data.length > 0) {
        setFormData(prev => ({
          ...prev,
          location: data[0].name
        }));
      }
    } catch (error) {
      console.error('Error fetching location name:', error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 py-12 px-4">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Weather Alerts</h1>
          <p className="text-xl text-white/80">Stay informed about weather changes in your area</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Subscribe to Alerts</h2>
            <AlertForm onLocationDetect={handleLocationDetect} />
          </div>

          <div className="space-y-6">
            <AlertSender />
            <AlertInfo />
          </div>
        </div>
      </div>
    </div>
  );
}