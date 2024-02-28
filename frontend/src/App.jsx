import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "./components/Tasks"
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ForgotPassword from "./components/ForgetPassword";
import NotFound from "./components/NotFound";
import PasswordReset from "./components/PasswordReset";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/password-reset/:token/:email/" element={<PasswordReset />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
