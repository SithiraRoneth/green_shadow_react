import {CircleX, Plus, Save} from "lucide-react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteCrop, saveCrop, updateCrop,getAllCrops} from "../reducers/CropSlice.ts";
import "../Styles/Input&labels.css";
import CropCard from "../components/Crop/CropCard.tsx";
import Swal from "sweetalert2";

export default function Crops() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState(null);
    const crops = useSelector((state) => state.crops || []);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        cropCode: "",
        cropName: "",
        image: null,
        scientificName: "",
        category: "",
        season: "",
    });

    useEffect(() => {
        dispatch(getAllCrops());
    },[dispatch]);

    const openModal = () => {
        setFormData({
            cropCode: "",
            cropName: "",
            image: null,
            scientificName: "",
            category: "",
            season: "",
        });
        setIsUpdateMode(false);
        setIsModalOpen(true);
    };

    const openUpdateModal = (crop) => {
        console.log("Opening update modal for crop:", crop);
        setFormData({
            cropCode: crop.cropCode,
            cropName: crop.cropName,
            image: null,
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
            });
        }
    };
    const saveData = () => {
        if (formData.cropCode && formData.cropName && formData.scientificName && formData.category && formData.season) {
            const cropData = new FormData();

            cropData.append("cropCode", formData.cropCode);
            cropData.append("cropName", formData.cropName);
            cropData.append("scientificName", formData.scientificName);
            cropData.append("category", formData.category);
            cropData.append("season", formData.season);


            if (formData.image) {
                cropData.append("image", formData.image);
            }

            console.log("Sending cropData:", Object.fromEntries(cropData.entries()));

            if (isUpdateMode) {
                dispatch(updateCrop(cropData));
                Swal.fire({
                    title: "Crop Updated!",
                    text: "Your crop details have been successfully updated.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                dispatch(saveCrop(cropData));
                Swal.fire({
                    title: "Crop Saved!",
                    text: "Your crop details have been successfully saved.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
            dispatch(getAllCrops());
            closeModal();
        } else {
            Swal.fire({
                title: "Please fill in all fields",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
    };


    const handleDelete = (cropCode) => {
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
                console.log("Deleting Crop:", cropCode);
                if (cropCode) {
                    dispatch(deleteCrop(cropCode));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your crop details have been successfully updated.",
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
    };

    return (
        <>
            <div className="flex items-center justify-center mt-[1%]">
                <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl opacity-20 uppercase">Crop
                    Management</h1>
            </div>

            <div className="flex items-center justify-center mt-[2%]">
                <button
                    className="bg-gray-400 text-2xl text-white p-4 rounded-full hover:bg-green-800"
                    onClick={openModal}
                >
                    <Plus size={20} color="white"/>
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
                                <label htmlFor="image" className="custom-label">Crop Image</label>
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
                                <CircleX/>
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={saveData}
                            >
                                <Save/>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div
                className="mt-20 px-4 sm:px-8 md:px-12 lg:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {crops.map((crop, index) => (
                    <CropCard
                        key={crop.cropCode}
                        index={index}
                        crop={crop}
                        onUpdate={openUpdateModal}
                        onDelete={handleDelete}/>
                ))}
            </div>
        </>
    );
}

