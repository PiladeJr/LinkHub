// Lightweight persistence using localStorage with a JSON seed from public/links.json
// This avoids a database and keeps data in the browser.

const STORAGE_KEY = 'linkhub:data';

async function fetchSeed() {
  try {
    const res = await fetch('/links.json');
    if (!res.ok) throw new Error('Failed to load links.json');
    const json = await res.json();
    return json;
  } catch (e) {
    console.warn('Seed load failed:', e);
    return { categories: [], linksByCategory: {} };
  }
}

export async function initStore() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return JSON.parse(existing);
  const seed = await fetchSeed();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

function readStore() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : { categories: [], linksByCategory: {} };
}

function writeStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getCategories() {
  return readStore().categories || [];
}

export function getLinksByCategory(categoryId) {
  const store = readStore();
  return store.linksByCategory?.[String(categoryId)] || [];
}

export function getAllLinks() {
  const store = readStore();
  return Object.entries(store.linksByCategory || {}).flatMap(([cid, arr]) =>
    (arr || []).map(l => ({ ...l, categoryId: Number(cid) }))
  );
}

export function addLink(categoryId, link) {
  const store = readStore();
  const cid = String(categoryId);
  const nextId = Date.now();
  const categoryName = (store.categories || []).find(c => Number(c.id) === Number(categoryId))?.name;
  let resolvedThumbnail = link.thumbnail;
  try {
    if (!resolvedThumbnail && link.url) {
      const domain = new URL(link.url).hostname;
      resolvedThumbnail = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    }
  } catch {}

  const newLink = {
    id: nextId,
    addedAt: new Date().toISOString(),
    isFavorite: false,
    category: categoryName,
    ...link,
    thumbnail: resolvedThumbnail
  };
  const existing = store.linksByCategory?.[cid] || [];
  store.linksByCategory[cid] = [newLink, ...existing];
  writeStore(store);
  return newLink;
}

export function updateLink(categoryId, linkId, updates) {
  const store = readStore();
  const cid = String(categoryId);
  const arr = store.linksByCategory?.[cid] || [];
  store.linksByCategory[cid] = arr.map(l => (l.id === linkId ? { ...l, ...updates } : l));
  writeStore(store);
}

export function deleteLink(categoryId, linkId) {
  const store = readStore();
  const cid = String(categoryId);
  const arr = store.linksByCategory?.[cid] || [];
  store.linksByCategory[cid] = arr.filter(l => l.id !== linkId);
  writeStore(store);
}

export function toggleFavorite(categoryId, linkId) {
  const store = readStore();
  const cid = String(categoryId);
  const arr = store.linksByCategory?.[cid] || [];
  store.linksByCategory[cid] = arr.map(l => (l.id === linkId ? { ...l, isFavorite: !l.isFavorite } : l));
  writeStore(store);
}

// Category helpers
export function addCategory({ name, color, description = '', icon = 'Folder' }) {
  const store = readStore();
  const nextId = (store.categories?.reduce((max, c) => Math.max(max, Number(c.id)), 0) || 0) + 1;
  const nowIso = new Date().toISOString();
  const newCategory = { id: nextId, name, color, description, icon, createdAt: nowIso, updatedAt: nowIso };
  store.categories = [...(store.categories || []), newCategory];
  store.linksByCategory = { ...(store.linksByCategory || {}), [String(nextId)]: [] };
  writeStore(store);
  return newCategory;
}

export function updateCategory(id, updates) {
  const store = readStore();
  store.categories = (store.categories || []).map(c =>
    Number(c.id) === Number(id) ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
  );
  writeStore(store);
}

export function deleteCategory(id) {
  const store = readStore();
  const cid = String(id);
  store.categories = (store.categories || []).filter(c => Number(c.id) !== Number(id));
  const { [cid]: _, ...rest } = store.linksByCategory || {};
  store.linksByCategory = rest;
  writeStore(store);
}

export function getCategoriesWithStats() {
  const store = readStore();
  const categories = store.categories || [];
  return categories.map(cat => {
    const links = store.linksByCategory?.[String(cat.id)] || [];
    const previewLinks = links.slice(0, 3).map(l => ({ id: l.id, title: l.title, thumbnail: l.thumbnail }));
    let lastUpdated = null;
    if (links.length > 0) {
      const dates = links.map(l => new Date(l.addedAt).getTime());
      lastUpdated = new Date(Math.max(...dates)).toISOString();
    }
    return { ...cat, linkCount: links.length, previewLinks, lastUpdated };
  });
}
