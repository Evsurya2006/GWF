import { useEffect, useState } from 'react';
import { getSiteSettings, saveSiteSettings } from '../../lib/db';
import type { SiteSettings } from '../../types';
import { Save } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    websiteName: 'Grow With Finances',
    customDomain: '',
    logoUrl: '',
    faviconUrl: '',
    themeColor: '#16A34A',
    contactEmail: '',
    footerText: '',
    googleAnalyticsId: '',
    searchConsoleTag: '',
    metaTags: '',
    socialLinks: { twitter: '', facebook: '', linkedin: '' },
    headerAdCode: '',
    sidebarAdCode: '',
    footerAdCode: '',
    inArticleAdCode: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getSiteSettings().then(data => {
      if (data) setSettings(data);
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    await saveSiteSettings(settings);
    setIsSaving(false);
    alert('Site settings saved successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      socialLinks: { ...settings.socialLinks, [e.target.name]: e.target.value }
    });
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Site Settings</h3>
          <p className="text-gray-500 text-sm mt-1">Configure global website properties and SEO.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save className="w-5 h-5" /> {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="p-8 max-w-4xl space-y-12">
        <section>
          <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span> 
            General Configuration
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Website Name</label>
              <input type="text" name="websiteName" value={settings.websiteName} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Custom Domain</label>
              <input type="text" name="customDomain" value={settings.customDomain || ''} onChange={handleChange} placeholder="https://example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Theme Color (Hex)</label>
              <input type="text" name="themeColor" value={settings.themeColor} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Footer Text</label>
              <input type="text" name="footerText" value={settings.footerText} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary" />
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span> 
            Media & Assets
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Logo URL</label>
              <input type="text" name="logoUrl" value={settings.logoUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Favicon URL</label>
              <input type="text" name="faviconUrl" value={settings.faviconUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary" />
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">3</span> 
            SEO & Analytics
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Google Analytics ID</label>
              <input type="text" name="googleAnalyticsId" value={settings.googleAnalyticsId} onChange={handleChange} placeholder="G-XXXXXXXXXX" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Search Console Tag</label>
              <input type="text" name="searchConsoleTag" value={settings.searchConsoleTag} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Custom Meta Tags (HTML)</label>
              <textarea name="metaTags" value={settings.metaTags} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary h-32 font-mono text-sm" placeholder="<meta name='...'>" />
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">4</span> 
            Ads & Monetization
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Header Ad (728x90)</label>
              <textarea name="headerAdCode" value={settings.headerAdCode || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary h-32 font-mono text-sm" placeholder="<!-- Header Ad Code -->" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sidebar Ad (300x250 Medium Rectangle)</label>
              <textarea name="sidebarAdCode" value={settings.sidebarAdCode || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary h-32 font-mono text-sm" placeholder="<!-- Sidebar Ad Code -->" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">In-Article Ad (300x250 Medium Rectangle)</label>
              <textarea name="inArticleAdCode" value={settings.inArticleAdCode || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary h-32 font-mono text-sm" placeholder="<!-- In-Article Ad Code -->" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Footer Ad (728x90)</label>
              <textarea name="footerAdCode" value={settings.footerAdCode || ''} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary h-32 font-mono text-sm" placeholder="<!-- Footer Ad Code -->" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
