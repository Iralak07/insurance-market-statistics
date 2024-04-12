import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Index from './pages/IndexPage/Index'
import FileUploadPage from './pages/FileUploadPage/FileUpload'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Index />
    <FileUploadPage />
  </>
)
