import axios from 'axios';
import { useState } from 'react';


function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            alert("Email is required");
            return;
        }

        console.log(email);
        axios.post("http://127.0.0.1:8000/auth/verify/", { email: email, client_url: "http://localhost:5173/password-reset" })
            .then((res) => {
                console.log(res.data);
                if (res.data.status === "success") {
                    console.log("Email verified");
                } else {
                    alert("Email not verified, Check your email for verification link");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Forgot Password</h2>

                    <form className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                                onClick={handleSubmit}>
                                Send Reset Link
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;