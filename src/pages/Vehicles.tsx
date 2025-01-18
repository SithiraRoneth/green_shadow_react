import {useState} from "react";
import {Vehicle} from "../model/Vehicle.ts";
import {useDispatch, useSelector} from "react-redux";
import {addVehicle, deleteVehicle, updateVehicle} from "../reducers/VehicleSlice.ts";
import {CircleMinus, CircleX, Save} from "lucide-react";

export default function Vehicles(){
    const[isModelOpen, setIsModelOpen] = useState(false);
    const[isUpdate, setIsUpdate] = useState(false);
    const[selectedVehicle, setSelectedVehicle] = useState(null);
    const vehicles = useSelector((state) => state.vehicles);
    const dispatch = useDispatch();

    const[formData, setFormData] = useState({
        licensePlate : "",
        vehicleCategory : "",
        fuelType : "",
        vehicleColor : ""
    });

    const openModal = () => {
        setFormData({
            licensePlate : "",
            vehicleCategory : "",
            fuelType : "",
            vehicleColor : ""
        });
        setIsUpdate(false);
        setIsModelOpen(true);;
    };

    const openUpdateModal = (vehicle) => {
        setFormData(vehicle)
        setSelectedVehicle(vehicle)
        setIsUpdate(true);
        setIsModelOpen(true);
    }
    const closeModal = () =>{
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
        if (formData.licensePlate && formData.vehicleCategory && formData.fuelType && formData.vehicleColor){
            if (isUpdate) {
                dispatch(updateVehicle({ ...formData }));
            }else {
                dispatch(addVehicle({ ...formData }));;
            }
            console.log("Data save/updated", formData);
            closeModal();
        }else {
            alert("Please fill in all fields");
        }
    }

    const handelDelete = () =>{
        if (formData.licensePlate){
            dispatch(deleteVehicle({licensePlate: formData.licensePlate}));
        }else {
            alert("Delete Failed, try again !");
        }
    }
    return(
        <>
            <div className="ml-16 items-center justify-center mt-[3%]">
                <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-5xl opacity-20 uppercase">
                    Vehicle Management
                </h1>
            </div>

            <div className="flex items-center justify-between mt-[-3%] mr-12 px-4 sm:px-8 lg:px-16">
                <div></div>
                <button
                    className="group bg-gray-400 w-28 sm:w-32 lg:w-36 text-white py-2 sm:py-3 lg:py-4 rounded-full hover:bg-gradient-to-r from-green-900 via-lime-900 to-slate-50 "
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
                                <label htmlFor="licensePlate" className="custom-label">LicensePlate</label>
                                <input
                                    id="licensePlate"
                                    name="licensePlate"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter licensePlate"
                                    value={formData.licensePlate}
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
                                <label htmlFor="vehicleColor" className="custom-label">Vehicle Color</label>
                                <input
                                    id="vehicleColor"
                                    name="vehicleColor"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Vehicle Color"
                                    value={formData.vehicleColor}
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
                        <li
                            key={vehicle.licensePlate}
                            className={`grid grid-cols-5 items-center text-center p-2 border rounded-full hover:bg-gray-100 ${
                                index % 2 === 0 ? "bg-gradient-to-r from-zinc-200 to-zinc-400 " : "bg-white"
                            }`}
                            onClick={() => openUpdateModal(vehicle)}
                        >
                            <span>{vehicle.licensePlate}</span>
                            <span>{vehicle.vehicleCategory}</span>
                            <span>{vehicle.fuelType}</span>
                            <span>{vehicle.vehicleColor}</span>

                            <div className="flex justify-center">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handelDelete(vehicle.licensePlate);
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                    title="Delete Vehicle"
                                >
                                    <CircleMinus className="w-5 h-5"/>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    )
}