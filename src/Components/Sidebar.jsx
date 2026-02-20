import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <div className="sidebar">
            <h3>Menu</h3>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/students">Student Registration</Link>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Sidebar;
