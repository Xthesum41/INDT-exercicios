function isValidEmail(email) {
  if (typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function requireMinLength(value, min) {
  if (typeof value !== "string") throw new Error("INVALID_TYPE");
  if (value.length < min) throw new Error("MIN_LENGTH");
  return true;
}

module.exports = { isValidEmail, requireMinLength };
