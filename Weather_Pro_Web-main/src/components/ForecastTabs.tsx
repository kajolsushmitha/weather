interface ForecastTabsProps {
  activeTab: 'current' | 'hourly' | 'weekly';
  onTabChange: (tab: 'current' | 'hourly' | 'weekly') => void;
}

export default function ForecastTabs({ activeTab, onTabChange }: ForecastTabsProps) {
  return (
    <div className="flex space-x-2 bg-white/5 backdrop-blur-lg rounded-xl p-1">
      <button
        onClick={() => onTabChange('current')}
        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeTab === 'current'
            ? 'bg-white/10 text-white'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        }`}
      >
        Current
      </button>
      <button
        onClick={() => onTabChange('hourly')}
        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeTab === 'hourly'
            ? 'bg-white/10 text-white'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        }`}
      >
        24 Hours
      </button>
      <button
        onClick={() => onTabChange('weekly')}
        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          activeTab === 'weekly'
            ? 'bg-white/10 text-white'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        }`}
      >
        7 Days
      </button>
    </div>
  );
}