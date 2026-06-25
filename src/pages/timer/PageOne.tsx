import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getRandomArticle, getAdSettings } from '../../lib/db';
import type { Article, AdSettings } from '../../types';
import { TrendingUp, Clock, ArrowRight } from 'lucide-react';

export default function PageOne() {
  const { shortCode } = useParams<{ shortCode: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [ads, setAds] = useState<AdSettings | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [art, adData] = await Promise.all([
        getRandomArticle(),
        getAdSettings()
      ]);
      setArticle(art);
      setAds(adData);
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !loading) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, loading]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#F8FAF8]">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8] pb-24">
      {/* Header Ad */}
      {ads?.headerAd && (
        <div className="w-full bg-white border-b border-gray-100 py-4 flex justify-center" dangerouslySetInnerHTML={{ __html: ads.headerAd }} />
      )}

      {/* Top Bar with Timer */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 hidden sm:block">Grow With Finances</span>
          </div>

          <div className="flex items-center gap-4">
            {timeLeft > 0 ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full font-mono text-gray-700 font-semibold text-sm">
                <Clock className="w-4 h-4 text-primary" />
                Please wait {timeLeft}s...
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full font-semibold text-sm">
                Scroll down to continue
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {article ? (
          <article className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            {article.thumbnail && (
              <img src={article.thumbnail} alt={article.title} className="w-full h-64 md:h-96 object-cover" />
            )}
            <div className="p-8 md:p-12">
              <div className="text-primary font-semibold tracking-wider text-sm uppercase mb-4">
                {article.category}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {article.title}
              </h1>
              
              {/* Timer Page 1 Ad (Top) */}
              {ads?.timerPage1 && (
                <div className="my-8 flex justify-center bg-gray-50 py-4 rounded-xl border border-dashed border-gray-200" dangerouslySetInnerHTML={{ __html: ads.timerPage1 }} />
              )}

              <div 
                className="prose prose-lg max-w-none text-gray-700 font-serif leading-relaxed"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Timer Page 1 Ad (Bottom) */}
              {ads?.timerPage1 && (
                <div className="my-8 flex justify-center bg-gray-50 py-4 rounded-xl border border-dashed border-gray-200" dangerouslySetInnerHTML={{ __html: ads.timerPage1 }} />
              )}
            </div>
          </article>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h2>
            <p className="text-gray-500">We could not load the content at this time.</p>
          </div>
        )}

        {/* Action Bottom (Fallback if they scroll down) */}
        <div className="mt-12 flex justify-center">
          {timeLeft === 0 && (
            <button 
              onClick={() => navigate(`/timer/${shortCode}/2`, { state: { prevArticleId: article?.id } })}
              className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 shadow-xl flex items-center gap-2 transition-transform hover:-translate-y-1"
            >
              Continue to Destination <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </main>

      {/* Footer Ad */}
      {ads?.footerAd && (
        <div className="w-full bg-white border-t border-gray-100 py-4 flex justify-center mt-12" dangerouslySetInnerHTML={{ __html: ads.footerAd }} />
      )}
    </div>
  );
}
