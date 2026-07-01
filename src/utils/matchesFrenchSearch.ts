export function normalizeFrenchSearch(text: string): string {
  return text.trim().toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')
}

export function matchesFrenchSearch(query: string, french: string): boolean {
  const q = normalizeFrenchSearch(query)
  if (!q) return true
  return normalizeFrenchSearch(french).includes(q)
}
