import { roomCollection } from './roomCollection.js';

const slugs = ['deluxe-room', 'garden-retreat', 'signature-suite', 'the-penthouse'];
const variants = ['Classic', 'Corner', 'Signature'];
const photographs = ['/room-deluxe.jpg', '/room-garden.jpg', '/room-suite.jpg', '/room-penthouse.jpg', '/hotel-lounge-neutral.webp', '/hotel-seating.jpg'];

export const roomCategories = roomCollection.map((category, index) => ({
  ...category,
  slug: slugs[index],
  rooms: variants.map((variant, variantIndex) => ({
    id: `${slugs[index]}-${variant.toLowerCase()}`,
    slug: variant.toLowerCase(),
    categorySlug: slugs[index],
    categoryName: category.name,
    name: `${category.name} — ${variant}`,
    image: variantIndex === 0 ? category.image : photographs[(index + variantIndex) % photographs.length],
    gallery: [category.image, photographs[(index + variantIndex + 1) % photographs.length], '/hotel-lounge-neutral.webp'],
    description: category.description,
    note: [category.title, 'A fresh perspective on a restful stay.', 'Thoughtful details, a little more character.'][variantIndex],
    maxGuests: 2 + (index >= 2 ? 2 : 0),
    features: ['Restful sleeping space', 'Considered interiors', 'Space to unwind'],
  })),
}));

export const categoryPath = slug => `/rooms-and-suites/${slug}/`;
export const roomPath = room => `${categoryPath(room.categorySlug)}${room.slug}/`;
export const findCategory = slug => roomCategories.find(category => category.slug === slug);
export const findRoom = (categorySlug, slug) => findCategory(categorySlug)?.rooms.find(room => room.slug === slug);
