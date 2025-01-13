import React from 'react'

interface RegistrationProps {
    loginUsername: string,
    setLoginUsername: any, // ToDo: Find a proper type
    loginPassword: string,
    setLoginPassword: any, // ToDo: Find a proper type
    handleLogin: any // ToDo: Find a proper type
}

const Login: React.FC<RegistrationProps> = ({ loginUsername, setLoginUsername, loginPassword, setLoginPassword, handleLogin }) => {

    return (
        <div id="loginForm">
            <form onSubmit={handleLogin}>
                    <div>
                        Username: <input type='text' value={loginUsername} name='loginUsername' onChange={({target}) => setLoginUsername(target.value)}/>
                    </div>
                    <div>
                        Password: <input type='password' value={loginPassword} name='loginPassword' onChange={({target}) => setLoginPassword(target.value)}/>
                    </div>
                    <br />
                    <button id='login-button' type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;