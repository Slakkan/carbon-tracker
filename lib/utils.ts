export function sleep(min = 200, max = 800) {
  const delay = min + Math.random() * (max - min)
  return new Promise((resolve) => setTimeout(resolve, delay))
}

export const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

export const numberFmt = new Intl.NumberFormat('de-DE', {
  maximumFractionDigits: 0,
})
export const formatNumber = (n: number) => numberFmt.format(n)
