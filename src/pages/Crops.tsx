import {Plus} from "lucide-react";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { addCrop } from "../reducers/CropSlice.ts";

export default function Crops() {
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
    const crops = useSelector((state) => state.crops)
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        cropCode: "",
        cropName: "",
        cropImage:"",
        scientificName: "",
        category: "",
        season: ""
    });

    // Open modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Save data and dispatch action to Redux
    const saveData = () => {
        if (formData.cropCode && formData.cropName && formData.scientificName && formData.category && formData.season) {
            dispatch(addCrop({ ...formData }));
            console.log("Data saved", formData);
            setFormData({ cropCode: "", cropName: "",cropImage:"", scientificName: "", category: "", season: "" });
            closeModal();
        } else {
            alert("Please fill in all fields");
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center mt-[1%]">
                <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl opacity-20 uppercase">Crop Management</h1>
            </div>

            <div className="flex items-center justify-center mt-[2%]">
                <button
                    className="bg-gray-400 text-2xl text-white p-4 rounded-full hover:bg-green-800"
                    onClick={openModal}
                >
                    <Plus size={20} color="white" />
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-11/12 sm:w-96 md:w-96 lg:w-1/2 xl:w-1/3 ">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center justify-center">Add Crop</h2>

                        {/* Modal content: Labels, inputs, and Save button */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="cropCode" className="block text-sm font-medium">Crop Code</label>
                                <input
                                    id="cropCode"
                                    name="cropCode"
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter Crop Code"
                                    value={formData.cropCode}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="cropName" className="block text-sm font-medium">Crop Name</label>
                                <input
                                    id="cropName"
                                    name="cropName"
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter Crop Name"
                                    value={formData.cropName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="cropImage" className="block text-sm font-medium">Crop Image</label>
                                <input
                                    id="cropImage"
                                    name="cropImage"
                                    type="file"
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter Crop Name"
                                    value={formData.cropImage}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="scientificName" className="block text-sm font-medium">Scientific
                                    Name</label>
                                <input
                                    id="scientificName"
                                    name="scientificName"
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter Scientific Name"
                                    value={formData.scientificName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-sm font-medium">Crop Category</label>
                                <input
                                    id="category"
                                    name="category"
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter Crop Category"
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="season" className="block text-sm font-medium">Crop Season</label>
                                <input
                                    id="season"
                                    name="season"
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter Crop Season"
                                    value={formData.season}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-2">
                            {/* Cancel button */}
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                                onClick={closeModal}
                            >
                                Close
                            </button>

                            {/* Save button */}
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={saveData}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/*<div className='mt-8'>*/}
            {/*    <ul className='mt-4 space-y-2'>*/}
            {/*        {crops.map((crop) => (*/}
            {/*            <li key={crop.cropCode}*/}
            {/*                className="cursor-pointer p-2 border rounded-md hover:bg-gray-100"*/}
            {/*            >*/}
            {/*                {crop.cropName} - {crop.scientificName} - {crop.category} - {crop.season}*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</div>*/}
        </div>
    );
}
