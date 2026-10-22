export function localDateKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function validateBooking(values, maxGuests, today = localDateKey()) {
  if (!values.name.trim()) return 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) return 'Please enter a valid email address.';
  const validDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(`${value}T12:00:00Z`).toISOString().slice(0, 10) === value;
  if (!validDate(values.checkIn) || values.checkIn < today) return 'Choose a check-in date today or later.';
  if (!validDate(values.checkOut) || values.checkOut <= values.checkIn) return 'Check-out must be after check-in.';
  if (!Number.isInteger(Number(values.guests)) || Number(values.guests) < 1 || Number(values.guests) > maxGuests) return `Choose between 1 and ${maxGuests} guests.`;
  return '';
}

export function downloadRequest(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
