import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Practice from './pages/Practice';
import Builder from './pages/Builder';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import { scheduleReminder } from './lib/notifications';
import { getSettings } from './lib/storage';

export default function App() {
  useEffect(() => {
    const settings = getSettings();
    if (settings.reminderEnabled && settings.apiKey) {
      scheduleReminder();
    }
  }, []);

  return (
    <BrowserRouter basename={import.meta.env.PROD ? '/Ilona-' : '/'}>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
