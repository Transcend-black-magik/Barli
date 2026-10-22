import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveRoute } from '../routes.js';
import { roomCategories, categoryPath, roomPath } from '../../pages/rooms-and-suites/data/roomCatalog.js';
test('all category and room URLs resolve to their own content and navigation depth', () => {
  assert.equal(roomCategories.length, 4);
  const urls = new Set();
  for (const category of roomCategories) {
    assert.equal(resolveRoute(categoryPath(category.slug)).category, category);
    for (const room of category.rooms) {
      const route = resolveRoute(roomPath(room));
      assert.equal(route.room, room);
      assert.equal(route.rank, 3);
      assert.ok(resolveRoute(categoryPath(category.slug)).rank < route.rank);
      urls.add(roomPath(room));
    }
  }
  assert.equal(urls.size, 12);
});
test('about aliases, contact, and missing routes resolve safely', () => {
  assert.equal(resolveRoute('/our-story/').kind, 'about');
  assert.equal(resolveRoute('/about-us/').kind, 'about');
  assert.equal(resolveRoute('/contact/').kind, 'contact');
  for (const path of ['/missing', '/rooms-and-suites/missing/', '/rooms-and-suites/deluxe-room/missing/', '/rooms-and-suites/deluxe-room/classic/extra']) assert.equal(resolveRoute(path).kind, '404');
});
