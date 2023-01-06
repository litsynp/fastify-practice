export function extractDatabaseName(url: string): string {
  return new URL(url).pathname.replace(/^\//, '')
}
