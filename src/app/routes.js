import { findCategory, findRoom } from '../pages/rooms-and-suites/data/roomCatalog.js';

export function resolveRoute(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return { kind: 'home', key: path, rank: 0, title: 'Barli Hotel | A thoughtful escape' };
  if (path === '/our-story' || path === '/about-us') return { kind: 'about', key: path, rank: 1, title: 'About Us | Barli Hotel' };
  if (path === '/contact') return { kind: 'contact', key: path, rank: 1, title: 'Contact | Barli Hotel' };
  if (path === '/rooms-and-suites') return { kind: 'rooms', key: path, rank: 1, title: 'Rooms & Suites | Barli Hotel' };
  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'rooms-and-suites' && parts.length === 2) {
    const category = findCategory(parts[1]);
    if (category) return { kind: 'category', category, key: path, rank: 2, title: `${category.name} Collection | Barli Hotel` };
  }
  if (parts[0] === 'rooms-and-suites' && parts.length === 3) {
    const room = findRoom(parts[1], parts[2]);
    if (room) return { kind: 'room', room, key: path, rank: 3, title: `${room.name} | Barli Hotel` };
  }
  return { kind: '404', key: path, rank: 1, title: 'Page Not Found | Barli Hotel' };
}
