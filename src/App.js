import './App.css';
import { Header } from './components/Header';
import { HorseArea } from './components/HorseArea';
import { Menu } from './components/Menu';

function App() {
  return (
    <div className="App bg-amber-50 items-center">
      <Header />
      <Menu />
      <HorseArea />
    </div>
  );
}

export default App;
