// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import EntrancePage from './page_parts/entrancePage';
import MainPage from './page_parts/mainPage';
import { ToastContainer } from 'react-toastify';

function App() {

  // const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <Routes>
        <Route path='/' element={<EntrancePage/>} />
        <Route path='/main' element={<MainPage/>}  />
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
