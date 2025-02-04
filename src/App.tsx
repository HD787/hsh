import { useRef, useState } from 'react';
import './App.css'
import TerminalComponent from './components/terminal'
import VimComponent from './components/vim'

function App() {
  const [currentView, setCurrentView] = useState<'terminal' | 'vim'>('terminal');
  const file= useRef<string>(""); //this is just gonna be for vim i think

  const handleQuitVim = () => {
    setCurrentView('terminal');
  };

  return (
    <>
    <div style={{ display: currentView === 'terminal' ? 'block' : 'none' }}>
      <TerminalComponent onOpenVim={(path) => {file.current = path; setCurrentView('vim');}}/>
    </div>
      {currentView === 'vim' && <VimComponent onQuit={handleQuitVim} path={file.current} />}
    </>
  )
}

export default App
