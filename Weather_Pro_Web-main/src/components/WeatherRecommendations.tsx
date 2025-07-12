import { Shirt, Umbrella, Wind, Sun } from 'lucide-react';

interface Props {
  temp: number;
  weatherMain: string;
  windSpeed: number;
  time: number;
}

export default function WeatherRecommendations({ temp, weatherMain, windSpeed, time }: Props) {
  const getClothingRecommendation = () => {
    if (temp < 0) return { text: 'Bundle up! Wear a heavy winter coat, gloves, and a hat.', icon: <Shirt className="text-blue-300" /> };
    if (temp < 10) return { text: 'Wear a warm coat and layers.', icon: <Shirt className="text-blue-400" /> };
    if (temp < 20) return { text: 'A light jacket or sweater would be comfortable.', icon: <Shirt className="text-green-400" /> };
    if (temp < 25) return { text: 'Perfect for a t-shirt or light clothing.', icon: <Shirt className="text-yellow-400" /> };
    return { text: 'Light, breathable clothing recommended.', icon: <Shirt className="text-orange-400" /> };
  };

  const getActivityRecommendation = () => {
    const hour = new Date(time * 1000).getHours();
    const isDaytime = hour >= 6 && hour <= 20;

    if (weatherMain.toLowerCase().includes('rain')) {
      return { text: 'Indoor activities recommended. Visit a museum or catch up on reading.', icon: <Umbrella className="text-blue-400" /> };
    }
    
    if (windSpeed > 10) {
      return { text: 'Strong winds - avoid cycling or outdoor events.', icon: <Wind className="text-gray-400" /> };
    }

    if (isDaytime && temp >= 15 && temp <= 25) {
      return { text: 'Perfect weather for outdoor activities like hiking or sports!', icon: <Sun className="text-yellow-400" /> };
    }

    if (temp > 30) {
      return { text: 'Stay hydrated and avoid strenuous outdoor activities.', icon: <Sun className="text-orange-400" /> };
    }

    return { text: 'Moderate conditions - most activities are suitable.', icon: <Sun className="text-yellow-400" /> };
  };

  const clothing = getClothingRecommendation();
  const activity = getActivityRecommendation();

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      <h3 className="text-lg font-medium text-white mb-4">Today's Recommendations</h3>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="mt-1">{clothing.icon}</div>
          <div>
            <p className="text-sm font-medium text-white/90">Clothing</p>
            <p className="text-sm text-white/70">{clothing.text}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1">{activity.icon}</div>
          <div>
            <p className="text-sm font-medium text-white/90">Activities</p>
            <p className="text-sm text-white/70">{activity.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}