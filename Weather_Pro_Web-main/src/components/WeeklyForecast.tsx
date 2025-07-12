import { ForecastData } from '../types/weather';
import WeatherIcon from './WeatherIcon';

interface Props {
  forecast: ForecastData;
}

export default function WeeklyForecast({ forecast }: Props) {
  // Group forecast data by day and get daily averages
  const dailyForecasts = forecast.list.reduce((acc: any[], item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
    const existingDay = acc.find(day => day.date === date);

    if (existingDay) {
      existingDay.temps.push(item.main.temp);
      existingDay.humidity.push(item.main.humidity);
      if (!existingDay.icon) {
        existingDay.icon = item.weather[0].icon;
      }
    } else {
      acc.push({
        date,
        temps: [item.main.temp],
        humidity: [item.main.humidity],
        icon: item.weather[0].icon
      });
    }

    return acc;
  }, []).slice(0, 7);

  return (
    <div className="space-y-4">
      {dailyForecasts.map((day, index) => {
        const avgTemp = Math.round(
          day.temps.reduce((sum: number, temp: number) => sum + temp, 0) / day.temps.length
        );
        const avgHumidity = Math.round(
          day.humidity.reduce((sum: number, humidity: number) => sum + humidity, 0) / day.humidity.length
        );

        return (
          <div
            key={day.date}
            className="flex items-center justify-between bg-white/5 backdrop-blur-lg rounded-xl p-4"
          >
            <span className="text-white font-medium w-20">{day.date}</span>
            <div className="flex items-center space-x-4">
              <WeatherIcon code={day.icon} size={30} />
              <span className="text-white font-bold w-16">{avgTemp}°C</span>
              <span className="text-white/60 text-sm">{avgHumidity}% humidity</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}