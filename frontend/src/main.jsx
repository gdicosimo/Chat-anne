import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './components/Login.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from './components/Welcome.jsx'
import Cookies from 'js-cookie'
import NotFound from './components/NotFound.jsx'

function MainRouter(){
  const logged = Cookies.get('access_token_cookie') != null 
  return (
    <BrowserRouter>
      <Routes>
      {
        logged ? (
          <Route path='/chat/:id' element={<App />}/>
        ) : <Route path='/chat/:id' element={<NotFound />}/>
      }
        <Route path='/' element={<Welcome/>}/>
        <Route path='/login' element={<Login login={true} />}/>
        <Route path='/register' element={<Login login={false} />}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MainRouter />);
