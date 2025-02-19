import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Field} from "../model/Field.ts";
import axios from "axios";

const initialState:Field[] = [];
const api = axios.create({
    baseURL: "http://localhost:3000/",
});

export const saveFiled = createAsyncThunk(
    'field/saveField',
    async (fieldData : FormData)=>{
        try {
            const response = await api.post('/field/addField',fieldData,{
                headers:{
                    "Content-Type": "multipart/form-data",
                }
            });
            return response.data;
        }catch (error){
            console.log("Error:", error);
            throw error;
        }
    }
)
export const updateField = createAsyncThunk(
    'field/updateField',
    async (fieldData)=>{
        try {
            const fieldCode = fieldData.get("fieldCode");
            const response = await api.put(`/field/updateField/${fieldCode}`,fieldData,{
                headers:{
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        }catch (error){
            console.log("Update Field Error:", error);
        }
    }
)
export const deleteFiled = createAsyncThunk(
    'field/deleteField',
    async (fieldCode:string)=>{
        try {
            await api.delete(`/field/deleteField/${fieldCode}`);
            return fieldCode;
        }catch (error){
            console.log("Error:", error);
        }
    }
)
export const getAllField = createAsyncThunk(
    'field/getAllField',
    async ()=>{
        const response = await api.get('/field/getAllField')
        return response.data;
    }
)
const FieldSlice = createSlice({
    name:'fields',
    initialState:initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(saveFiled.fulfilled,(state,action)=>{
                state.push(action.payload);
                console.log("Field save Successfully");
            })
            .addCase(saveFiled.rejected,(state,action)=>{
                console.log("Failed to save field :",action.payload);
            })
            .addCase(saveFiled.pending,()=>{
                console.log("Field saving pending");
            })
        builder
            .addCase(updateField.fulfilled,(state,action)=>{
                const index = state.findIndex(field => field.fieldCode === action.payload.fieldCode);
                if (index !== -1) {
                    state[index] = action.payload;
                }
                console.log("Field Updated");
            })
            .addCase(updateField.rejected,(state,action)=>{
                console.log("Failed to update field :",action.error);
            })
            .addCase(updateField.pending,()=>{
                console.log("Field updating pending");
            })
        builder
            .addCase(deleteFiled.fulfilled,(state,action)=>{
                return state.filter(field => field.fieldCode !== action.payload);
            })
            .addCase(deleteFiled.rejected,(state,action)=>{
                console.log("Failed to delete field :",action.payload);
            })
        builder
            .addCase(getAllField.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getAllField.rejected, (state, action) => {
                console.log("Failed to get fields:", action.payload);
            })
            .addCase(getAllField.pending, () => {
                console.log("Fetching fields...");
            });
    }
})

export default FieldSlice.reducer