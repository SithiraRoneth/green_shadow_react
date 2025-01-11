import {createSlice} from "@reduxjs/toolkit";

const initialState = []
const VehicleSlice = createSlice({
    name : 'vehicles',
    initialState : initialState,
    reducers : {
        addVehicle : (state, action) => {
            console.log('Data fetch')
            state.push(action.payload);
        },
        updateVehicle : (state, action) => {
            const index = state.findIndex(vehicle => vehicle.licensePlate === action.payload.licensePlate);
            if(index !== -1) {
                state[index] = {
                    ...state[index],
                    ...action.payload,
                };
            }
        },
        deleteVehicle : (state, action) => {
            return state.filter(vehicle => vehicle.licensePlate !== action.payload.licensePlate);
        }
    }
})

export const {addVehicle,updateVehicle,deleteVehicle} = VehicleSlice.actions;
export default VehicleSlice.reducer;