import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm'
import { WebLinksAddon } from '@xterm/addon-web-links';
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css';
import { CreateFile, openFile } from '../backend/virtualFileSystem';
import { createTerminal } from '../utils/createTerminal';

type VimProps = {
  onQuit: () => void;
  path: string
};

const VimComponent: React.FC<VimProps> = ({onQuit, path}) => {
  const vimRef = useRef<HTMLDivElement>(null);
  const vim = useRef<Terminal>(createTerminal());
  const fitAddon = new FitAddon();
  let inputBuffer = useRef('');
  
  useEffect(() => {
    if (vimRef.current) {
      vim.current.open(vimRef.current);
      vim.current.loadAddon(new WebLinksAddon());
      vim.current.loadAddon(new FitAddon());
      fitAddon.activate(vim.current)
      fitAddon.fit()
      inputBuffer.current = openFile(path);
      console.log(inputBuffer.current);
      renderStyle()
      vim.current.write(inputBuffer.current.replace(/\n/g, "\r\n\x1b[1C"));
      
    }
    const input = vim.current.onData((data) => {
      handleUserInput(data);
    });
    return () => {
      input.dispose();
    }
  }, []);

  const inputHandlers: { [key: string]: () => void } = {
    '\x7f': handleBackspace,
    '\x1b': handleEscape, 
    '\r': handleReturn,
    '\x1b[A': handleArrowKey,
    '\x1b[B': handleArrowKey,
    '\x1b[C': handleArrowKey,
    '\x1b[D': handleArrowKey,
  };

  const handleUserInput = (data: string) => {
    inputHandlers[data]?.();
    if (!inputHandlers[data]) {
      vim.current.write(data);
      inputBuffer.current += data;
    }
  };
  function handleArrowKey(){;}//this simplifies things for now
  function handleEscape(){
    CreateFile({path: path, content: inputBuffer.current, overwrite: true})
    onQuit();
  }
  function handleReturn(){
    vim.current.write("\r\n~"); //this is a bit hacky
    inputBuffer.current += "\r\n";
  }
  function handleBackspace(){
    if (vim.current.buffer.active.cursorX > 1) {
      vim.current.write('\b \b');
      inputBuffer.current = inputBuffer.current.slice(0, -1);
    }
    else if(inputBuffer.current.length > 0){
      let lastNewLine = inputBuffer.current.lastIndexOf("\n");
      let secondToLastNewLine = inputBuffer.current.slice(0, -1).lastIndexOf("\n");
      if(lastNewLine === -1){ 
        vim.current.write("\x1b[A" + "\x1b[C".repeat(inputBuffer.current.length - 1))
        inputBuffer.current = inputBuffer.current.slice(0, -1);
        return;
      }
      const diff = lastNewLine - secondToLastNewLine;
      vim.current.write("\x1b[A" + "\x1b[C".repeat(diff - 1))
      inputBuffer.current = inputBuffer.current.slice(0, -1);
    }
    return;
  }
  function renderStyle() {
    vim.current.clear();
    for (let i = 0; i < 1000; i++) {
      vim.current.write(` \b~\r\n`);
    }
    vim.current.write(`\x1b[${1};${2}H`);
    vim.current.focus();
  }

  return <div ref={vimRef} id="terminal"/>;
}

export default VimComponent;