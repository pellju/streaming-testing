import { loginAction } from "@/app/data/actions/auth-actions"

export function LoginForm() {
    return (
        <div>
            <form action={loginAction}>

                <div id="login">

                    <p><input type="text" placeholder="Username" name="username" required></input></p>
                    <p></p>
                    <p><input type="password" placeholder="Password" name="password" required></input></p>
                    <p></p>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}