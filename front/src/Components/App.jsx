import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Chat from './Chat';
import Login from './Login';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exect key="login" path="/" element={<Login />} />
          <Route exect key="chat" path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
