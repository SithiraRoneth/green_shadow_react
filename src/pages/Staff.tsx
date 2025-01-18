import {CircleX, Plus, Save, Trash} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStaff, deleteStaff, updateStaff } from "../reducers/StaffSlice.ts";

export default function Staff() {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [selectedStaffId, setSelectedStaffId] = useState(null);
    const staffs = useSelector((state) => state.staffs);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        staffId: "",
        firstName: "",
        lastName: "",
        jobName:"",
        email: "",
        phone: "",
    });

    const openModal = () => {
        setFormData({
            staffId: "",
            firstName: "",
            lastName: "",
            jobName:"",
            email: "",
            phone: "",
        });
        setIsModelOpen(true);
        setIsUpdateMode(false);
    };
    const openUpdateModal = (staff) =>{
        setFormData(staff);
        setSelectedStaffId(staff);
        setIsUpdateMode(true);
        setIsModelOpen(true);
    }
    const closeUpdateModal = () => {
        setIsModelOpen(false);
        setSelectedStaffId(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const saveStaff = () => {
        if (formData.staffId && formData.firstName && formData.lastName && formData.email && formData.phone) {
            if (isUpdateMode) {
                dispatch(updateStaff({ ...formData }));
            } else {
                dispatch(addStaff({ ...formData }));
            }
            closeUpdateModal();
        } else {
            alert("Please fill in all fields");
        }
    };

    const handelDelete = (staffId) =>{
        dispatch(deleteStaff({staffId}));
    }
    return (
        <>
            <div className="flex items-center justify-center mt-[1%]">
                <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl opacity-20 uppercase">
                    Staff Management
                </h1>
            </div>
            <div className="flex items-center justify-center mt-[2%]">
                <button
                    className="bg-gray-400 text-2xl text-white p-4 rounded-full hover:bg-green-800"
                    onClick={openModal}
                >
                    <Plus size={20} color="white"/>
                </button>
            </div>


            {isModelOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-11/12 sm:w-96 md:w-96 lg:w-1/2 xl:w-1/3">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center justify-center">
                            {isUpdateMode ? "Update Staff" : "Add Staff"}
                        </h2>

                        {/* Modal Content */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="staffId" className="custom-label">Staff Id</label>
                                <input
                                    id="staffId"
                                    name="staffId"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Staff Id"
                                    value={formData.staffId}
                                    onChange={handleChange}
                                    disabled={isUpdateMode}
                                />
                            </div>

                            <div>
                                <label htmlFor="firstName" className="custom-label">First Name</label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="custom-label">Last Name</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="jobName" className="custom-label">Job Name</label>
                                <input
                                    id="jobName"
                                    name="jobName"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Job Name"
                                    value={formData.jobName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="custom-label">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="custom-label">Contact No</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="number"
                                    className="custom-input"
                                    placeholder="Enter Contact No"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Modal Actions */}
                            <div className="mt-6 flex justify-end space-x-2">
                                <button
                                    className="text-black px-4 py-2 rounded"
                                    onClick={closeUpdateModal}
                                >
                                    <CircleX/>
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={saveStaff}
                                >
                                    <Save/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div
                className="mt-20 px-4 sm:px-8 md:px-12 lg:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {staffs.map((staff, index) => (

                    <div
                        key={staff.staffId}
                        className={`border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer ${index % 2 === 0 ? "bg-gradient-to-r from-gray-50 to-green-500" : "bg-white"}`}
                        onClick={() => openUpdateModal(staff)}
                    >

                        <h2 className="text-2xl font-bold">{staff.firstName} {staff.lastName}</h2>
                        <br/>

                        <p className="mt-2"><strong>Email :</strong> {staff.email}</p>
                        <p className="mt-2"><strong>Contact No:</strong> {staff.phone}</p>
                        <br/>

                        <br/>
                        <div className='bg-green-900 text-white  rounded-full'>
                            <p className="mt-2 flex justify-center items-center font-bold uppercase">{staff.jobName}</p>
                        </div>

                    </div>
                ))}
            </div>

        </>
    );
}
