import { useState } from "react";
import { Link } from "react-router-dom";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import axios from "axios";

function SignupForm() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S{3}/;
        return re.test(email);
    }

    const validatePassword = (password) => {
        return password.length >= 8;
    }

    const submitForm = async (e) => {
        e.preventDefault();

        axios.post("http://127.0.0.1:8000/auth/register/", user, {
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            console.log(res);
            alert("Email has been sent to your email address. Please verify your email to login.");
            window.location.href = "/login";
        }).catch((err) => {
            const { status, data } = err.response;

            if (status === 400) {
                if (data.username) {
                    setError((prev) => ({ ...prev, username: data.username[0] }));
                } else {
                    setError((prev) => ({ ...prev, username: "" }));
                }

                if (data.email) {
                    setError((prev) => ({ ...prev, email: data.email[0] }));
                } else {
                    setError((prev) => ({ ...prev, email: "" }));
                }

                if (data.password) {
                    setError((prev) => ({ ...prev, password: data.password[0] }));
                } else {
                    setError((prev) => ({ ...prev, password: "" }));
                }

                if (data.password2) {
                    setError((prev) => ({ ...prev, password2: data.password2[0] }));
                } else {
                    setError((prev) => ({ ...prev, password2: "" }));
                }
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);

        if (!user.username) {
            setError((prev) => ({ ...prev, username: "Username is required" }));
        } else {
            setError((prev) => ({ ...prev, username: "" }));
        }

        if (!user.email) {
            setError((prev) => ({ ...prev, email: "Email is required" }));
        } else if (!validateEmail(user.email)) {
            setError((prev) => ({ ...prev, email: "Email is invalid" }));
        } else {
            setError((prev) => ({ ...prev, email: "" }));
        }

        if (!user.password) {
            setError((prev) => ({ ...prev, password: "Password is required" }));
        } else if (!validatePassword(user.password)) {
            setError((prev) => ({ ...prev, password: "Password is invalid" }));
        } else {
            setError((prev) => ({ ...prev, password: "" }));
        }

        if (!user.password2) {
            setError((prev) => ({ ...prev, password2: "Confirm Password is required" }));
        } else if (user.password !== user.password2) {
            setError((prev) => ({ ...prev, password2: "Password does not match" }));
        } else {
            setError((prev) => ({ ...prev, password2: "" }));
        }

        if (user.username && user.email && validateEmail(user.email) && user.password && validatePassword(user.password) && user.password2 && user.password === user.password2) {
            console.log("Form is validated");
            submitForm(e);
        } else {
            console.log("Form is not validated");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h2>

                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            {error.username && <p className="mt-1 text-xs font-medium text-red-500">{error.username}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email address"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            <span className={error.password ? "absolute right-2 bottom-7 cursor-pointer" : "absolute right-2 bottom-2 cursor-pointer"} onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <PiEyeClosedBold className="text-2xl" /> : <PiEyeBold className="text-2xl" />}
                            </span>
                            {error.password && <p className="mt-1 text-xs font-medium text-red-500">{error.password}</p>}
                        </div>

                        <div className="relative">
                            <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password2"
                                id="password2"
                                placeholder="Confirm Password"
                                value={user.password2}
                                onChange={(e) => setUser({ ...user, password2: e.target.value })}
                                className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 focus:border-blue-500 focus:outline-none focus:ring"
                            />
                            <span className={error.password2 ? "absolute right-2 bottom-7 cursor-pointer" : "absolute right-2 bottom-2 cursor-pointer"} onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <PiEyeClosedBold className="text-2xl" /> : <PiEyeBold className="text-2xl" />}
                            </span>
                            {error.password2 && <p className="mt-1 text-xs font-medium text-red-500">{error.password2}</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-teal-600 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
                            Sign in
                        </button>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
