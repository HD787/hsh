import { useRef, useState } from 'react';
import './App.css'
import TerminalComponent from './components/terminal'
import VimComponent from './components/vim'

function App() {
  const [currentView, setCurrentView] = useState<'terminal' | 'vim'>('terminal');
  const file= useRef<string>("");

  const handleQuitVim = () => {
    setCurrentView('terminal');
  };

  return (
    <>
    {/* <link href="https://cdn.jsdelivr.net/gh/microsoft/cascadia-code@latest/webfonts/cascadia-code.css" rel="stylesheet"></link> */}

    <div style={{ display: currentView === 'terminal' ? 'block' : 'none' }}>
      <TerminalComponent onOpenVim={(path) => {file.current = path; setCurrentView('vim');}}/>
    </div>
      {currentView === 'vim' && <VimComponent onQuit={handleQuitVim} path={file.current} />}
    </>
  )
}

export default App
