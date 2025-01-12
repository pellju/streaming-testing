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

// Importing services
import userservice from './services/userservice';
import streamservice from './services/streamservice';

function App() {
  // Account-related management
  const [loggedIn, setLoggedIn] = useState(null);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // ToDo: Also, create a new view for admin-related things, i.e. managing streams and handling users and invites

  // Adding registration values:
  const [regUsername, setRegUsername] = useState<string>('');
  const [regPassword, setRegPassword] = useState<string>('');
  const [confRegPassword, setConfRegPassword] = useState<string>('');
  const [regInvite, setRegInvite] = useState<string>('');
  const [infoMessage, setInfoMessage] = useState<string>('');
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
      // ToDo: Check request response and create a info message banner if succeed or not
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

    try {
      const request = await userservice.login({ username: loginUsername, password: loginPassword});
      console.log(request);

      // ToDo: Check here if user is admin or not and if true, change the status
      // To do that create a new endpoint, or check the groups the response above returns.

      setRegUsername('');
      setRegPassword('');
      setConfRegPassword('');
      setRegInvite('');

      const streamResponse = await streamservice.fetchStreams();
      console.log(streamResponse);

    } catch (e: unknown) {

      console.log("Error handling the registration!");
      setRegUsername('');
      setRegPassword('');
      setConfRegPassword('');
      setRegInvite('');

    }

    console.log("handlingLogin...");
    setLoginUsername('');
    setLoginPassword('');
  }

  // ToDo: Create a toggle which shows registration- and login-forms
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
