import {createSlice} from "@reduxjs/toolkit";

const initialState = []
const FieldSlice = createSlice({
    name:'fields',
    initialState:initialState,
    reducers:{
        addField:(state,action)=>{
            console.log("Data fetch")
            state.push(action.payload);
        },
        updateField:(state,action)=>{
            const index = state.findIndex(field => field.fieldCode === action.payload.fieldCode);
            if (index !== -1){
                state[index] ={
                    ...state[index],
                    ...action.payload,
                };
            }
        },
        deleteField:(state,action)=>{
            return state.filter(field => field.fieldCode !== action.payload.fieldCode);
        }
    }
})

export const {addField, updateField,deleteField} = FieldSlice.actions;
export default FieldSlice.reducer