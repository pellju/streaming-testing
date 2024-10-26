export function LoginForm() {
    return (
        <div>
            <form action="" method="POST">

                <div id="login">

                    <p><input type="text" placeholder="Username" name="username" required></input></p>
                    <p><input type="password" placeholder="Password" name="password" required></input></p>

                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}