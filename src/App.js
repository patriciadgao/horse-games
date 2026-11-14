import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { Header } from './components/Header';
import { HorseArea } from './components/HorseArea';
import { Menu } from './components/Menu';

function App() {
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [font, setFont] = useState(localStorage.getItem('font') ?? 'FuzzyBubbles');

  useEffect(() => {
    if (needsRefresh) {
      setFont(localStorage.getItem('font'));
    }
  }, [needsRefresh])

  return (
    <div className={`App ${font} bg-amber-50 items-center`}>
      <Toaster position="top-left" />
      <Header />
      <Menu needsRefresh={needsRefresh} setNeedsRefresh={setNeedsRefresh} />
      <HorseArea needsRefresh={needsRefresh} setNeedsRefresh={setNeedsRefresh} />
    </div>
  );
}

export default App;
