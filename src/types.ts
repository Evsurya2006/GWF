export interface Article {
  id?: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  publishedDate: string;
  status: 'Published' | 'Draft' | 'Hidden' | 'Scheduled' | 'Trash';
  author: string;
  readingTime: string;
  createdAt: number;
}

export interface ShortLink {
  id?: string;
  originalUrl: string;
  shortCode: string;
  customSlug?: string;
  expiryDate?: string;
  status: 'Enable' | 'Disable';
  clickCounter: number;
  createdAt: number;
}

export interface AdSettings {
  id?: string;
  headerAd: string;
  footerAd: string;
  homepageMiddle: string;
  sidebarAd: string;
  articleTop: string;
  articleMiddle: string;
  articleBottom: string;
  timerPage1: string;
  timerPage2: string;
}

export interface SiteSettings {
  id?: string;
  websiteName: string;
  customDomain?: string;
  logoUrl: string;
  faviconUrl: string;
  themeColor: string;
  contactEmail: string;
  footerText: string;
  googleAnalyticsId: string;
  searchConsoleTag: string;
  metaTags: string;
  socialLinks: {
    twitter: string;
    facebook: string;
    linkedin: string;
  };
  headerAdCode?: string;
  sidebarAdCode?: string;
  footerAdCode?: string;
  inArticleAdCode?: string;
}
