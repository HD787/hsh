export function format(content: string): string{
  return content = content
    .replace(/\\n/g, '\n\r')
    .replace(/\\t/g, '\t')
    .replace(/\\\\/g, '\\')
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\r/g, '\r')
    .replace(/\\b/g, '\b') ?? "";
}