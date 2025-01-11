import {createSlice} from "@reduxjs/toolkit";

const initialState = []
const StaffSlice = createSlice({
    name : 'staffs',
    initialState : initialState,
    reducers : {
        addStaff : (state, action) => {
            console.log("Data fetch")
            state.push(action.payload);
        },
        updateStaff : (state, action) => {
            const index = state.findIndex(staff => staff.staffId === action.payload.staffId);
            if (index !== -1){
                state[index] ={
                    ...state[index],
                    ...action.payload,
                };
            }
        },
        deleteStaff : (state, action) => {
            return state.filter(staff => staff.staffId !== action.payload.staffId);
        }
    }
})

export const {addStaff, updateStaff,deleteStaff} = StaffSlice.actions;
export default StaffSlice.reducer