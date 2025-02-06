import React, { useEffect, useRef} from 'react';
import { Terminal } from '@xterm/xterm'
import { WebLinksAddon } from '@xterm/addon-web-links';
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css';
import './terminal.css'
import { parseCommand } from '../backend/commandParser';
import { currDir } from '../backend/virtualFileSystem';
import { getCommand, movePointer, pushCommand, resetPointer } from '../utils/commandStack';
import { preLoad } from '../utils/preload';
import { createTerminal } from '../utils/createTerminal';

type TerminalProps = {
  onOpenVim: (path: string) => void;
};

const TerminalComponent: React.FC<TerminalProps> = ({onOpenVim}) => {

  const terminalRef = useRef<HTMLDivElement>(null);
  const terminal = useRef<Terminal>(createTerminal());
  const fitAddon = new FitAddon();
  const prompt = useRef<string>(`guest@Henrys-Website ${currDir.name} % `)
  let inputBuffer = useRef('');

  useEffect(() => {
    if (terminalRef.current) {
      terminal.current.open(terminalRef.current);
      terminal.current.loadAddon(new WebLinksAddon());
      terminal.current.loadAddon(new FitAddon());
      fitAddon.activate(terminal.current)
      fitAddon.fit()


      terminal.current.write('hey, run \'cat readme\' for help\r\n');
      terminal.current.write(prompt.current);
      preLoad();

    }
    const input = terminal.current.onData((data) => {
      handleUserInput(data);
    });
    return () => {
      input.dispose();
    }
  }, []);

  const inputHandlers: { [key: string]: () => void } = {
    '\x7f': handleBackspace,
    '\r': handleReturn,
    '\x1b[A': () => handleVertArrow(-1),
    '\x1b[B': () => handleVertArrow(1),
    '\x1b[D': () => handleSideArrow(-1),
    '\x1b[C': () => handleSideArrow(1),
  };

  const handleUserInput = (data: string) => {
    inputHandlers[data]?.();
    if (!inputHandlers[data]) {
      terminal.current.write(data);
      inputBuffer.current += data;
    }
  };
  function handleReturn(){
    const result = parseCommand(inputBuffer.current)
    if(result !== "" ){
      if(result[0] === '\0'){
        if(result === "\0 break"){ terminal.current.clear();}
        if(result.includes("\0 vim")){ onOpenVim(result.split(" ")[2]); }
        else prompt.current = `guest@Henrys-Website ${currDir.name} % `;
      }
      else terminal.current.write("\r\n" + result);
    }
    pushCommand(inputBuffer.current);
    terminal.current.write(`\r\n${prompt.current}`);
    inputBuffer.current = "";
    resetPointer();
  }
  function handleVertArrow(n: number){
    terminal.current.write('\x1b[2K \r');
    terminal.current.clearSelection();
    movePointer(n);
    inputBuffer.current = getCommand();
    terminal.current.write(prompt.current + inputBuffer.current);
  }
  function handleSideArrow(n: number){
    if(n == -1 && terminal.current.buffer.active.cursorX > prompt.current.length){
      terminal.current.write('\x1b[D');
    }
    if(n == 1 && terminal.current.buffer.active.cursorX < prompt.current.length + inputBuffer.current.length){
      terminal.current.write('\x1b[C');
    }
  }
  function handleBackspace(){
    if (terminal.current.buffer.active.cursorX > prompt.current.length) {
      terminal.current.write('\b \b');
      inputBuffer.current = inputBuffer.current.slice(0, -1);
    }
    return;
  }

  return <div ref={terminalRef} id="terminal"/>;
};

export default TerminalComponent; 