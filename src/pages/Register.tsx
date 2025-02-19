import {useDispatch} from "react-redux";
import {useState} from "react";
import {saveAuth} from "../reducers/AuthSlice.ts";
import '../Styles/Input&labels.css'

export default function Register(){
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        userEmail: "",
        password: "",
        role:"",
        confirmPassword: "",
    })
    const handleSubmit = (e) => {
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const saveUser = () =>{
        if (formData.userEmail && formData.password && formData.role && formData.confirmPassword){
            dispatch(saveAuth({...formData}));
        }else {
            alert("Please Fill all Fields");
        }
    }
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Left Side - Marketing Section */}
            <div className="flex-1 bg-teal-800 text-white p-10 flex items-center justify-center">
                <div className="max-w-lg space-y-4">
                    <h1 className="text-4xl font-bold leading-snug">
                        You make the Tune. We make it GO.
                    </h1>
                    <p className="text-lg">
                        Securely store your creative work, protect your rights, distribute your music, and collect your
                        royalties worldwide with TuneGO.
                    </p>
                </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="flex-1 bg-white p-10 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="flex justify-between items-center mb-8">
                        <a href="/"
                           className="px-4 py-2 text-sm font-semibold text-teal-800 border border-teal-800 rounded-lg hover:bg-teal-800 hover:text-white transition duration-300">Sign
                            In</a>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Registration</h2>

                    <form className="space-y-4" >
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="userEmail"
                                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-200"
                                placeholder="you@example.com"
                                required
                                value={formData.userEmail}
                                onChange={handleSubmit}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-200"
                                placeholder="Enter 8 characters or more"
                                required
                                value={formData.password}
                                onChange={handleSubmit}
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Repeat password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-200"
                                placeholder="Confirm your password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleSubmit}
                            />
                        </div>
                        <div>
                            <label htmlFor="role" className="custom-label">Role</label>
                            <select
                                id="role"
                                name="role"
                                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-200"
                                value={formData.role}
                                onChange={handleSubmit}
                            >
                                <option value="">Select Role</option>
                                <option value="Manager">Manager</option>
                                <option value="Accountant">Accountant</option>
                                <option value="Hr">HR</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 mt-6 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition duration-300"
                            onClick={saveUser}
                        >
                            Create Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
