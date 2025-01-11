import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Importing Registration form
import Registration from './components/Registration'

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
  // regUsername, setRegUsername, regPassword, setRegPassword, confRegPassword, setConfRegPassword, regInvite, setRegInvite

  // Adding login values:
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');


  // Handling registration:
  const handlingRegistration = async (event: any) => {
    event.preventDefault();

    console.log("handlingRegistration...");
    setRegUsername('')
    setRegPassword('')
    setConfRegPassword('')
    setRegInvite('')
  }
  /*return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )*/
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
      <center>Registyration:</center>
      <Registration regUsername={regUsername} setRegUsername={setRegUsername} regPassword={regPassword} setRegPassword={setRegPassword} confRegPassword={confRegPassword} setConfRegPassword={setConfRegPassword} regInvite={regInvite} setRegInvite={setRegInvite} handleRegistration={handlingRegistration} />
    </div>
   )
 }
}

export default App
