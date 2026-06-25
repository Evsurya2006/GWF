import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getShortLink, incrementClickCount } from '../../lib/db';
import { Loader2 } from 'lucide-react';

export default function RedirectPage() {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function processRedirect() {
      if (!shortCode) {
        setError('Invalid short link.');
        return;
      }
      
      const link = await getShortLink(shortCode);
      if (!link) {
        setError('Link not found or expired.');
        return;
      }

      if (link.status === 'Disable') {
        setError('This link has been disabled.');
        return;
      }

      // Increment counter and redirect
      await incrementClickCount(link.id!, link.clickCounter || 0);
      window.location.href = link.originalUrl;
    }

    processRedirect();
  }, [shortCode]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAF8] flex items-center justify-center p-4">
        <div className="bg-white rounded-[24px] shadow-sm p-8 max-w-md text-center border border-gray-100">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚨</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h1>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col items-center justify-center p-4">
      <Loader2 className="w-12 h-12 text-primary animate-spin mb-6" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Redirecting...</h2>
      <p className="text-gray-500">Taking you to your destination safely.</p>
    </div>
  );
}
