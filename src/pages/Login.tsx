import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"; // Fixed import
import { useNavigate } from "react-router-dom";
import { loginAuth } from "../reducers/AuthSlice.ts";
import paddyImage from '../assets/paddy.jpg'
import Swal from "sweetalert2";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userEmail: "",
        password: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target; // Get the input name and value
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await dispatch(loginAuth(formData)).unwrap();
            console.log("Login successful:", result);
            localStorage.setItem("token", result.accessToken);
            window.location.reload();
            Swal.fire({
                title: "Login Success",
                icon: "success",
                draggable: true
            });
            navigate("/dash/home");
        } catch (error) {
            Swal.fire({
                title: "Credentials Didn't Match",
                icon: "warning",
                draggable: true
            });
            console.log(error)
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Left Side - Marketing Section */}
            <div style={{ backgroundImage: `url(${paddyImage})` }}
                 className="flex-1 bg-cover bg-center text-white p-10 flex items-center justify-center"
            >
                <div className="max-w-lg space-y-4">
                    <h1 className="text-4xl font-bold leading-snug">
                        Welcome Back to GREEN SHADOW
                    </h1>
                    <p className="text-lg">
                        Log in to GreenShadow to oversee your crops, fields, equipment, vehicles, and staff—all in one powerful dashboard
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 bg-white p-10 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="flex justify-between items-center mb-8">
                        <Link to="/register">
                            <span className="px-4 py-2 text-sm font-semibold text-teal-800 border border-teal-800 rounded-lg hover:bg-teal-800 hover:text-white transition duration-300">
                                Create Account
                            </span>
                        </Link>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
                    <p className="text-sm text-gray-600 mb-4">Access your account</p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email address</label>
                            <input
                                type="email"
                                name="userEmail"
                                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-200"
                                placeholder="you@example.com"
                                required
                                value={formData.userEmail}
                                onChange={handleChange} // Bind to handleChange
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-200"
                                placeholder="Your password"
                                required
                                value={formData.password}
                                onChange={handleChange} // Bind to handleChange
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 mt-6 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition duration-300"
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
