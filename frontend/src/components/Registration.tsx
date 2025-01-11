import React from 'react'

interface RegistrationProps {
    regUsername: string,
    setRegUsername: any, // ToDo: Find a proper type
    regPassword: string,
    setRegPassword: any, // ToDo: Find a proper type
    confRegPassword: string,
    setConfRegPassword: any, // ToDo: Find a proper type
    regInvite: string,
    setRegInvite: any, // ToDo: Find a proper type
    handleRegistration: any // ToDo: Find a proper type
}

const Registration: React.FC<RegistrationProps> = ({ regUsername, setRegUsername, regPassword, setRegPassword, confRegPassword, setConfRegPassword, regInvite, setRegInvite, handleRegistration }) => {

    return (
        <div id="registrationForm">
            <form onSubmit={handleRegistration}>
                    <div>
                        Username: <input type='text' value={regUsername} name='regUsername' onChange={({target}) => setRegUsername(target.value)}/>
                    </div>
                    <div>
                        Password: <input type='password' value={regPassword} name='regPassword' onChange={({target}) => setRegPassword(target.value)}/>
                    </div>
                    <div>
                        Confirm Password: <input type='password' value={confRegPassword} name='regPassword' onChange={({target}) => setConfRegPassword(target.value)}/>
                    </div>
                    <div>
                        Invitecode: <input type='text' value={regInvite} name='regPassword' onChange={({target}) => setRegInvite(target.value)}/>
                    </div>
                    <br />
                    <button id='registration-button' type='submit'>Register</button>
            </form>
        </div>
    )
}

export default Registration;