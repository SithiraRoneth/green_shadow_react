import {CircleMinus} from "lucide-react";

export default function VehicleTable({vehicle,onUpdate,onDelete,index}){
    return (
        <li
            key={vehicle.licensePlate}
            className={`grid grid-cols-5 items-center text-center p-2 border rounded-full hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-gradient-to-r from-zinc-200 to-zinc-400 " : "bg-white"
            }`}
            onClick={() => onUpdate(vehicle)}
        >
            <span>{vehicle.licensePlate}</span>
            <span>{vehicle.vehicleCategory}</span>
            <span>{vehicle.fuelType}</span>
            <span>{vehicle.vehicleColor}</span>

            <div className="flex justify-center">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(vehicle.licensePlate);
                    }}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Vehicle"
                >
                    <CircleMinus className="w-5 h-5"/>
                </button>
            </div>
        </li>
    )
}