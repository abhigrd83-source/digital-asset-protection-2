export function hammingDistance(hash1: string, hash2: string): number {
  let distance = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] !== hash2[i]) {
      distance++;
    }
  }
  return distance;
}

export function calculateSimilarity(hash1: string, hash2: string): number {
  const distance = hammingDistance(hash1, hash2);
  const maxLen = Math.max(hash1.length, hash2.length);
  if (maxLen === 0) return 0;
  return ((maxLen - distance) / maxLen) * 100;
}
