import { useEffect, useState } from 'react';
import { getAdSettings, saveAdSettings } from '../../lib/db';
import type { AdSettings } from '../../types';
import { Save } from 'lucide-react';

export default function AdminAds() {
  const [settings, setSettings] = useState<AdSettings>({
    headerAd: '',
    footerAd: '',
    homepageMiddle: '',
    sidebarAd: '',
    articleTop: '',
    articleMiddle: '',
    articleBottom: '',
    timerPage1: '',
    timerPage2: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getAdSettings().then(data => {
      if (data) setSettings(data);
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await saveAdSettings(settings);
    setIsSaving(false);
    alert('Ad settings saved successfully!');
  };

  const adSections = [
    { key: 'timerPage1', label: 'Timer Page 1 (Top/Bottom)' },
    { key: 'timerPage2', label: 'Timer Page 2 (Top/Bottom)' },
    { key: 'headerAd', label: 'Global Header Ad' },
    { key: 'footerAd', label: 'Global Footer Ad' },
    { key: 'homepageMiddle', label: 'Homepage Middle' },
    { key: 'sidebarAd', label: 'Sidebar Ad' },
    { key: 'articleTop', label: 'Article Top' },
    { key: 'articleMiddle', label: 'Article Middle' },
    { key: 'articleBottom', label: 'Article Bottom' },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Ads Manager</h3>
          <p className="text-gray-500 text-sm mt-1">Paste your AdSense or custom ad code snippets below.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save className="w-5 h-5" /> {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50/30">
        {adSections.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            <textarea 
              value={settings[key as keyof AdSettings] || ''}
              onChange={e => setSettings({ ...settings, [key]: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono text-sm text-gray-600 h-32 resize-y bg-white"
              placeholder={`<!-- Ad code for ${label} -->`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
