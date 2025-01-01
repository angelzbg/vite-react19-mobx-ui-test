export const generateRandomId = (length = 8) => {
  return Math.random().toString(36).substr(2, length) + Date.now().toString(36).substr(-4);
};
