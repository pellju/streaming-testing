import { registerAction } from "@/app/data/actions/auth-actions"

export function RegistrationForm() {
    return (
        <div>
            <form action={registerAction}>

                <div id="reggister">

                    <p><input type="text" placeholder="Username" name="username" required></input></p>
                    <p></p>
                    <p><input type="password" placeholder="Password" name="password" required></input></p>
                    <p></p>
                    <p><input type="password" placeholder="Password Again" name="password_again" required></input></p>
                    <p></p>
                    <p><input type="text" placeholder="Invitecode" name="invitecode" required></input></p>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}