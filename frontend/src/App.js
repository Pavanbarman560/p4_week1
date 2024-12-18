import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryapi from './common';
import context from './context';
import { useDispatch } from 'react-redux';
import { setuserdetails } from './store/userslice';

function App() {
  const dispatch = useDispatch()

  const featchuserdetails = async () => {

    const dataresponce = await fetch(summaryapi.current_user.url, {

      method: summaryapi.current_user.method,
      credentials: 'include'

    })

    const dataapi = await dataresponce.json()
    if (dataapi.success) {
      dispatch(setuserdetails(dataapi.data))
    }

    console.log("data user", dataresponce)

  }

  useEffect(() => {
    //user details

    featchuserdetails()


  })


  return (
    <>
      <context.Provider value={{
        featchuserdetails
      }}>
        <ToastContainer />
        <Header />
        <main className='min-h-[calc(100vh-120px)]'>
          <Outlet />
        </main>
        <Footer />

      </context.Provider>
    </>
  );
}

export default App;