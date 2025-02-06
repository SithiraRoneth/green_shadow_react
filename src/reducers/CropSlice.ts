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
    'crop',
    async (crop:Crop)=>{
        try{
            const data = {
                ...crop,
            };
            const response = await api.put('/crop/updateCrop',data);
            return response.data;
        }catch (error){
            console.log(error);
        }
    }
)
const CropSlice = createSlice({
    name:'crops',
    initialState:initialState,
    reducers: {
        //     addCrop: (state, action) => {
        //         console.log("Data fetch")
        //         state.push(action.payload);
        //     },
        //     updateCrop: (state, action) => {
        //         const index = state.findIndex(crop => crop.cropCode === action.payload.cropCode);
        //         if (index !== -1){
        //             state[index] ={
        //                 ...state[index],
        //                 ...action.payload,
        //             };
        //         }
        //     },
        //     deleteCrop: (state, action) => {
        //         return state.filter(crop => crop.cropCode !== action.payload.cropCode);
        //     }
        // },
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
                state.push(action.payload);
                console.log("Crop Updated");
            })
            .addCase(updateCrop.rejected,(state,action)=>{
                console.log("Failed to update Crop : ", action.payload);
            })
            .addCase(updateCrop.pending,()=>{
                console.log("Crop Updating pending");
            })
    }
})

// export const {addCrop, updateCrop, deleteCrop} = CropSlice.actions;
export default CropSlice.reducer;