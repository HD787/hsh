import { useRef, useState } from 'react';
import './App.css'
import TerminalComponent from './components/terminal'
import VimComponent from './components/vim'

function App() {
  const [currentView, setCurrentView] = useState<'terminal' | 'vim'>('terminal');
  const file= useRef<string>("");

  const handleQuitVim = () => {
    setCurrentView('terminal');  // Return to terminal when quitting Vim
  };

  return (
    <>
      {currentView === 'terminal' && <TerminalComponent onOpenVim={(path) => {file.current = path; setCurrentView('vim');}} />}
      {currentView === 'vim' && <VimComponent onQuit={handleQuitVim} path={file.current} />}
    </>
  )
}

export default App
