import {createSlice} from "@reduxjs/toolkit";

const initialState = []
const EquipmentSlice = createSlice({
    name : 'equips',
    initialState : initialState,
    reducers: {
        addEquipment: (state, action) => {
            console.log("Data fetch")
            state.push(action.payload);
        },
        updateEquipment: (state, action) => {
            const index = state.findIndex(equipment => equipment.equipId === action.payload.equipId);
            if(index !== -1){
                state[index] = {
                    ...state[index],
                    ...action.payload,
                };
            }
        },
        deleteEquipment: (state, action) => {
            return state.filter(equipment => equipment.equipId !== action.payload.equipId);
        }
    }
})

export const {addEquipment,updateEquipment,deleteEquipment} = EquipmentSlice.actions;
export default EquipmentSlice.reducer;