import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/IndexPage/Index';
import FileUpload from './pages/FileUploadPage/FileUpload';
import TableDisplay from './pages/TablePage/TableDisplay';
import SomeTable from './components/Tables/SomeTable';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Index />
    <TableDisplay />
  </>
)
