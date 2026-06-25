import { useEffect, useState } from 'react';
import { getArticles, saveArticle, deleteArticle } from '../../lib/db';
import type { Article } from '../../types';
import ArticleEditor from './components/ArticleEditor';
import { Plus, Edit2, Trash2, Search, ExternalLink } from 'lucide-react';

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    const data = await getArticles();
    setArticles(data);
  };

  const handleSave = async (article: Article) => {
    await saveArticle(article);
    await loadArticles();
    setEditingArticle(null);
    setIsCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      await deleteArticle(id);
      await loadArticles();
    }
  };

  if (isCreating || editingArticle) {
    return (
      <ArticleEditor 
        initialData={editingArticle}
        onSave={handleSave}
        onCancel={() => {
          setIsCreating(false);
          setEditingArticle(null);
        }}
      />
    );
  }

  const filtered = articles.filter(a => a.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search articles..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
          />
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> New Article
        </button>
      </div>

      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50/50 text-gray-700 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(article => (
                <tr key={article.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{article.title}</div>
                    <div className="text-xs text-gray-500 mt-1">/{article.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      article.status === 'Published' ? 'bg-green-100 text-green-700' :
                      article.status === 'Draft' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <a href={`/s/preview-${article.id}`} target="_blank" className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-gray-100" title="Preview">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button onClick={() => setEditingArticle(article)} className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-gray-100" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(article.id!)} className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No articles found. Create your first article to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
