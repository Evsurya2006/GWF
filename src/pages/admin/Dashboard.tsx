import { useEffect, useState } from 'react';
import { getArticles, getShortLinks } from '../../lib/db';
import type { Article, ShortLink } from '../../types';
import { FileText, Link as LinkIcon, MousePointerClick, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    articles: 0,
    links: 0,
    clicks: 0,
    todayClicks: 0
  });

  useEffect(() => {
    async function loadStats() {
      const [arts, links] = await Promise.all([getArticles(), getShortLinks()]);
      const totalClicks = links.reduce((acc, l) => acc + (l.clickCounter || 0), 0);
      
      setStats({
        articles: arts.length,
        links: links.length,
        clicks: totalClicks,
        todayClicks: Math.floor(totalClicks * 0.1) // Mock today for now
      });
    }
    loadStats();
  }, []);

  const statCards = [
    { title: 'Total Articles', value: stats.articles, icon: FileText, color: 'bg-blue-50 text-blue-600' },
    { title: 'Total Links', value: stats.links, icon: LinkIcon, color: 'bg-purple-50 text-purple-600' },
    { title: 'Total Clicks', value: stats.clicks, icon: MousePointerClick, color: 'bg-green-50 text-green-600' },
    { title: "Today's Clicks", value: stats.todayClicks, icon: TrendingUp, color: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm min-h-[300px]">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Traffic Overview</h3>
          <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl text-gray-400">
            Chart rendering space
          </div>
        </div>
        <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm min-h-[300px]">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Links</h3>
          <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl text-gray-400">
            Data table space
          </div>
        </div>
      </div>
    </div>
  );
}
