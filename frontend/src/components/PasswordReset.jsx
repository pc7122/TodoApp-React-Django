import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PasswordReset() {
    let { token, email } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({
        password: "",
        password2: ""
    });

    useEffect(() => {
        console.log(token, email);
    }, [token, email]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!password || !confirmPassword) {
            setError((prev) => ({ ...prev, password: "Password is required", password2: "Password is required" }));
            return;
        }

        if (password !== confirmPassword) {
            setError((prev) => ({ ...prev, password: "", password2: "Passwords do not match" }));
            return;
        }

        console.log(password, confirmPassword);

        axios.put("http://127.0.0.1:8000/auth/password-reset/", {
            OTP: token,
            email: email,
            password: password,
            confirm_password: confirmPassword
        })
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    alert("Password reset successful");
                    window.location.href = "/login";
                }
            })
            .catch((err) => {
                console.log(err);
                if (err.response && err.response.status === 404) {
                    alert("Invalid token or email");
                } else if (err.response && err.response.status === 400) {
                    if (err.response.data.password) {
                        setError((prev) => ({ ...prev, password: err.response.data.password }));
                    }
                    if (err.response.data.confirm_password) {
                        setError((prev) => ({ ...prev, password2: err.response.data.confirm_password }));
                    }
                }
            })

    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Forgot Password</h2>

                    <form className="space-y-4 md:space-y-6">
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                            />
                            {error.password && <p className="mt-1 text-xs font-medium text-red-500">{error.password}</p>}
                        </div>
                        <div>
                            <label htmlFor="password2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                            <input
                                type="password"
                                name="password2"
                                id="password2"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                            />
                            {error.password2 && <p className="mt-1 text-xs font-medium text-red-500">{error.password2}</p>}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-sm font-medium tracking-wide text-white transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                                onClick={handleSubmit}
                            >
                                Submit Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PasswordReset;