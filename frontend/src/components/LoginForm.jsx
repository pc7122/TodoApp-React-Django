import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";


function LoginForm() {
    const navigator = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({
        email: "",
        password: "",
    });

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S{3}/;
        return re.test(email);
    }

    const submitForm = (e) => {
        e.preventDefault();

        const user = {
            email: email,
            password: password
        }

        axios.defaults.headers.common["Authorization"] = "";

        axios.post("http://127.0.0.1:8000/auth/token/", user, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                console.log(res.data);
                localStorage.clear();
                localStorage.setItem("access", res.data.access);
                localStorage.setItem("refresh", res.data.refresh);
                navigator("/");
            })
            .catch((err) => {
                console.log(err);
                if (err.response && err.response.status === 406) {
                    alert("please verify your email first");
                } else {
                    alert("Invalid email or password");
                }
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setError((prev) => ({ ...prev, email: "Email is required" }));
        } else if (!validateEmail(email)) {
            setError((prev) => ({ ...prev, email: "Email is invalid" }));
        } else {
            setError((prev) => ({ ...prev, email: "" }));
        }

        if (!password) {
            setError((prev) => ({ ...prev, password: "Password is required" }));
        } else {
            setError((prev) => ({ ...prev, password: "" }));
        }

        if (email && validateEmail(email) && password) {
            console.log("Form submitted");

            submitForm(e);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h2>

                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            {error.email && <p className="mt-1 text-xs font-medium text-red-500">{error.email}</p>}
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            <span className="absolute right-2 bottom-2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <PiEyeClosedBold className="text-2xl" /> : <PiEyeBold className="text-2xl" />}
                            </span>
                            {error.password && <p className="mt-1 text-xs font-medium text-red-500">{error.password}</p>}
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="inline-flex items-center">
                                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="remember">
                                    <input
                                        type="checkbox"
                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-teal-900 checked:bg-teal-900 checked:before:bg-teal-900 hover:before:opacity-10"
                                        id="remember"
                                        value={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                    />
                                    <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </label>
                                <label className="font-light text-gray-700 cursor-pointer select-none" htmlFor="remember">
                                    <div>
                                        <p className="text-sm font-medium text-teal-700">
                                            Remember Me
                                        </p>
                                    </div>
                                </label>
                            </div>
                            <Link to="/forgot-password" className="text-sm font-medium text-teal-700 hover:underline dark:text-teal-200">Forgot Password ?</Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
                            Sign in
                        </button>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;