import { Shield, Sun, Flower2, Wind, AlertTriangle } from 'lucide-react';

interface Props {
  temp: number;
  humidity: number;
  visibility: number;
  pressure: number;
}

interface HealthMetric {
  label: string;
  value: number;
  description: string;
  icon: JSX.Element;
  color: string;
  tips: string[];
}

export default function HealthIndex({ temp, humidity, visibility, pressure }: Props) {
  const calculateUVIndex = (temp: number): number => {
    return Math.min(Math.max(Math.round((temp - 10) / 3), 0), 11);
  };

  const calculateAirQuality = (visibility: number): number => {
    return Math.min(Math.max(Math.round(visibility / 1000), 0), 500);
  };

  const calculatePollenCount = (humidity: number, pressure: number): number => {
    return Math.min(Math.max(Math.round((humidity / 2) + (pressure / 20)), 0), 12);
  };

  const uvIndex = calculateUVIndex(temp);
  const airQuality = calculateAirQuality(visibility);
  const pollenCount = calculatePollenCount(humidity, pressure);

  const getUVCategory = (index: number): HealthMetric => {
    if (index <= 2) return {
      label: 'Low',
      value: index,
      description: 'Safe for outdoor activities',
      icon: <Sun className="text-green-400" />,
      color: 'bg-green-400',
      tips: ['No protection required', 'Safe to stay outside']
    };
    if (index <= 5) return {
      label: 'Moderate',
      value: index,
      description: 'Take precautions',
      icon: <Sun className="text-yellow-400" />,
      color: 'bg-yellow-400',
      tips: ['Wear sunscreen', 'Seek shade during midday']
    };
    return {
      label: 'High',
      value: index,
      description: 'Limit sun exposure',
      icon: <Sun className="text-red-400" />,
      color: 'bg-red-400',
      tips: ['Avoid sun exposure between 10am-4pm', 'Wear protective clothing']
    };
  };

  const getAirQualityCategory = (aqi: number): HealthMetric => {
    if (aqi <= 50) return {
      label: 'Good',
      value: aqi,
      description: 'Air quality is satisfactory',
      icon: <Wind className="text-green-400" />,
      color: 'bg-green-400',
      tips: ['Ideal for outdoor activities', 'No health risks']
    };
    if (aqi <= 100) return {
      label: 'Moderate',
      value: aqi,
      description: 'Acceptable air quality',
      icon: <Wind className="text-yellow-400" />,
      color: 'bg-yellow-400',
      tips: ['Sensitive groups should reduce prolonged outdoor exertion']
    };
    return {
      label: 'Poor',
      value: aqi,
      description: 'Air quality is unhealthy',
      icon: <Wind className="text-red-400" />,
      color: 'bg-red-400',
      tips: ['Avoid outdoor activities', 'Keep windows closed']
    };
  };

  const getPollenCategory = (count: number): HealthMetric => {
    if (count <= 4) return {
      label: 'Low',
      value: count,
      description: 'Low pollen levels',
      icon: <Flower2 className="text-green-400" />,
      color: 'bg-green-400',
      tips: ['Good time for outdoor activities', 'Low risk for allergies']
    };
    if (count <= 8) return {
      label: 'Moderate',
      value: count,
      description: 'Moderate pollen levels',
      icon: <Flower2 className="text-yellow-400" />,
      color: 'bg-yellow-400',
      tips: ['Take allergy medication if sensitive', 'Keep windows closed']
    };
    return {
      label: 'High',
      value: count,
      description: 'High pollen levels',
      icon: <Flower2 className="text-red-400" />,
      color: 'bg-red-400',
      tips: ['Stay indoors if possible', 'Use air purifiers']
    };
  };

  const uvMetric = getUVCategory(uvIndex);
  const airMetric = getAirQualityCategory(airQuality);
  const pollenMetric = getPollenCategory(pollenCount);

  const getOverallHealthRisk = (): string => {
    const riskFactors = [uvMetric, airMetric, pollenMetric].filter(m => 
      m.label === 'High' || m.label === 'Poor'
    ).length;

    if (riskFactors >= 2) return 'High health risk. Take necessary precautions.';
    if (riskFactors === 1) return 'Moderate health risk. Stay aware of conditions.';
    return 'Low health risk. Conditions are favorable.';
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-6 h-6 text-blue-400" />
        <h3 className="text-lg font-medium text-white">Health Index</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[uvMetric, airMetric, pollenMetric].map((metric, index) => (
          <div key={index} className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {metric.icon}
                <span className="text-sm font-medium text-white">{
                  index === 0 ? 'UV Index' : 
                  index === 1 ? 'Air Quality' : 
                  'Pollen Count'
                }</span>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                metric.label === 'Low' || metric.label === 'Good' ? 'bg-green-400/20 text-green-400' :
                metric.label === 'Moderate' ? 'bg-yellow-400/20 text-yellow-400' :
                'bg-red-400/20 text-red-400'
              }`}>
                {metric.label}
              </span>
            </div>
            <p className="text-sm text-white/70 mb-2">{metric.description}</p>
            <ul className="text-xs text-white/60 space-y-1">
              {metric.tips.map((tip, i) => (
                <li key={i} className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-white/40 rounded-full" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 bg-white/5 rounded-lg p-4">
        <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-white mb-1">Overall Health Advisory</p>
          <p className="text-sm text-white/70">{getOverallHealthRisk()}</p>
        </div>
      </div>
    </div>
  );
}