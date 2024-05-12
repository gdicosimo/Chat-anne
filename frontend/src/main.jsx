import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './components/Login.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from './components/Welcome.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/chat' element={<App />}/>
        <Route path='/login' element={<Login login={true} />}/>
        <Route path='/register' element={<Login login={false} />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
