import { CircleX, Plus, Save, Trash } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCrop, deleteCrop, updateCrop } from "../reducers/CropSlice.ts";
import "../Styles/Input&labels.css";

export default function Crops() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const crops = useSelector((state) => state.crops);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        cropCode: "",
        cropName: "",
        cropImageFile: null,
        scientificName: "",
        category: "",
        season: "",
    });

    const openModal = () => {
        setFormData({
            cropCode: "",
            cropName: "",
            cropImageFile: null,
            scientificName: "",
            category: "",
            season: "",
        });
        setIsUpdateMode(false);
        setIsModalOpen(true);
    };

    const openUpdateModal = (crop) => {
        setFormData({
            cropCode: crop.cropCode,
            cropName: crop.cropName,
            cropImageFile: null,
            scientificName: crop.scientificName,
            category: crop.category,
            season: crop.season,
        });
        setSelectedCrop(crop);
        setIsUpdateMode(true);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCrop(null);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "cropImage" && files.length > 0) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                cropImageFile: files[0],
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const saveData = () => {
        if (formData.cropCode && formData.cropName && formData.scientificName && formData.category && formData.season) {
            // Prepare image data
            const reader = new FileReader();
            if (formData.cropImageFile) {
                reader.onloadend = () => {
                    const cropData = {
                        ...formData,
                        cropImage: reader.result,
                    };

                    if (isUpdateMode) {
                        dispatch(updateCrop(cropData));
                    } else {
                        dispatch(addCrop(cropData));
                    }
                    closeModal();
                };
                reader.readAsDataURL(formData.cropImageFile);
            } else {
                if (isUpdateMode) {
                    dispatch(updateCrop(formData));
                } else {
                    dispatch(addCrop(formData));
                }
                closeModal();
            }
        } else {
            alert("Please fill in all fields");
        }
    };

    const handleDelete = (cropCode) => {
        dispatch(deleteCrop({ cropCode }));
    };

    return (
        <>
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
                    <div className="bg-white p-6 rounded-lg w-11/12 sm:w-96 md:w-96 lg:w-1/2 xl:w-1/3">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center justify-center">
                            {isUpdateMode ? "Update Crop" : "Add Crop"}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="cropCode" className="custom-label">Crop Code</label>
                                <input
                                    id="cropCode"
                                    name="cropCode"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Crop Code"
                                    value={formData.cropCode}
                                    onChange={handleChange}
                                    disabled={isUpdateMode}
                                />
                            </div>

                            <div>
                                <label htmlFor="cropName" className="custom-label">Crop Name</label>
                                <input
                                    id="cropName"
                                    name="cropName"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Crop Name"
                                    value={formData.cropName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="cropImage" className="custom-label">Crop Image</label>
                                <input
                                    id="cropImage"
                                    name="cropImage"
                                    type="file"
                                    className="custom-input"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="scientificName" className="custom-label">Scientific Name</label>
                                <input
                                    id="scientificName"
                                    name="scientificName"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Scientific Name"
                                    value={formData.scientificName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="custom-label">Crop Category</label>
                                <input
                                    id="category"
                                    name="category"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Crop Category"
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="season" className="custom-label">Crop Season</label>
                                <input
                                    id="season"
                                    name="season"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Crop Season"
                                    value={formData.season}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-2">
                            <button
                                className="text-black px-4 py-2 rounded"
                                onClick={closeModal}
                            >
                                <CircleX />
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={saveData}
                            >
                                <Save />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-20 px-4 sm:px-8 md:px-12 lg:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {crops.map((crop,index) => (
                    <div
                        key={crop.cropCode}
                        className={`border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer ${index % 2 === 0 ? "bg-gradient-to-r from-lime-600 to-green-50 " : "bg-white"}`}
                        onClick={() => openUpdateModal(crop)}
                    >
                        <img
                            src={crop.cropImage}
                            className="card-img-top"
                            alt={crop.cropName}
                            loading="lazy"
                        />
                        <h2 className="text-2xl font-bold">{crop.cropName}</h2>
                        <br />
                        <p className="mt-2"><strong>Crop Code:</strong> {crop.cropCode}</p>
                        <p className="mt-2"><strong>Scientific Name:</strong> {crop.scientificName}</p>
                        <p className="mt-2"><strong>Category:</strong> {crop.category}</p>
                        <p className="mt-2"><strong>Season:</strong> {crop.season}</p>
                        <br />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(crop.cropCode);
                            }}
                            className="p-2 bg-red-700 text-white rounded-full hover:bg-red-800 transition-colors"
                        >
                            <Trash />
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

