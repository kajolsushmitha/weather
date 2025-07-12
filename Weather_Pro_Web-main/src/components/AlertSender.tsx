import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AlertSender() {
  const [sendingAlerts, setSendingAlerts] = useState(false);

  const handleSendAlerts = async () => {
    setSendingAlerts(true);
    try {
      const response = await fetch('http://localhost:5000/api/send-alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Weather alerts sent successfully!');
      } else {
        toast.error(data.message || 'Failed to send weather alerts');
      }
    } catch (error) {
      toast.error('Error sending weather alerts');
    } finally {
      setSendingAlerts(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Send Weather Alerts</h2>
      <p className="text-white/80 mb-6">
        Send immediate weather alerts to all subscribers with current weather conditions.
        <br />
        <span className="text-sm opacity-75">
          Note: Alerts are also automatically sent daily at 8 AM.
        </span>
      </p>
      <button
        onClick={handleSendAlerts}
        disabled={sendingAlerts}
        className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sendingAlerts ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Sending Alerts...
          </>
        ) : (
          <>
            <Send size={20} />
            Send Weather Alerts
          </>
        )}
      </button>
    </div>
  );
}