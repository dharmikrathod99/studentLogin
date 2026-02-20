import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "../style/students.css";

const Students = () => {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        course: "",
    });

    const token = localStorage.getItem("token");

    const fetchStudents = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/students/all",
                { headers: { Authorization: token } }
            );
            setStudents(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/students/create",
                form,
                { headers: { Authorization: token } }
            );

            setForm({ name: "", email: "", course: "" });
            fetchStudents();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteStudent = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/students/delete/${id}`,
                { headers: { Authorization: token } }
            );
            fetchStudents();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="layout">
            <Sidebar />

            <div className="content">
                <h2 className="page-title">Student Registration</h2>

                {/* FORM CARD */}
                <div className="form-card">
                    <form onSubmit={handleSubmit}>
                        <input
                            value={form.name}
                            placeholder="Student Name"
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            required
                        />
                        <input
                            value={form.email}
                            placeholder="Email Address"
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            required
                        />
                        <input
                            value={form.course}
                            placeholder="Course"
                            onChange={(e) =>
                                setForm({ ...form, course: e.target.value })
                            }
                            required
                        />
                        <button type="submit" className="btn-primary">
                            Add Student
                        </button>
                    </form>
                </div>

                {/* TABLE CARD */}
                <div className="table-card">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Course</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="no-data">
                                        No Students Found
                                    </td>
                                </tr>
                            ) : (
                                students.map((s) => (
                                    <tr key={s._id}>
                                        <td>{s.name}</td>
                                        <td>{s.email}</td>
                                        <td>{s.course}</td>
                                        <td>
                                            <button
                                                className="btn-delete"
                                                onClick={() => deleteStudent(s._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Students;
