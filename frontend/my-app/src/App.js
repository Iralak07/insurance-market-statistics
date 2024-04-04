import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import ExcelUpload from './components/ExcelUpload';
import ChartPage from './components/ChartPage';
import './styles.css';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/upload" element={<ExcelUpload />} />
          <Route path="/charts" element={<ChartPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;