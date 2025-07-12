export default function AlertInfo() {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
      <h3 className="text-xl font-bold text-white mb-4">About Weather Alerts</h3>
      <ul className="space-y-3 text-white/80">
        <li className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2" />
          <span>Receive real-time weather updates for your location</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2" />
          <span>Get notified about severe weather conditions</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2" />
          <span>Customized alerts based on your location</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2" />
          <span>Daily weather forecasts delivered to your inbox</span>
        </li>
      </ul>
    </div>
  );
}