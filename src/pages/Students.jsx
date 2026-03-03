import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar.jsx";
import "../style/students.css";

const Students = () => {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState({
        name: "",
        email: "",
        course: "",
    });
    const [editingId, setEditingId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

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
            if (isEditing) {
                await axios.put(
                    `http://localhost:5000/api/students/update/${editingId}`,
                    form,
                    { headers: { Authorization: token } }
                );
                setIsEditing(false);
                setEditingId(null);
            } else {
                await axios.post(
                    "http://localhost:5000/api/students/create",
                    form,
                    { headers: { Authorization: token } }
                );
            }

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

    const editStudent = (student) => {
        setForm({
            name: student.name,
            email: student.email,
            course: student.course,
        });
        setEditingId(student._id);
        setIsEditing(true);
    };

    const cancelEdit = () => {
        setForm({ name: "", email: "", course: "" });
        setEditingId(null);
        setIsEditing(false);
    };

    return (
        <div className="layout">
            <Sidebar />

            <div className="content">
                <h2 className="page-title">{isEditing ? "Edit Student" : "Student Registration"}</h2>

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
                            {isEditing ? "Update Student" : "Add Student"}
                        </button>
                        {isEditing && (
                            <button type="button" className="btn-secondary" onClick={cancelEdit}>
                                Cancel
                            </button>
                        )}
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
                                                className="btn-edit"
                                                onClick={() => editStudent(s)}
                                            >
                                                Edit
                                            </button>
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
