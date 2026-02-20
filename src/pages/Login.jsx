import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../style/login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("name", res.data.name);
            navigate("/dashboard");
        } catch (error) {
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login </h2>
                <p className="subtitle">Login to your account</p>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="auth-btn">
                        Login
                    </button>
                </form>

                <p className="switch-text">
                    Don't have an account?
                    <Link to="/register"> Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
