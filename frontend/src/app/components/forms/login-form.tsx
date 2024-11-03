"use client"

import { useState } from "react";
import { loginAction } from "@/app/data/actions/server-auth-actions"

export function LoginForm() {

    const [token, setToken] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        console.log("handlesubmit")
        const formData = new FormData(event.currentTarget);
        console.log("usertoken");
        const userToken = await loginAction(formData);
        console.log(userToken);

        if (userToken) {
            setToken(userToken);
            sessionStorage.setItem("auth_token", userToken);
            console.log("setting done");
        } else {
            console.log("setting failed");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>

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