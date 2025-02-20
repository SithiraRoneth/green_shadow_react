import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteVehicle, getAllVehicles, saveVehicles, updateVehicle} from "../reducers/VehicleSlice.ts";
import {CircleX, Save} from "lucide-react";
import VehicleTable from "../components/Vehicle/VehicleTable.tsx";
import Swal from "sweetalert2";
import * as sweetalert2 from "sweetalert2";

export default function Vehicles() {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const vehicles = useSelector((state) => state.vehicles);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        licensePlateNo: "",
        vehicleCategory: "",
        fuelType: "",
        color: ""
    });

    useEffect(() => {
        dispatch(getAllVehicles());
    }, [dispatch]);

    const openModal = () => {
        setFormData({
            licensePlateNo: "",
            vehicleCategory: "",
            fuelType: "",
            color: ""
        });
        setIsUpdate(false);
        setIsModelOpen(true);
    };

    const openUpdateModal = (vehicle) => {
        setFormData(vehicle)
        setSelectedVehicle(vehicle)
        setIsUpdate(true);
        setIsModelOpen(true);
    }
    const closeModal = () => {
        setIsModelOpen(false);
        setSelectedVehicle(null);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    const saveVehicle = () => {
        if (formData.licensePlateNo && formData.vehicleCategory && formData.fuelType && formData.color) {
            if (isUpdate) {
                dispatch(updateVehicle({...formData}));
                Swal.fire({
                    title: "Vehicle Updated!",
                    text: "Your vehicle details have been successfully updated.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                dispatch(saveVehicles({...formData}));
                Swal.fire({
                    title: "Vehicle Saved!",
                    text: "Your vehicle details have been successfully saved.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
            console.log("Data save/updated", formData);
            dispatch(getAllVehicles());
            closeModal();
        } else {
            Swal.fire({
                title: "Please fill in all fields",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
    }

    const handelDelete = (licensePlateNo: string) => {
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
                console.log("Deleting Vehicle:", licensePlateNo);
                if (licensePlateNo) {
                    dispatch(deleteVehicle(licensePlateNo));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your vehicle details have been successfully updated.",
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
            <div className="ml-16 items-center justify-center mt-[3%]">
                <h1 className="font-extrabold text-4xl sm:text-5xl md:text-4xl  lg:text-5xl opacity-20 uppercase">
                    Vehicle Management
                </h1>
            </div>

            <div className="flex items-center justify-between mt-[-3%] mr-12 px-4 sm:px-8 lg:px-16">
                <div></div>
                <button
                    className="group bg-gray-400 w-28 sm:w-32 lg:w-36 text-white py-2 sm:py-3 lg:py-4 rounded-full hover:bg-gradient-to-r from-green-900 via-lime-900 to-slate-50"
                    onClick={openModal}
                >
                    Add new

                </button>
            </div>

            {isModelOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-11/12 sm:w-96 md:w-96 lg:w-1/2 xl:w-1/3">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center justify-center">
                            {isUpdate ? "Update Vehicle" : "Add Vehicle"}
                        </h2>

                        {/* Modal content */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="licensePlateNo" className="custom-label">LicensePlate</label>
                                <input
                                    id="licensePlateNo"
                                    name="licensePlateNo"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter licensePlate"
                                    value={formData.licensePlateNo}
                                    onChange={handleChange}
                                    disabled={isUpdate}
                                />
                            </div>

                            <div>
                                <label htmlFor="vehicleCategory" className="custom-label">Vehicle Category</label>
                                <input
                                    id="vehicleCategory"
                                    name="vehicleCategory"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Vehicle Category"
                                    value={formData.vehicleCategory}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="fuelType" className="custom-label">Fuel Type</label>
                                <input
                                    id="fuelType"
                                    name="fuelType"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Fuel Type"
                                    value={formData.fuelType}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="color" className="custom-label">Vehicle Color</label>
                                <input
                                    id="color"
                                    name="color"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Vehicle Color"
                                    value={formData.color}
                                    onChange={handleChange}
                                />
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
                                    onClick={saveVehicle}
                                >
                                    <Save/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-16 mx-4 sm:mx-8 lg:mx-16">
                <div className="border-b pb-2 grid grid-cols-5 text-gray-500 font-medium text-center">
                    <span>LicensePlate</span>
                    <span>Category</span>
                    <span>Fuel Type</span>
                    <span>Color</span>
                </div>

                <ul className="mt-4 space-y-2">
                    {vehicles.map((vehicle, index) => (
                        <VehicleTable
                            key={vehicle.licensePlateNo}
                            index={index}
                            vehicle={vehicle}
                            onUpdate={openUpdateModal}
                            onDelete={handelDelete}
                        />
                    ))}
                </ul>
            </div>

        </>
    )
}