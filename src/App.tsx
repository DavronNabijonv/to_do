// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import EntrancePage from './page_parts/entrancePage';
import MainPage from './page_parts/mainPage';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function App() {

  // const navigate = useNavigate();

  // useEffect(()=>{
  //   const token = localStorage.getItem('token');
  //   if(token){
  //     navigate('/main')
  //   }else{
  //     navigate('/');
  //   }
  // },[])

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
