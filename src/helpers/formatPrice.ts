export const formatPrice = (amount: number, isDouble: boolean) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: isDouble ? 2 : 0,
  })
    .format(amount)
    .replace(/\$/i, '')
    .trim();
};
