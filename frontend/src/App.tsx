import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Importing Registration and Login form
import Registration from './components/Registration'
import Login from './components/Login'

type UsernameProps = {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

type PasswordProps = {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

type InviteProps = {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

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

    console.log("handlingRegistration...");
    setRegUsername('');
    setRegPassword('');
    setConfRegPassword('');
    setRegInvite('');
  }

  const handlingLogin = async (event: any) => {
    event.preventDefault();

    console.log("handlingLogin...");
    setLoginUsername('');
    setLoginPassword('');
  }

  
 if (loggedIn) {
  return (
    <div>
      <center>You have logged in successfully!</center>
    </div>
   )
 } else {
  return (
    <div>
      <h2><center>Hello world, and welcome!</center></h2>
      <center><b>Login:</b></center>
      <Login loginUsername={loginUsername} setLoginUsername={setLoginUsername} loginPassword={loginPassword} setLoginPassword={setLoginPassword} handleLogin={handlingLogin}/>
      <br />
      <br />
      <center><b>Registyration:</b></center>
      <Registration regUsername={regUsername} setRegUsername={setRegUsername} regPassword={regPassword} setRegPassword={setRegPassword} confRegPassword={confRegPassword} setConfRegPassword={setConfRegPassword} regInvite={regInvite} setRegInvite={setRegInvite} handleRegistration={handlingRegistration} />
    </div>
   )
 }
}

export default App
