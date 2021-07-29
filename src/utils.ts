export function parseIpType(ip: string) {
  return /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(ip) ? "A" : "AAAA"
}