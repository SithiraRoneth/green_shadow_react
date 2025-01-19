export default function StaffCard({staff,onUpdate,index}) {
    return (
        <div
            key={staff.staffId}
            className={`border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer ${index % 2 === 0 ? "bg-gradient-to-r from-gray-50 to-green-500" : "bg-white"}`}
            onClick={() => onUpdate(staff)}
        >

            <h2 className="text-2xl font-bold">{staff.firstName} {staff.lastName}</h2>
            <br/>

            <p className="mt-2"><strong>Email :</strong> {staff.email}</p>
            <p className="mt-2"><strong>Contact No:</strong> {staff.phone}</p>
            <br/>

            <br/>
            <div className='bg-green-900 text-white  rounded-full'>
                <p className="mt-2 flex justify-center items-center font-bold uppercase">{staff.jobName}</p>
            </div>

        </div>
    )
}