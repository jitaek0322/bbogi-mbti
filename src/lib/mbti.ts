export type Axis = 'E'|'I'|'S'|'N'|'T'|'F'|'J'|'P';

export function scoreToMbti(scores: Record<Axis, number>) {
  const ei = (scores['E'] ?? 0) >= (scores['I'] ?? 0) ? 'E' : 'I'
  const sn = (scores['S'] ?? 0) >= (scores['N'] ?? 0) ? 'S' : 'N'
  const tf = (scores['T'] ?? 0) >= (scores['F'] ?? 0) ? 'T' : 'F'
  const jp = (scores['J'] ?? 0) >= (scores['P'] ?? 0) ? 'J' : 'P'
  return `${ei}${sn}${tf}${jp}`
}
