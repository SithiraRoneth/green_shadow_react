import {createSlice} from "@reduxjs/toolkit";

const initialState= []
const CropSlice = createSlice({
    name:'crops',
    initialState:initialState,
    reducers:{
        addCrop: (state, action) => {
            console.log("Data fetch")
            state.push(action.payload);
        },
        updateCrop: (state, action) => {
            const index = state.findIndex(crop => crop.cropCode === action.payload.cropCode);
            if (index !== -1){
                state[index] ={
                    ...state[index],
                    ...action.payload,
                };
            }
        },
        deleteCrop: (state, action) => {
            return state.filter(crop => crop.cropCode !== action.payload.cropCode);
        }
    }
})

export const {addCrop, updateCrop, deleteCrop} = CropSlice.actions;
export default CropSlice.reducer;