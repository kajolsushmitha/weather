import { Cloud, Map as MapIcon, Bell, Home, CloudSun, ArrowLeftRight, History } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Cloud className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-gray-800 dark:text-white">WeatherPro</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
              <Home className="h-5 w-5 mr-1" />
              Home
            </Link>
            <Link to="/forecast" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
              <CloudSun className="h-5 w-5 mr-1" />
              Forecast
            </Link>
            <Link to="/map" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
              <MapIcon className="h-5 w-5 mr-1" />
              Map
            </Link>
            <Link to="/comparison" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
              <ArrowLeftRight className="h-5 w-5 mr-1" />
              Compare
            </Link>
            <Link to="/historical" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
              <History className="h-5 w-5 mr-1" />
              Historical
            </Link>
            <Link to="/alerts" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 flex items-center">
              <Bell className="h-5 w-5 mr-1" />
              Alerts
            </Link>
            <div className="ml-2 border-l border-gray-200 dark:border-gray-700 pl-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}