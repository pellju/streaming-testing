import axios from "axios";

export async function clientLoginAction (formData: FormData) {

    const username: string|undefined = formData.get('username')?.toString();
    const password: string|undefined = formData.get('password')?.toString();

    if (!username || !password) {

        return { success: false, message: "Username or password missing" };
    } else {
        // Breaks here:
        const baseURL = process.env.NEXT_PUBLIC_BACKEND_ADDRESS; // Includes the last "/"
        const loginUrl = baseURL + 'login';

        const data = {
            "username": username,
            "password": password,
        };

        try {
            await axios.post(loginUrl, data, { withCredentials: true });

            return { success: true, message: "Success!" };
        } catch (e: any) {
            console.log("Error while logging in!");
            console.log(e.err);
            return { success: false, message: "Username or password incorrect" };
        }       
    }
}