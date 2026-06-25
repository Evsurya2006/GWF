import { useEffect, useState } from 'react';
import { getShortLinks, saveShortLink, deleteShortLink, getSiteSettings } from '../../lib/db';
import type { ShortLink, SiteSettings } from '../../types';
import { Plus, Edit2, Trash2, Search, Link as LinkIcon, Copy } from 'lucide-react';

export default function AdminLinks() {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<ShortLink | null>(null);
  const [search, setSearch] = useState('');
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null);
  const [successLink, setSuccessLink] = useState<{ shortCode: string; originalUrl: string } | null>(null);
  const [formData, setFormData] = useState({
    originalUrl: '',
    customSlug: '',
    status: 'Enable' as const,
  });
  const [quickUrl, setQuickUrl] = useState('');
  const [quickShortenedUrl, setQuickShortenedUrl] = useState('');
  const [isShortening, setIsShortening] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    loadLinks();
    getSiteSettings().then(setSettings);
  }, []);

  const domainBase = settings?.customDomain || window.location.origin;

  const loadLinks = async () => {
    const data = await getShortLinks();
    setLinks(data);
  };

  const handleOpenModal = (link?: ShortLink) => {
    if (link) {
      setEditingLink(link);
      setFormData({
        originalUrl: link.originalUrl,
        customSlug: link.customSlug || '',
        status: link.status,
      });
    } else {
      setEditingLink(null);
      setFormData({
        originalUrl: '',
        customSlug: '',
        status: 'Enable',
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const shortCode = formData.customSlug || Math.random().toString(36).substring(2, 6);
    
    await saveShortLink({
      ...editingLink,
      originalUrl: formData.originalUrl,
      customSlug: formData.customSlug,
      shortCode,
      status: formData.status,
    } as ShortLink);
    
    setIsModalOpen(false);
    if (!editingLink) {
      setSuccessLink({ shortCode, originalUrl: formData.originalUrl });
    }
    await loadLinks();
  };

  const executeDelete = async () => {
    if (linkToDelete) {
      await deleteShortLink(linkToDelete);
      await loadLinks();
      setLinkToDelete(null);
    }
  };

  const handleQuickShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickUrl) return;
    
    setIsShortening(true);
    try {
      const shortCode = Math.random().toString(36).substring(2, 6);
      
      await saveShortLink({
        originalUrl: quickUrl,
        shortCode,
        status: 'Enable',
      } as ShortLink);
      
      setQuickShortenedUrl(`${domainBase}/s/${shortCode}`);
      await loadLinks();
    } catch (error) {
      console.error(error);
      alert('Failed to shorten link');
    } finally {
      setIsShortening(false);
    }
  };

  const resetQuickShorten = () => {
    setQuickShortenedUrl('');
    setQuickUrl('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  const filtered = links.filter(l => 
    l.originalUrl.toLowerCase().includes(search.toLowerCase()) || 
    l.shortCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <form onSubmit={handleQuickShorten} className="relative flex-1 flex gap-2">
          <div className="relative flex-1">
            <LinkIcon className={`w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 ${quickShortenedUrl ? 'text-primary' : 'text-gray-400'}`} />
            <input 
              type="url" 
              placeholder="Paste long URL to shorten..." 
              value={quickShortenedUrl || quickUrl}
              onChange={e => {
                if (quickShortenedUrl) resetQuickShorten();
                setQuickUrl(e.target.value);
              }}
              readOnly={!!quickShortenedUrl}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${quickShortenedUrl ? 'border-primary/20 bg-primary/5 text-primary font-medium' : 'border-gray-200 bg-white focus:border-primary'}`}
              required
            />
          </div>
          {quickShortenedUrl ? (
            <button 
              type="button"
              onClick={() => {
                copyToClipboard(quickShortenedUrl);
                resetQuickShorten();
              }}
              className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-sm flex items-center gap-2 whitespace-nowrap"
            >
              <Copy className="w-4 h-4" /> Copy
            </button>
          ) : (
            <button 
              type="submit"
              disabled={isShortening || !quickUrl}
              className="px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black transition-all shadow-sm whitespace-nowrap disabled:opacity-50"
            >
              {isShortening ? 'Shortening...' : 'Shorten'}
            </button>
          )}
        </form>
      </div>

      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-gray-700 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Short Link</th>
                <th className="px-6 py-4">Original URL</th>
                <th className="px-6 py-4">Clicks</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(link => (
                <tr key={link.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-primary" />
                      <span className="font-bold text-gray-900">{domainBase}/s/{link.shortCode}</span>
                      <button onClick={() => copyToClipboard(`${domainBase}/s/${link.shortCode}`)} className="p-1.5 bg-gray-100 rounded-md text-gray-500 hover:bg-primary/10 hover:text-primary transition-colors">
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-[200px] truncate text-gray-500" title={link.originalUrl}>
                      {link.originalUrl}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {link.clickCounter || 0}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      link.status === 'Enable' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {link.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(link.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleOpenModal(link)} className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-gray-100" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setLinkToDelete(link.id!)} className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No links found. Create your first short link.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden flex flex-col divide-y divide-gray-100">
          {filtered.map(link => (
            <div key={link.id} className="p-5 flex flex-col gap-4">
              <div className="flex justify-between items-start gap-4">
                <div className="font-bold text-gray-900 flex items-start gap-2 break-all leading-tight">
                  <LinkIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {domainBase}/s/{link.shortCode}
                </div>
                <button onClick={() => copyToClipboard(`${domainBase}/s/${link.shortCode}`)} className="p-2.5 bg-primary/10 rounded-xl text-primary hover:bg-primary/20 shrink-0 transition-colors active:scale-95">
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              <div className="text-sm text-gray-500 break-all bg-gray-50 p-3 rounded-lg border border-gray-100">
                {link.originalUrl}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${link.status === 'Enable' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {link.status}
                </span>
                <span className="font-bold text-gray-900 flex items-center gap-1">
                  <span className="text-gray-400 font-normal">Clicks:</span> {link.clickCounter || 0}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-2 pt-4 border-t border-gray-100">
                <button onClick={() => handleOpenModal(link)} className="flex-1 py-2.5 flex items-center justify-center gap-2 bg-gray-100 rounded-xl text-gray-700 font-semibold hover:bg-gray-200 transition-colors">
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button onClick={() => setLinkToDelete(link.id!)} className="flex-1 py-2.5 flex items-center justify-center gap-2 bg-red-50 rounded-xl text-red-600 font-semibold hover:bg-red-100 transition-colors">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No links found. Create your first short link.
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] shadow-xl w-full max-w-md p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{editingLink ? 'Edit Link' : 'Create Short Link'}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Original URL</label>
                <input 
                  type="url" 
                  value={formData.originalUrl}
                  onChange={e => setFormData({ ...formData, originalUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="https://example.com/very/long/url"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Custom Slug (Optional)</label>
                <input 
                  type="text" 
                  value={formData.customSlug}
                  onChange={e => setFormData({ ...formData, customSlug: e.target.value.replace(/[^a-zA-Z0-9-]/g, '') })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="my-custom-link"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value as 'Enable' | 'Disable' })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                >
                  <option value="Enable">Enable</option>
                  <option value="Disable">Disable</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-sm">
                  Save Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {linkToDelete && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] shadow-xl w-full max-w-sm p-6 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-red-500">
              <Trash2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Link?</h3>
            <p className="text-gray-500 mb-6 text-sm">Are you sure you want to delete this short link? This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setLinkToDelete(null)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button onClick={executeDelete} className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-all shadow-sm">
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {successLink && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] shadow-xl w-full max-w-md p-6 border border-gray-100 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Link Shortened!</h3>
            <p className="text-gray-500 mb-6 text-sm">Your new short link is ready to be shared.</p>
            
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 shadow-inner">
              <span className="font-bold text-gray-900 break-all text-left w-full sm:w-auto flex-1">{domainBase}/s/{successLink.shortCode}</span>
              <button 
                onClick={() => copyToClipboard(`${domainBase}/s/${successLink.shortCode}`)} 
                className="w-full sm:w-auto px-5 py-2.5 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary/20 shrink-0 flex items-center justify-center gap-2 transition-colors active:scale-95"
              >
                <Copy className="w-5 h-5" /> Copy
              </button>
            </div>

            <button onClick={() => setSuccessLink(null)} className="w-full py-3.5 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black transition-colors shadow-md">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
