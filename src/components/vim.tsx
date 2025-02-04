import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from '@xterm/xterm'
import { WebLinksAddon } from '@xterm/addon-web-links';
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css';
import { CreateFile } from '../backend/virtualFileSystem';

type VimProps = {
  onQuit: () => void;
  path: string
};

const VimComponent: React.FC<VimProps> = ({onQuit, path}) => {
  const vimRef = useRef<HTMLDivElement>(null);
  const vim = useRef<Terminal>(new Terminal());
  const fitAddon = new FitAddon();
  let inputBuffer = useRef('');
  
  useEffect(() => {
    if (vimRef.current) {
      vim.current.open(vimRef.current);
      vim.current.loadAddon(new WebLinksAddon());
      vim.current.loadAddon(new FitAddon());
      fitAddon.activate(vim.current)
      fitAddon.fit()
      renderStyle()
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
  };

  const handleUserInput = (data: string) => {
    inputHandlers[data]?.();
    if (!inputHandlers[data]) {
      vim.current.write(data);
      inputBuffer.current += data;
    }
  };
  function handleEscape(){
    CreateFile({path: path, content: inputBuffer.current})
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
    return;
  }
  function renderStyle() {
    vim.current.clear();
    for (let i = 0; i < 1000; i++) {
      vim.current.write(`~\r\n`);
    }
    vim.current.write(`\x1b[${1};${2}H`);
    vim.current.focus();
  }

  return <div ref={vimRef} id="terminal"/>;
}

export default VimComponent;