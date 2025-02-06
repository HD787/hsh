import { Terminal } from '@xterm/xterm'

export function createTerminal(): Terminal{
  return new Terminal({
    cursorBlink: true,
    fontSize: 18,
    fontFamily: "'Cascadia Code', monospace",
    fontWeight: "normal",
    fontWeightBold: "bold",
    theme: {
      background: "#f5f5f5",
      foreground: "#4a4a4a",
      cursor: 'rgba(150, 150, 150, 0.3)', 
      selectionForeground: 'rgba(150, 150, 150, 0.3)',
      selectionBackground: 'rgba(150, 150, 150, 0.3)'
    }
  })
}