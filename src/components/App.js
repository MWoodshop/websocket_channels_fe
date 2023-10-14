import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import GameRoom from './GameRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game/:gameId" element={<GameRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
