import { collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, orderBy, limit, where, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Article, ShortLink, AdSettings, SiteSettings } from '../types';

// Articles
export async function getArticles() {
  const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Article));
}

export async function getPublishedArticles() {
  const q = query(collection(db, 'articles'), where('status', '==', 'Published'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Article));
}

export async function getArticleBySlug(slug: string) {
  const q = query(collection(db, 'articles'), where('slug', '==', slug), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as Article;
}

export async function getRandomArticle(excludeId?: string) {
  const articles = await getPublishedArticles();
  if (articles.length === 0) return null;
  const filtered = excludeId ? articles.filter(a => a.id !== excludeId) : articles;
  const pool = filtered.length > 0 ? filtered : articles;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

export async function saveArticle(article: Article) {
  if (article.id) {
    const { id, ...data } = article;
    await updateDoc(doc(db, 'articles', id), data as any);
  } else {
    await addDoc(collection(db, 'articles'), { ...article, createdAt: Date.now() });
  }
}

export async function deleteArticle(id: string) {
  await deleteDoc(doc(db, 'articles', id));
}

// ShortLinks
export async function getShortLinks() {
  const q = query(collection(db, 'shortlinks'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as ShortLink));
}

export async function getShortLink(shortCode: string) {
  const q = query(collection(db, 'shortlinks'), where('shortCode', '==', shortCode), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as ShortLink;
}

export async function saveShortLink(link: ShortLink) {
  if (link.id) {
    const { id, ...data } = link;
    await updateDoc(doc(db, 'shortlinks', id), data as any);
  } else {
    await addDoc(collection(db, 'shortlinks'), { ...link, createdAt: Date.now(), clickCounter: 0 });
  }
}

export async function incrementClickCount(id: string, currentCount: number) {
  await updateDoc(doc(db, 'shortlinks', id), { clickCounter: currentCount + 1 });
}

export async function deleteShortLink(id: string) {
  await deleteDoc(doc(db, 'shortlinks', id));
}

// Ads & Settings
export async function getAdSettings(): Promise<AdSettings | null> {
  const snap = await getDoc(doc(db, 'settings', 'ads'));
  if (!snap.exists()) return null;
  return snap.data() as AdSettings;
}

export async function saveAdSettings(settings: AdSettings) {
  await setDoc(doc(db, 'settings', 'ads'), settings);
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const snap = await getDoc(doc(db, 'settings', 'site'));
  if (!snap.exists()) return null;
  return snap.data() as SiteSettings;
}

export async function saveSiteSettings(settings: SiteSettings) {
  await setDoc(doc(db, 'settings', 'site'), settings);
}
