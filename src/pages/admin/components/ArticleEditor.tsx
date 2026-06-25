import { useState } from 'react';
import type { Article } from '../../../types';
import { Save, X, Image as ImageIcon } from 'lucide-react';

interface Props {
  initialData?: Article | null;
  onSave: (data: Article) => void;
  onCancel: () => void;
}

export default function ArticleEditor({ initialData, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState<Partial<Article>>(initialData || {
    title: '',
    slug: '',
    category: '',
    thumbnail: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    status: 'Draft',
    author: 'Admin',
    readingTime: '5 min',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Article);
  };

  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-140px)]">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <h3 className="font-bold text-gray-900">{initialData ? 'Edit Article' : 'New Article'}</h3>
        <div className="flex gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Article
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto flex">
        {/* Main Editor Area */}
        <div className="flex-1 p-8 border-r border-gray-100 space-y-6">
          <input
            type="text"
            placeholder="Article Title"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className="w-full text-4xl font-bold text-gray-900 placeholder-gray-300 border-none focus:outline-none focus:ring-0 px-0"
          />
          
          {/* Custom Basic Toolbar */}
          <div className="sticky top-0 bg-white z-10 border border-gray-200 rounded-xl p-2 flex flex-wrap gap-2 shadow-sm">
            <button onClick={() => handleCommand('bold')} className="p-2 hover:bg-gray-100 rounded font-bold w-8 h-8 flex items-center justify-center">B</button>
            <button onClick={() => handleCommand('italic')} className="p-2 hover:bg-gray-100 rounded italic w-8 h-8 flex items-center justify-center">I</button>
            <button onClick={() => handleCommand('underline')} className="p-2 hover:bg-gray-100 rounded underline w-8 h-8 flex items-center justify-center">U</button>
            <div className="w-px h-6 bg-gray-200 my-auto mx-1" />
            <button onClick={() => handleCommand('formatBlock', 'H2')} className="p-2 hover:bg-gray-100 rounded font-bold text-sm">H2</button>
            <button onClick={() => handleCommand('formatBlock', 'H3')} className="p-2 hover:bg-gray-100 rounded font-bold text-sm">H3</button>
            <div className="w-px h-6 bg-gray-200 my-auto mx-1" />
            <button onClick={() => handleCommand('insertUnorderedList')} className="p-2 hover:bg-gray-100 rounded text-sm flex items-center gap-1">• List</button>
            <button onClick={() => handleCommand('insertOrderedList')} className="p-2 hover:bg-gray-100 rounded text-sm flex items-center gap-1">1. List</button>
            <div className="w-px h-6 bg-gray-200 my-auto mx-1" />
            <button onClick={() => {
              const url = prompt('Enter image URL:');
              if (url) handleCommand('insertImage', url);
            }} className="p-2 hover:bg-gray-100 rounded text-sm flex items-center gap-1"><ImageIcon className="w-4 h-4"/> Img</button>
          </div>

          <div 
            className="prose prose-lg max-w-none focus:outline-none min-h-[400px]"
            contentEditable
            onInput={e => setFormData({ ...formData, content: e.currentTarget.innerHTML })}
            dangerouslySetInnerHTML={{ __html: formData.content || '' }}
          />
        </div>

        {/* Sidebar Settings */}
        <div className="w-80 bg-gray-50/50 p-6 space-y-6 overflow-y-auto">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Publish Status</label>
            <select 
              value={formData.status}
              onChange={e => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Hidden">Hidden</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Trash">Trash</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail URL</label>
            <input 
              type="text" 
              value={formData.thumbnail}
              onChange={e => setFormData({ ...formData, thumbnail: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary"
              placeholder="https://..."
            />
            {formData.thumbnail && (
              <img src={formData.thumbnail} alt="Preview" className="mt-3 w-full h-32 object-cover rounded-xl border border-gray-200" />
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <input 
              type="text" 
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">URL Slug</label>
            <input 
              type="text" 
              value={formData.slug}
              onChange={e => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary"
            />
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-bold text-gray-900 mb-4">SEO Settings</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Meta Title</label>
                <input 
                  type="text" 
                  value={formData.metaTitle}
                  onChange={e => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Meta Description</label>
                <textarea 
                  value={formData.metaDescription}
                  onChange={e => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary h-24 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Keywords</label>
                <input 
                  type="text" 
                  value={formData.keywords}
                  onChange={e => setFormData({ ...formData, keywords: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary"
                  placeholder="Comma separated"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
