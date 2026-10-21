export function formatCurrency(amount) {
  if (amount === undefined || amount === null) return '—';
  return '₹' + amount.toLocaleString('en-IN');
}

export function formatPercentile(val) {
  if (val === undefined || val === null || isNaN(val)) return '—';
  return Number(val).toFixed(2);
}

export function validatePercentile(val) {
  const num = parseFloat(val);
  if (isNaN(num)) {
    return { valid: false, message: 'Please enter a valid numeric percentile.' };
  }
  if (num < 0 || num > 100) {
    return { valid: false, message: 'Percentile must be between 0.00 and 100.00.' };
  }
  return { valid: true, value: num };
}
