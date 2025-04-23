export const validatePhone = (phone) => {
  if (!phone) return false;

  const normalizedPhone = phone.replace(/[^A-Z0-9]+/gi, '');
  if (normalizedPhone.length > 11) return false;
  if (normalizedPhone.length < 10) return false;

  return true;
}