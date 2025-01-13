import {configureStore} from "@reduxjs/toolkit";
import cropReducer from '../reducers/CropSlice.ts'
import fieldReducer from '../reducers/FieldSlice.ts'
import vehicleReducer from '../reducers/VehicleSlice.ts'
import staffReducer from '../reducers/StaffSlice.ts'
import equipSlice from '../reducers/EquipmentSlice.ts'
export const Store = configureStore({
    reducer: {
        crops: cropReducer,
        fields: fieldReducer,
        vehicles: vehicleReducer,
        staffs: staffReducer,
        equips: equipSlice,
    }
})

export default Store;