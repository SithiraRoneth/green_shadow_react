import {CircleMinus} from "lucide-react";

export default function EquipmentTable({equip,onUpdate,onDelete,index}){
    return (
        <li
            className={`grid grid-cols-4 items-center text-center p-2 border rounded-full hover:bg-gray-100 ${index % 2 === 0 ? "bg-gradient-to-r from-slate-500 to-slate-50" : "bg-white"}`}
            onClick={() => onUpdate(equip)}
        >
            <span>{equip.equipmentCode}</span>
            <span>{equip.equipmentName}</span>
            <span>{equip.equipmentType}</span>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(equip.equipmentCode);
                }}
                className="text-red-500 hover:text-red-700 flex justify-center"
                title="Delete Equipment"
            >
                <CircleMinus className="w-5 h-5"/>
            </button>
        </li>
    )
}