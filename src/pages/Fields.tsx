import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Plus, Trash} from "lucide-react";
import {addField, deleteField, updateField} from "../reducers/FieldSlice.ts";

export default function Fields(){
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedField, setSelectedField] = useState(null); // To sto
    const [isUpdateMode, setIsUpdateMode] = useState(false);
    const fields = useSelector((state) => state.fields);
    const [formData, setFormData] = useState({
        fieldCode : '',
        fieldName : '',
        fieldImage : '',
        fieldLocation : ''
    })

    const openModal = () =>{
        setFormData({
            fieldCode : '',
            fieldName : '',
            fieldImage : '',
            fieldLocation : ''
        });

        setIsUpdateMode(false);
        setIsModalOpen(true);
    }
    const openUpdateModal = (field) =>{
        setFormData(field);
        setSelectedField(field);
        setIsUpdateMode(true);
        setIsModalOpen(true);
    }
    const closeModal =() =>{
        setIsModalOpen(false);
        setSelectedField(null);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const saveField = () =>{
        if(formData.fieldCode && formData.fieldName && formData.fieldImage && formData.fieldLocation){
            if (isUpdateMode) {
                dispatch(updateField({ ...formData }));
            }else {
                dispatch(addField({ ...formData }));
            }
            console.log("Data save/updated", formData)
            closeModal();
        }else {
            alert("Please fill in all fields");
        }
    };

    const handelDelete =() =>{
        if (formData.fieldCode){
            dispatch(deleteField({fieldCode: formData.fieldCode}));
        }else{
            alert("Delete Failed, try again !");
        }
    }
    return(
        <div>
            {/* Page Header */}
            <div className="flex items-center justify-center mt-[1%]">
                <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl opacity-20 uppercase">Field Management</h1>
            </div>

            {/* Add Field Button */}
            <div className="flex items-center justify-center mt-[2%]">
                <button
                    className="bg-gray-400 text-2xl text-white p-4 rounded-full hover:bg-green-800"
                    onClick={openModal}
                >
                    <Plus size={20} color="white" />
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
                                <label htmlFor="fieldCode" className="block text-sm font-medium">Field Code</label>
                                <input
                                    id="fieldCode"
                                    name="fieldCode"
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter Field Code"
                                    value={formData.fieldCode}
                                    onChange={handleChange}
                                    disabled={isUpdateMode} // Prevent editing cropCode during update
                                />
                            </div>

                            <div>
                                <label htmlFor="fieldName" className="block text-sm font-medium">Field Name</label>
                                <input
                                    id="fieldName"
                                    name="fieldName"
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter Field Name"
                                    value={formData.fieldName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="cropImage" className="block text-sm font-medium">Field Image</label>
                                <input
                                    id="fieldImage"
                                    name="fieldImage"
                                    type="file"
                                    className="w-full p-2 border rounded"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="fieldLocation" className="block text-sm font-medium">Field Location</label>
                                <input
                                    id="fieldLocation"
                                    name="fieldLocation"
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter Scientific Name"
                                    value={formData.fieldLocation}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        {/* Modal Actions */}
                        <div className="mt-6 flex justify-end space-x-2">
                            <button
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={saveField}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Crop Cards */}
            <div className="mt-20 px-4 sm:px-8 md:px-12 lg:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {fields.map((field) => (
                    <div
                        key={field.fieldCode}
                        className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => openUpdateModal(field)}
                    >
                        <img
                            src={field.fieldImage} // Use the file path or URL directly
                            className="card-img-top"
                            alt={field.fieldName}
                            loading="lazy"
                        />
                        <h3 className="text-lg font-bold">{field.fieldName}</h3>
                        <p className="mt-2"><strong>Field Code:</strong>:{field.fieldCode}</p>
                        <p className="mt-2"><strong>Field Location:</strong>:{field.fieldLocation}</p>
                        <br/>
                        <br/>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handelDelete(field.fieldCode)
                            }}
                            className="p-2 bg-red-700 text-white rounded-md hover:bg-red-800 transition-colors"
                        >
                            <Trash/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
