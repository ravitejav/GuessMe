import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import ErrorBoundary from './Components/ErrorBoundary';
import GameCreation from './Components/GameCreation';
import HomePage from './Components/HomePage';
import { Toaster } from './Components/Toaster';

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/GuessMe/" element={<HomePage />} />
            <Route path="/GuessMe/game" element={<GameCreation />} />
          </Routes>
        </BrowserRouter>,
          
          <Toaster />
        </RecoilRoot>
      </ErrorBoundary>
    </>
  );
}

export default App;
