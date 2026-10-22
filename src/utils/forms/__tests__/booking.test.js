import test from 'node:test';
import assert from 'node:assert/strict';
import { validateBooking, localDateKey } from '../booking.js';
const values = { name: 'Guest', email: 'guest@example.com', checkIn: '2026-10-22', checkOut: '2026-10-23', guests: '2' };
const validate = edits => validateBooking({ ...values, ...edits }, 2, '2026-10-22');
test('valid requests accept arrival today and valid leap dates', () => {
  assert.equal(validate({}), '');
  assert.equal(validate({ checkIn: '2028-02-29', checkOut: '2028-03-01' }), '');
  assert.equal(localDateKey(new Date(2026, 0, 2)), '2026-01-02');
});
test('requests reject blank names, invalid emails, past or impossible dates, and invalid guests', () => {
  for (const edits of [{ name: '  ' }, { email: 'bad' }, { checkIn: '2026-10-21' }, { checkIn: '2027-02-29' }, { checkIn: '2026-13-01' }, { checkOut: '2026-10-22' }, { checkOut: '2026-10-20' }, { guests: '0' }, { guests: '3' }, { guests: '1.5' }]) assert.notEqual(validate(edits), '', JSON.stringify(edits));
});
