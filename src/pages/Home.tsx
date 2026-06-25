import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getPublishedArticles, getSiteSettings } from '../lib/db';
import type { Article, SiteSettings } from '../types';
import { ChevronRight, TrendingUp, Shield, Zap, Search, Menu, X, ArrowRight } from 'lucide-react';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    getPublishedArticles().then(setArticles);
    getSiteSettings().then(setSettings);
  }, []);

  const featured = articles.slice(0, 3);
  const latest = articles.slice(3, 7);

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#1a1a1a] font-sans selection:bg-primary selection:text-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              {settings?.websiteName || 'Grow With Finances'}
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
            <a href="#articles" className="hover:text-primary transition-colors">Articles</a>
            <a href="#categories" className="hover:text-primary transition-colors">Categories</a>
            <a href="#tools" className="hover:text-primary transition-colors">Tools</a>
            <a href="#about" className="hover:text-primary transition-colors">Why Us</a>
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
            <a href="#newsletter" className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-all shadow-sm hover:shadow-md">
              Subscribe
            </a>
          </div>

          <button className="md:hidden p-2 -mr-2 text-gray-500 hover:text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-4">
            <a href="#articles" onClick={() => setIsMenuOpen(false)} className="block px-2 py-1 font-medium text-gray-600 hover:text-primary">Articles</a>
            <a href="#categories" onClick={() => setIsMenuOpen(false)} className="block px-2 py-1 font-medium text-gray-600 hover:text-primary">Categories</a>
            <a href="#tools" onClick={() => setIsMenuOpen(false)} className="block px-2 py-1 font-medium text-gray-600 hover:text-primary">Tools</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-2 py-1 font-medium text-gray-600 hover:text-primary">Why Us</a>
            <div className="h-px bg-gray-100 my-1" />
            <Link to="/admin/login" onClick={() => setIsMenuOpen(false)} className="block px-2 py-1 font-medium text-gray-600 hover:text-primary">Log in</Link>
            <a href="#newsletter" onClick={() => setIsMenuOpen(false)} className="mt-2 inline-block px-5 py-3 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 text-center w-full shadow-md">
              Subscribe
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
            Master your wealth. <br className="hidden md:block" />
            <span className="text-primary">Shape your future.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            Professional insights, modern tools, and expert strategies to help you navigate the complex world of personal finance and investments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#articles" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
              Start Reading <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#tools" className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all">
              Explore Tools
            </a>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl -z-10" />
      </section>

      {/* Finance Categories Section */}
      <section id="categories" className="py-[100px] bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-[60px]">
            <span className="block text-primary font-bold uppercase tracking-[1px] text-sm mb-4">
              POPULAR CATEGORIES
            </span>
            <h2 className="font-['Poppins',sans-serif] font-bold text-[28px] md:text-[36px] lg:text-[48px] text-[#111827] mb-6 leading-tight">
              Popular Finance Categories
            </h2>
            <p className="max-w-[650px] mx-auto text-[#6B7280] text-[18px]">
              Explore our curated selection of financial topics designed to help you navigate and master your wealth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px]">
            {[
              {
                icon: '💰',
                title: 'Saving',
                desc: 'Learn effective strategies to build your emergency fund and save for future goals securely.'
              },
              {
                icon: '📈',
                title: 'Investing',
                desc: 'Discover how to grow your wealth through stocks, mutual funds, and diversified portfolios.'
              },
              {
                icon: '🏦',
                title: 'Banking',
                desc: 'Find the best banking solutions, accounts, and services to manage your money efficiently.'
              },
              {
                icon: '💳',
                title: 'Credit Cards',
                desc: 'Compare and choose the right credit cards to maximize rewards and build your credit score.'
              }
            ].map((category, i) => (
              <div 
                key={i} 
                className="bg-white rounded-[18px] p-[35px] border border-[#EEF2F7] cursor-pointer transition-all duration-[350ms] ease-in-out hover:-translate-y-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(22,163,74,0.18)] group flex flex-col items-center text-center"
              >
                <div className="w-[80px] h-[80px] rounded-full bg-[#DCFCE7] flex items-center justify-center text-[36px] mb-[25px] transition-transform duration-300 group-hover:scale-110 shrink-0">
                  {category.icon}
                </div>
                <h3 className="font-['Poppins',sans-serif] font-bold text-[28px] text-[#111827] mb-[18px]">
                  {category.title}
                </h3>
                <p className="text-[#6B7280] text-[16px] leading-[1.8] mb-8 flex-grow">
                  {category.desc}
                </p>
                <div className="text-primary font-bold flex items-center gap-2 mt-auto transition-all duration-300 group-hover:tracking-[1px]">
                  Read More <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Users', value: '2M+' },
              { label: 'Articles Published', value: '5,000+' },
              { label: 'Links Shortened', value: '10M+' },
              { label: 'Countries Reached', value: '150+' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-100 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance Tools */}
      <section id="tools" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Financial Tools</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Calculators, trackers, and analyzers to help you make informed decisions.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Investment Calculator', desc: 'Project your returns over time with our compound interest engine.', icon: TrendingUp },
              { title: 'URL Shortener', desc: 'Create branded, trackable short links for your marketing campaigns.', icon: Zap },
              { title: 'Tax Estimator', desc: 'Quickly estimate your annual tax obligations based on current brackets.', icon: Shield }
            ].map((tool, i) => (
              <div key={i} className="p-8 rounded-[24px] bg-[#F8FAF8] border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                  <tool.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{tool.title}</h3>
                <p className="text-gray-600 mb-6">{tool.desc}</p>
                <div className="text-primary font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Try it out <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section id="articles" className="py-24 bg-[#F8FAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Insights</h2>
              <p className="text-gray-600">Expert analysis on markets, crypto, and personal finance.</p>
            </div>
            <a href="#articles" className="hidden md:flex items-center gap-1 text-primary font-semibold hover:text-primary/80 transition-colors">
              View all <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          {featured.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {featured.map(article => (
                <Link to={`/article/${article.slug}`} key={article.id} className="bg-white rounded-[18px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group block">
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={article.thumbnail || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80'} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                      {article.category}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {article.metaDescription}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{article.author}</span>
                      <span>{article.readingTime} read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500 bg-white rounded-[18px] border border-dashed border-gray-200">
              No articles published yet. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section id="newsletter" className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-[32px] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-primary/20 blur-3xl mix-blend-overlay" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Stay ahead of the curve.
              </h2>
              <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
                Join 50,000+ subscribers receiving our weekly market analysis and wealth building strategies.
              </p>
              <form className="max-w-md mx-auto flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  required
                />
                <button type="submit" className="px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900">
                {settings?.websiteName || 'Grow With Finances'}
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              {settings?.footerText || 'Empowering your financial journey with modern insights and tools.'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">Articles</a></li>
              <li><a href="#" className="hover:text-primary">Tools</a></li>
              <li><a href="#" className="hover:text-primary">Categories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">About Us</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
              <li><a href="#" className="hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-100 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} {settings?.websiteName || 'Grow With Finances'}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
