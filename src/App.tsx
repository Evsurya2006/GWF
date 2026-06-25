import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminArticles from './pages/admin/Articles';
import AdminLinks from './pages/admin/Links';
import AdminAds from './pages/admin/Ads';
import AdminSettings from './pages/admin/Settings';
import AdminLogin from './pages/admin/Login';
import TimerPageOne from './pages/timer/PageOne';
import TimerPageTwo from './pages/timer/PageTwo';
import RedirectPage from './pages/timer/RedirectPage';
import ArticleView from './pages/ArticleView';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article/:slug" element={<ArticleView />} />
      
      {/* Short Link Flow */}
      <Route path="/s/:shortCode" element={<TimerPageOne />} />
      <Route path="/timer/:shortCode/2" element={<TimerPageTwo />} />
      <Route path="/redirect/:shortCode" element={<RedirectPage />} />

      {/* Admin Panel */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="articles" element={<AdminArticles />} />
        <Route path="links" element={<AdminLinks />} />
        <Route path="ads" element={<AdminAds />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}
