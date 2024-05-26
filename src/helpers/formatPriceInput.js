export function formatPriceNumber(value) {
  return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}