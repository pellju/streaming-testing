"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
//import { loginAction } from "@/app/data/actions/server-auth-actions"
import { clientLoginAction } from "@/app/data/actions/client-auth-actions";


export function LoginForm() {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        //const {success, message} = await loginAction(formData);
        const {success, message} = await clientLoginAction(formData);

        if (success) {
            router.push("/frontpage");
        } else {
            setErrorMessage(message);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} method="POST">

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