import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import Qwixx from './Qwixx/Qwixx';
import Navbar from './Navbar';
import './App.scss';

function App() {
  return (
  <div>
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar/>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/qwixx" element={<Qwixx/>}/>
        </Routes>
      </div>
    </Router>
  </div>
  );
}

export default App;
