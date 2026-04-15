export const formatINR = (value?: number | string) => {
  if (value == null || value === '') return '-'

  const amount = Number(value)
  if (Number.isNaN(amount)) return '-'

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount)
}
