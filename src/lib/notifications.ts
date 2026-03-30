import { getSettings, saveSettings } from './storage';

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

export function scheduleReminder(): void {
  const settings = getSettings();
  if (!settings.reminderEnabled || !settings.apiKey) return;
  if (Notification.permission !== 'granted') return;

  const today = new Date().toISOString().slice(0, 10);
  if (settings.reminderLastSent === today) return; // already sent today

  const [hours, minutes] = settings.reminderTime.split(':').map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(hours, minutes, 0, 0);

  if (target <= now) {
    // already passed today — schedule for tomorrow
    target.setDate(target.getDate() + 1);
  }

  const delay = target.getTime() - now.getTime();

  setTimeout(() => {
    new Notification('Time to practice Table Topics! 🎤', {
      body: 'Even 5 minutes of practice today keeps your streak alive. Let\'s go!',
      icon: '/favicon.svg',
    });
    const updated = getSettings();
    saveSettings({ ...updated, reminderLastSent: new Date().toISOString().slice(0, 10) });
  }, delay);
}
