import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {CircleX, Plus, Save, Trash} from "lucide-react";
import {deleteFiled, getAllField, saveFiled, updateField} from "../reducers/FieldSlice.ts";
import '../Styles/Input&labels.css'
import FieldCard from "../components/Field/FieldCard.tsx";
import Swal from "sweetalert2";

export default function Fields() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const fields = useSelector((state) => state.fields || []);
    const [formData, setFormData] = useState({
        fieldCode: '',
        fieldName: '',
        image: null,
        fieldLocation: ''
    })

    useEffect(() => {
        dispatch(getAllField());
    }, [dispatch]);

    const openModal = () => {
        setFormData({
            fieldCode: '',
            fieldName: '',
            image: null,
            fieldLocation: ''
        });

        setIsUpdateMode(false);
        setIsModalOpen(true);
    }
    const openUpdateModal = (field) => {
        setFormData({
            fieldCode: field.fieldCode,
            fieldName: field.fieldName,
            image: null,
            fieldLocation: field.fieldLocation,
        });
        setSelectedField(field);
        setIsUpdateMode(true);
        setIsModalOpen(true);
    }
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedField(null);
    }
    const handleChange = (e) => {
        const {name, value, files} = e.target;
        if (name === "image") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                image: files[0],
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    };

    const saveField = () => {
        if (formData.fieldCode && formData.fieldName && formData.fieldLocation) {
            const fieldData = new FormData();

            fieldData.append("fieldCode", formData.fieldCode);
            fieldData.append("fieldName", formData.fieldName);
            fieldData.append("fieldLocation", formData.fieldLocation);

            if (formData.image){
                fieldData.append("image", formData.image);
            }
            console.log("Sending fieldData:", Object.fromEntries(fieldData.entries()));

            if (isUpdateMode) {
                dispatch(updateField(fieldData));
                Swal.fire({
                    title: "Field Updated!",
                    text: "Your field details have been successfully updated.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }else {
                dispatch(saveFiled(fieldData));
                Swal.fire({
                    title: "Field Saved!",
                    text: "Your field details have been successfully saved.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
            dispatch(getAllField());
            closeModal();
        }else {
            Swal.fire({
                title: "Please fill in all fields",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
    };

    const handelDelete = (fieldCode) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Deleting Field:", fieldCode);
                if (fieldCode) {
                    dispatch(deleteFiled(fieldCode));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your field details have been successfully updated.",
                        icon: "success",
                        confirmButtonText: "OK",
                    });
                } else {
                    Swal.fire({
                        title: "Delete Failed, try again!",
                        icon: "error",
                        confirmButtonText: "OK",
                    });
                }
            }
        });
    }
    return (
        <>
            {/* Page Header */}
            <div className="flex items-center justify-center mt-[1%]">
                <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl opacity-20 uppercase">Field
                    Management</h1>
            </div>

            {/* Add Field Button */}
            <div className="flex items-center justify-center mt-[2%]">
                <button
                    className="bg-gray-400 text-2xl text-white p-4 rounded-full hover:bg-green-800"
                    onClick={openModal}
                >
                    <Plus size={20} color="white"/>
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-11/12 sm:w-96 md:w-96 lg:w-1/2 xl:w-1/3">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center justify-center">
                            {isUpdateMode ? "Update Field" : "Add Field"}
                        </h2>

                        {/* Modal content */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="fieldCode" className="custom-label">Field Code</label>
                                <input
                                    id="fieldCode"
                                    name="fieldCode"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Field Code"
                                    value={formData.fieldCode}
                                    onChange={handleChange}
                                    disabled={isUpdateMode}
                                />
                            </div>

                            <div>
                                <label htmlFor="fieldName" className="custom-label">Field Name</label>
                                <input
                                    id="fieldName"
                                    name="fieldName"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Field Name"
                                    value={formData.fieldName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="image" className="custom-label">Field Image</label>
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    className="custom-input"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="fieldLocation" className="custom-label">Field Location</label>
                                <input
                                    id="fieldLocation"
                                    name="fieldLocation"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Scientific Name"
                                    value={formData.fieldLocation}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        {/* Modal Actions */}
                        <div className="mt-6 flex justify-end space-x-2">
                            <button
                                className=" text-black px-4 py-2 rounded"
                                onClick={closeModal}
                            >
                                <CircleX/>
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={saveField}
                            >
                                <Save/>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Field Cards */}
            <div
                className="mt-20 px-4 sm:px-8 md:px-12 lg:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  h-[400px] overflow-y-auto">
                {fields.map((field, index) => (
                    <FieldCard
                        key={field.fieldCode}
                        index={index}
                        field={field}
                        onUpdate={openUpdateModal}
                        onDelete={handelDelete}
                    />
                ))}
            </div>
        </>
    )
}
