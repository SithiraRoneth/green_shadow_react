import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteEquipment, saveEquipment} from "../reducers/EquipmentSlice.ts";
import {CircleX, Save} from "lucide-react";
import '../Styles/Input&labels.css'
import EquipmentTable from "../components/Equipment/EquipmentTable.tsx";

export default function Equipment() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedEquip, setSelectedEquip] = useState(null);
    const equips = useSelector((state) => state.equips);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        equipmentCode: '',
        equipmentName: '',
        equipmentStatus: '',
    })
    const openModal = () => {
        setFormData({
            equipmentCode: '',
            equipmentName: '',
            equipmentStatus: '',
        })
        setIsUpdateModalOpen(false);
        setIsModalOpen(true);
    }

    const openUpdateModal = (equip) => {
        setFormData(equip);
        setSelectedEquip(equip);
        setIsUpdateModalOpen(true);
        setIsModalOpen(true);
    }
    const closeUpdateModal = () => {
        setIsModalOpen(false);
        setSelectedEquip(null);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const saveEquip = () => {
        if (formData.equipmentCode && formData.equipmentName && formData.equipmentStatus) {
            if (isUpdateModalOpen) {
                // dispatch(saveEquipment({...formData}));
            } else {
                dispatch(saveEquipment({...formData}));
            }
            console.log("Data save/updated", formData);
            closeUpdateModal()
        } else {
            alert("Please fill in all fields");
        }
    }

    const handleDelete = () => {
        if (formData.equipmentCode) {
            dispatch(deleteEquipment({equipmentCode: formData.equipmentCode}));
        } else {
            alert("Delete Failed, try again !");
        }
    }
    return (
        <>
            <div className="ml-16 items-center justify-center mt-[3%]">
                <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-5xl opacity-20 uppercase">
                    Equipment Management
                </h1>
            </div>

            <div className="flex items-center justify-between mt-[-3%] mr-12 px-4 sm:px-8 lg:px-16">
                <div></div>
                <button
                    className="group bg-gray-400 w-28 sm:w-32 lg:w-36 text-white py-2 sm:py-3 lg:py-4 rounded-full hover:bg-gradient-to-r from-green-900 via-lime-600 to-slate-50 "
                    onClick={openModal}
                >
                    Add new

                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-11/12 sm:w-96 md:w-96 lg:w-1/2 xl:w-1/3">
                        <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center justify-center">
                            {isUpdateModalOpen ? "Update Equipment" : "Add Equipment"}
                        </h2>

                        {/* Modal content */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="equipmentCode" className="custom-label">Equipment Code</label>
                                <input
                                    id="equipmentCode"
                                    name="equipmentCode"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Crop Code"
                                    value={formData.equipmentCode}
                                    onChange={handleChange}
                                    disabled={isUpdateModalOpen}
                                />
                            </div>

                            <div>
                                <label htmlFor="equipmentName" className="custom-label">Equipment Name</label>
                                <input
                                    id="equipmentName"
                                    name="equipmentName"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Crop Name"
                                    value={formData.equipmentName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="equipmentStatus" className="custom-label">Equipment Type</label>
                                <input
                                    id="equipmentStatus"
                                    name="equipmentStatus"
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Equipment Type"
                                    value={formData.equipmentStatus}
                                    onChange={handleChange}
                                />
                            </div>


                            {/* Modal Actions */}
                            <div className="mt-6 flex justify-end space-x-2">
                                <button
                                    className=" text-black px-4 py-2 rounded"
                                    onClick={closeUpdateModal}
                                >
                                    <CircleX/>
                                </button>
                                <button
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                    onClick={saveEquip}
                                >
                                    <Save/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-16 mx-4 sm:mx-8 lg:mx-16 ">
                <div className="border-b pb-2 grid grid-cols-4 text-gray-500 font-medium text-center">
                    <span>Equipment ID</span>
                    <span>Equipment Name</span>
                    <span>Equipment Type</span>
                </div>

                <ul className="mt-4 space-y-2">
                    {equips.map((equip, index) => (
                        <EquipmentTable
                        key = {equip.equipId}
                        index={index}
                        equip={equip}
                        onUpdate={openUpdateModal}
                        onDelete={handleDelete}/>
                    ))}
                </ul>
            </div>


        </>
    )
}