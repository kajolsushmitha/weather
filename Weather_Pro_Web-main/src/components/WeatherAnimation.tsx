import { useEffect, useState } from 'react';

interface Props {
  weatherType: string;
}

export default function WeatherAnimation({ weatherType }: Props) {
  const [particles, setParticles] = useState<Array<{ id: number; style: any }>>([]);

  useEffect(() => {
    const count = weatherType.includes('rain') ? 100 : 
                 weatherType.includes('snow') ? 50 :
                 weatherType.includes('thunder') ? 0 : 0;

    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${0.5 + Math.random() * 1}s`
      }
    }));

    setParticles(newParticles);
  }, [weatherType]);

  if (!weatherType.match(/rain|snow|thunder/i)) return null;

  return (
    <div className="weather-animation-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`weather-particle ${weatherType.toLowerCase().includes('rain') ? 'rain' : 'snow'}`}
          style={particle.style}
        />
      ))}
      {weatherType.includes('thunder') && <div className="lightning" />}
    </div>
  );
}