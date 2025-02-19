import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Crop} from "../model/Crop.ts";
import axios from "axios";

const initialState:Crop[] = []
const api = axios.create({
    baseURL: "http://localhost:3000",
});

export const saveCrop = createAsyncThunk(
    "crop/save",
    async (cropData: FormData) => {
        try {
            const response = await api.post("/crop/addCrop", cropData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.log("Error:", error);
            throw error;
        }
    }
);


export const updateCrop = createAsyncThunk(
    'crop/updateCrop',
    async (cropData) => { // Accept FormData directly
        try {
            const cropCode = cropData.get("cropCode"); // Extract cropCode from FormData
            console.log("Updating crop with cropCode:", cropCode); // Debugging

            const response = await api.put(`/crop/updateCrop/${cropCode}`, cropData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.log("Update crop error:", error);
        }
    }
);


export const deleteCrop = createAsyncThunk(
    'crop/deleteCrop',
    async (cropCode: string) => {
        console.log(cropCode)
        try {
            await api.delete(`/crop/deleteCrop/${cropCode}`);
            return cropCode;
        } catch (error) {
            console.log(error);
        }
    }
)
export const getAllCrops = createAsyncThunk(
    'crop/getAllCrops',
    async ()=>{
        const response = await api.get('/crop/viewAllCrop');
        return response.data;
    }
)
const CropSlice = createSlice({
    name:'crops',
    initialState:initialState,
    reducers: {
    },
    extraReducers: (builder)=>{
        builder
            .addCase(saveCrop.fulfilled, (state, action) => {
                state.push(action.payload);
                console.log("Crop Saved Successfully");
            })
            .addCase(saveCrop.rejected, (state, action) => {
                console.log("Failed to save Crop : ", action.payload);
            })
            .addCase(saveCrop.pending, () => {
                console.log("Crop save process pending");
            })
        builder
            .addCase(updateCrop.fulfilled,(state,action)=>{
                const index = state.findIndex(crop => crop.cropCode === action.payload.cropCode);
                if (index !== -1) {
                    state[index] = action.payload;
                }
                console.log("Crop Updated");
            })
            .addCase(updateCrop.rejected,(state,action)=>{
                console.log("Failed to update Crop : ", action.error);
            })
            .addCase(updateCrop.pending,()=>{
                console.log("Crop Updating pending");
            })

        builder
            .addCase(getAllCrops.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(getAllCrops.rejected, (state, action) => {
                console.log("Failed to get crops:", action.payload);
            })
            .addCase(getAllCrops.pending, () => {
                console.log("Fetching crops...");
            });
        builder
            .addCase(deleteCrop.fulfilled,(state,action)=>{
                return state.filter(crop => crop.cropCode !== action.payload);
            })
            .addCase(deleteCrop.rejected,(state,action)=>{
                console.log("Failed to delete crop : ", action.payload);
            })
    }
})

export default CropSlice.reducer;