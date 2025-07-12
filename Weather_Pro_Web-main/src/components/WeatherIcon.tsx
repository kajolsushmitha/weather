import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle, 
  Cloudy,
  CloudFog
} from 'lucide-react';

interface Props {
  code: string;
  size?: number;
  className?: string;
}

export default function WeatherIcon({ code, size = 24, className = '' }: Props) {
  const getIcon = () => {
    switch (code) {
      case '01d':
      case '01n':
        return <Sun size={size} className={`${className} text-yellow-400`} />;
      case '02d':
      case '02n':
        return <Cloudy size={size} className={`${className} text-gray-400`} />;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <Cloud size={size} className={`${className} text-gray-400`} />;
      case '09d':
      case '09n':
        return <CloudDrizzle size={size} className={`${className} text-blue-400`} />;
      case '10d':
      case '10n':
        return <CloudRain size={size} className={`${className} text-blue-400`} />;
      case '11d':
      case '11n':
        return <CloudLightning size={size} className={`${className} text-yellow-400`} />;
      case '13d':
      case '13n':
        return <CloudSnow size={size} className={`${className} text-blue-200`} />;
      case '50d':
      case '50n':
        return <CloudFog size={size} className={`${className} text-gray-400`} />;
      default:
        return <Sun size={size} className={`${className} text-yellow-400`} />;
    }
  };

  return getIcon();
}