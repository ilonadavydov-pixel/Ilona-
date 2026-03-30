import { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../lib/storage';
import type { AppSettings } from '../lib/storage';
import { requestNotificationPermission, scheduleReminder } from '../lib/notifications';

export default function Settings() {
  const [settings, setSettings] = useState<AppSettings>(getSettings);
  const [saved, setSaved] = useState(false);
  const [notifStatus, setNotifStatus] = useState<NotificationPermission | 'unsupported'>('default');

  useEffect(() => {
    if (!('Notification' in window)) {
      setNotifStatus('unsupported');
    } else {
      setNotifStatus(Notification.permission);
    }
  }, []);

  async function handleSave() {
    saveSettings(settings);
    if (settings.reminderEnabled) {
      const granted = await requestNotificationPermission();
      setNotifStatus(granted ? 'granted' : 'denied');
      if (granted) scheduleReminder();
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">Settings</h1>
      <p className="text-gray-500 mb-8">Configure your API key and daily practice reminder.</p>

      {/* API Key */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4">
        <h2 className="text-base font-bold text-gray-900 mb-1">Anthropic API Key</h2>
        <p className="text-sm text-gray-500 mb-4">
          Required for AI feedback. Your key is stored only in your browser and never sent to any server other than Anthropic's.
        </p>
        <label className="block text-xs font-semibold text-gray-600 mb-1.5">API Key</label>
        <input
          type="password"
          value={settings.apiKey}
          onChange={e => setSettings(s => ({ ...s, apiKey: e.target.value }))}
          placeholder="sk-ant-api…"
          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <p className="text-xs text-gray-400 mt-2">
          Get your API key from the{' '}
          <span className="text-indigo-600 font-medium">Anthropic Console</span>.
        </p>
      </div>

      {/* Reminders */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
        <h2 className="text-base font-bold text-gray-900 mb-1">Daily Practice Reminder</h2>
        <p className="text-sm text-gray-500 mb-4">
          Get a browser notification each day to keep your streak alive.
        </p>

        {notifStatus === 'unsupported' && (
          <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-xl px-4 py-3 mb-4">
            Browser notifications are not supported in this environment.
          </div>
        )}

        {notifStatus === 'denied' && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
            Notification permission was denied. Please enable it in your browser settings.
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => setSettings(s => ({ ...s, reminderEnabled: !s.reminderEnabled }))}
            className={`relative w-11 h-6 rounded-full transition-colors ${settings.reminderEnabled ? 'bg-indigo-600' : 'bg-gray-200'}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings.reminderEnabled ? 'translate-x-5' : ''}`}
            />
          </button>
          <span className="text-sm font-medium text-gray-700">Enable daily reminder</span>
        </div>

        {settings.reminderEnabled && (
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Reminder Time</label>
            <input
              type="time"
              value={settings.reminderTime}
              onChange={e => setSettings(s => ({ ...s, reminderTime: e.target.value }))}
              className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        )}
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
      >
        {saved ? '✓ Saved!' : 'Save Settings'}
      </button>
    </div>
  );
}
