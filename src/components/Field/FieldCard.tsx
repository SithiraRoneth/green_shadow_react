import {Trash} from "lucide-react";

export default function FieldCard({field,onUpdate,onDelete,index}) {
    return (
        <div
            className={`border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer ${index % 2 === 1 ? "bg-gradient-to-r from-stone-200 to-stone-500 " : "bg-white"}`}
            onClick={() => onUpdate(field)}
        >
            {field.image ? (
                <img
                    src={`data:image/png;base64,${field.image}`}
                    alt={field.fieldName}
                    className="w-full h-40 object-cover rounded"
                />
            ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    No Image
                </div>
            )}

            <h3 className="text-lg font-bold"> {field.fieldName}</h3>
            <p className="mt-2"><strong>Field Code:</strong> {field.fieldCode}</p>
            <p className="mt-2"><strong>Field Location:</strong> {field.fieldLocation}</p>
            <br/>
            <br/>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(field.fieldCode)
                }}
                className="p-2 bg-red-700 text-white rounded-full hover:bg-red-800 transition-colors"
            >
                <Trash/>
            </button>
        </div>
    )
}