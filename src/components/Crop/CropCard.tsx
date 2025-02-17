import {Trash} from "lucide-react";

export default function CropCard({crop,index,onUpdate,onDelete}){
    return (
        <div
            className={`border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer ${index % 2 === 0 ? "bg-gradient-to-r from-lime-600 to-green-50 " : "bg-white"}`}
            onClick={() => onUpdate(crop)}
        >
            <img
                src={crop.image}
                className="card-img-top"
                alt={crop.cropName}
                loading="lazy"
            />
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