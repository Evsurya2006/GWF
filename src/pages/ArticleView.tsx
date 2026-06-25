import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import { getPublishedArticles, getSiteSettings } from '../lib/db';
import type { Article, SiteSettings } from '../types';
import { ArrowLeft, Clock, User, TrendingUp, Search, Menu, X } from 'lucide-react';

export default function ArticleView() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const articles = await getPublishedArticles();
      const found = articles.find(a => a.slug === slug);
      setArticle(found || null);
      const siteSettings = await getSiteSettings();
      setSettings(siteSettings);
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAF8] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  if (!article) return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h1>
      <Link to="/" className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all">
        Go Home
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-gray-900 font-sans selection:bg-primary selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              {settings?.websiteName || 'Grow With Finances'}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
            <Link to="/#articles" className="hover:text-primary transition-colors">Articles</Link>
            <Link to="/#categories" className="hover:text-primary transition-colors">Categories</Link>
            <Link to="/#tools" className="hover:text-primary transition-colors">Tools</Link>
            <Link to="/#about" className="hover:text-primary transition-colors">Why Us</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-500 hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link 
              to="/admin/login" 
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              Log in
            </Link>
            <Link to="/#newsletter" className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-all shadow-sm hover:shadow-md">
              Subscribe
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link to="/" className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors font-medium">
              <ArrowLeft className="w-4 h-4" /> Home
            </Link>
            <button className="p-2 -mr-2 text-gray-500 hover:text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-4">
            <Link to="/#articles" onClick={() => setIsMenuOpen(false)} className="block px-2 py-1 font-medium text-gray-600 hover:text-primary">Articles</Link>
            <Link to="/#categories" onClick={() => setIsMenuOpen(false)} className="block px-2 py-1 font-medium text-gray-600 hover:text-primary">Categories</Link>
            <Link to="/#tools" onClick={() => setIsMenuOpen(false)} className="block px-2 py-1 font-medium text-gray-600 hover:text-primary">Tools</Link>
            <Link to="/#about" onClick={() => setIsMenuOpen(false)} className="block px-2 py-1 font-medium text-gray-600 hover:text-primary">Why Us</Link>
            <div className="h-px bg-gray-100 my-1" />
            <Link to="/admin/login" onClick={() => setIsMenuOpen(false)} className="block px-2 py-1 font-medium text-gray-600 hover:text-primary">Log in</Link>
            <Link to="/#newsletter" onClick={() => setIsMenuOpen(false)} className="mt-2 inline-block px-5 py-3 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 text-center w-full shadow-md">
              Subscribe
            </Link>
          </div>
        )}
      </header>

      <main className="py-12">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100">
            {article.thumbnail && (
              <div className="h-64 md:h-96 w-full overflow-hidden bg-gray-100">
                <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-8 md:p-16">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">{article.category}</span>
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {article.author}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {article.readingTime}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">{article.title}</h1>
              
              <div 
                className="article-content text-lg text-gray-700 leading-relaxed space-y-6" 
                dangerouslySetInnerHTML={{ __html: article.content }} 
              />
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
