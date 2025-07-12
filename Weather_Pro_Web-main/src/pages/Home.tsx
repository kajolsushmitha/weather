import { ArrowRight, Sun, Cloud, Wind, Droplets, MapPin, Bell, History, ArrowLeftRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 dark:from-blue-600 dark:to-purple-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6">Your Personal Weather Companion</h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Get accurate, real-time weather updates and forecasts for any location worldwide. 
            Stay prepared with WeatherPro's comprehensive weather intelligence.
          </p>
          
          <div className="flex justify-center space-x-4 mb-20">
            <Link 
              to="/forecast" 
              className="bg-white text-blue-500 dark:bg-gray-800 dark:text-blue-400 px-8 py-3 rounded-full font-semibold flex items-center hover:bg-blue-50 dark:hover:bg-gray-700 transition-transform hover:scale-105"
            >
              Check Weather <ArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mt-20">
            <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg p-6 rounded-xl transform hover:scale-105 transition-all">
              <div className="text-center">
                <Sun className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
                <p className="text-sm opacity-80">Get instant weather information with our live updates system</p>
              </div>
            </div>

            <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg p-6 rounded-xl transform hover:scale-105 transition-all">
              <div className="text-center">
                <Cloud className="w-12 h-12 mx-auto mb-4 text-blue-300" />
                <h3 className="text-xl font-semibold mb-2">Accurate Forecasts</h3>
                <p className="text-sm opacity-80">Plan ahead with our precise 24-hour weather predictions</p>
              </div>
            </div>

            <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg p-6 rounded-xl transform hover:scale-105 transition-all">
              <div className="text-center">
                <Wind className="w-12 h-12 mx-auto mb-4 text-green-300" />
                <h3 className="text-xl font-semibold mb-2">Wind Patterns</h3>
                <p className="text-sm opacity-80">Track wind speed and direction with detailed measurements</p>
              </div>
            </div>

            <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg p-6 rounded-xl transform hover:scale-105 transition-all">
              <div className="text-center">
                <Droplets className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-semibold mb-2">Humidity Levels</h3>
                <p className="text-sm opacity-80">Monitor humidity levels to plan your day better</p>
              </div>
            </div>
          </div>

          <div className="mt-32">
            <h2 className="text-4xl font-bold mb-12">Powerful Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/map" className="group">
                <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg p-8 rounded-xl h-full transform transition-all group-hover:scale-105">
                  <MapPin className="w-12 h-12 mb-4 text-red-400" />
                  <h3 className="text-2xl font-semibold mb-3">Interactive Map</h3>
                  <p className="text-sm opacity-80">Explore weather patterns worldwide with our interactive weather map</p>
                </div>
              </Link>

              <Link to="/alerts" className="group">
                <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg p-8 rounded-xl h-full transform transition-all group-hover:scale-105">
                  <Bell className="w-12 h-12 mb-4 text-yellow-400" />
                  <h3 className="text-2xl font-semibold mb-3">Weather Alerts</h3>
                  <p className="text-sm opacity-80">Stay informed with personalized weather alerts and notifications</p>
                </div>
              </Link>

              <Link to="/comparison" className="group">
                <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg p-8 rounded-xl h-full transform transition-all group-hover:scale-105">
                  <ArrowLeftRight className="w-12 h-12 mb-4 text-green-400" />
                  <h3 className="text-2xl font-semibold mb-3">City Comparison</h3>
                  <p className="text-sm opacity-80">Compare weather conditions between different cities</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-32 bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-xl p-12">
            <div className="max-w-3xl mx-auto">
              <History className="w-16 h-16 mx-auto mb-6 text-purple-300" />
              <h2 className="text-3xl font-bold mb-4">Historical Weather Data</h2>
              <p className="text-lg mb-8 opacity-90">
                Access historical weather data and trends to better understand climate patterns in your area.
                Make informed decisions based on past weather conditions.
              </p>
              <Link 
                to="/historical" 
                className="inline-flex items-center px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
              >
                View Historical Data <ArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}