import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

if (!import.meta.env.VITE_BACKENDURL) {
  console.log("Backend-url not set!");
}

// Importing Registration and Login form
import Registration from './components/Registration'
import Login from './components/Login'

// Importing userService
import userservice from './services/userservice';

function App() {
  //const [count, setCount] = useState(0);
  const [loggedIn, setLoggedIn] = useState(null);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);

  // Adding registration values:
  const [regUsername, setRegUsername] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [confRegPassword, setConfRegPassword] = useState<string>('');
  const [regInvite, setRegInvite] = useState<string>('');
  // regUsername setRegUsername regPassword setRegPassword confRegPassword setConfRegPassword regInvite setRegInvite

  // Adding login values:
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  // loginUsername setLoginUsername loginPassword setLoginPassword


  // Handling registration:
  const handlingRegistration = async (event: any) => {
    event.preventDefault();

    try {
      const request = await userservice.registration({ username: regUsername, password: regPassword, invitecode: regInvite});
      console.log(request);

      setRegUsername('');
      setRegPassword('');
      setConfRegPassword('');
      setRegInvite('');
    } catch (e: unknown) {
      console.log("Error handling the registration!");
      setRegUsername('');
      setRegPassword('');
      setConfRegPassword('');
      setRegInvite('');
    }
  }

  const handlingLogin = async (event: any) => {
    event.preventDefault();

    console.log("handlingLogin...");
    setLoginUsername('');
    setLoginPassword('');
  }

  
 if (loggedIn) {
  return (
    <div className='hero'>
      <div className='container'>
        <center>You have logged in successfully!</center>
      </div>
    </div>
   )
 } else {
  return (
    <div>
      <div className='hero'>
        <div className='container'>
          <h1>Hello world, and welcome!</h1>
          <b>Login:</b>
          <Login loginUsername={loginUsername} setLoginUsername={setLoginUsername} loginPassword={loginPassword} setLoginPassword={setLoginPassword} handleLogin={handlingLogin}/>
          <br />
          <br />
          <b>Registeration:</b>
          <Registration regUsername={regUsername} setRegUsername={setRegUsername} regPassword={regPassword} setRegPassword={setRegPassword} confRegPassword={confRegPassword} setConfRegPassword={setConfRegPassword} regInvite={regInvite} setRegInvite={setRegInvite} handleRegistration={handlingRegistration} />
        </div>
      </div>
    </div>
   )
 }
}

export default App
