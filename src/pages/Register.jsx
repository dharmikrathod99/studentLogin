import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../style/ragister.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/auth/register",
                { name, email, password }
            );

            alert("Registration Successful ");
            navigate("/");
        } catch (error) {
            alert("Registration Failed ");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create Account </h2>
                <p className="subtitle">Register </p>

                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

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
                        Register
                    </button>
                </form>

                <p className="switch-text">
                    Already have an account?
                    <Link to="/"> Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
