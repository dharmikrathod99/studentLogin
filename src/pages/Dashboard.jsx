import Sidebar from "../components/Sidebar.jsx";

const Dashboard = () => {
    const name = localStorage.getItem("name");

    return (
        <div className="layout">
            <Sidebar />
            <div className="content">
                <h1>Welcome {name} </h1>
            </div>
        </div>
    );
};

export default Dashboard;
