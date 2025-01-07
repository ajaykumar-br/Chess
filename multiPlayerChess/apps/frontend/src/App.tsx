import Home from './screens/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './screens/Game';

function App() {

  return (
    <>
      <div className="bg-slate-900">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App
