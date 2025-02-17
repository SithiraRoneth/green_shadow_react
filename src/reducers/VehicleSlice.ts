import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Vehicle} from "../model/Vehicle.ts";
import axios from "axios";

const initialState:Vehicle[] = []

const api = axios.create({
    baseURL: "http://localhost:3000",
});
export const saveVehicles = createAsyncThunk(
    'vehicle/saveVehicle',
    async (vehicle :Vehicle)=>{
        const data = {
            ...vehicle
        };
        const response = await api.post('/vehicle/saveVehicle',data);
        return response.data;
    }
)

const VehicleSlice = createSlice({
    name : 'vehicles',
    initialState : initialState,
    reducers : {

    },
    extraReducers(builder){
        builder
            .addCase(saveVehicles.fulfilled,(state, action)=>{
                state.push(action.payload);
                console.log("Vehicle Saved");
            })
            .addCase(saveVehicles.rejected,(state, action)=>{
                console.log("Error during adding vehicle :",action.payload);
            })
            .addCase(saveVehicles.pending,()=>{
                console.log("Vehicle saving pending");
            })
    }
})

export default VehicleSlice.reducer;