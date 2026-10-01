import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { HorseArea } from './components/HorseArea';
import { Menu } from './components/Menu';

function App() {
  const [needsRefresh, setNeedsRefresh] = useState(false);

  return (
    <div className="App bg-amber-50 items-center">
      <Header />
      <Menu needsRefresh={needsRefresh} setNeedsRefresh={setNeedsRefresh} />
      <HorseArea needsRefresh={needsRefresh} setNeedsRefresh={setNeedsRefresh} />
    </div>
  );
}

export default App;
