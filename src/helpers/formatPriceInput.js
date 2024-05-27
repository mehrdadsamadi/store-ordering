export function formatPriceNumber(value) {
  return String(value).replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}