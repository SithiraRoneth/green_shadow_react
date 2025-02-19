import {Trash} from "lucide-react";

export default function CropCard({crop,index,onUpdate,onDelete}){
    return (
        <div
            className={`border rounded-lg overflow-y-auto p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer ${index % 2 === 0 ? "bg-gradient-to-r from-lime-600 to-green-50 " : "bg-white"}`}
            onClick={() => onUpdate(crop)}
        >
            {crop.image ? (
                <img
                    src={`data:image/png;base64,${crop.image}`}
                    alt={crop.cropName}
                    className="w-full h-40 object-cover rounded"
                />
            ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    No Image
                </div>
            )}
            <h2 className="text-2xl font-bold">{crop.cropName}</h2>
            <br/>
            <p className="mt-2"><strong>Crop Code:</strong> {crop.cropCode}</p>
            <p className="mt-2"><strong>Scientific Name:</strong> {crop.scientificName}</p>
            <p className="mt-2"><strong>Category:</strong> {crop.category}</p>
            <p className="mt-2"><strong>Season:</strong> {crop.season}</p>
            <br/>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(crop.cropCode);
                }}
                className="p-2 bg-red-700 text-white rounded-full hover:bg-red-800 transition-colors"
            >
                <Trash/>
            </button>
        </div>
    )
}