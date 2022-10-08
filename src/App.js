import './App.css';
import Header from './appComponents/Header';
import Palette from './appComponents/Palette';
import Footer from './appComponents/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Palette />
      <Footer />
    </div>
  );
}

export default App;
