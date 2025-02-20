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
        const response = await api.post('/vehicle/addVehicle',data);
        return response.data;
    }
)
export const deleteVehicle = createAsyncThunk(
    'vehicle/deleteVehicle',
    async (licensePlateNo:string)=>{
        await api.delete(`/vehicle/deleteVehicle/${licensePlateNo}`);
        return licensePlateNo;
    }
)
export const getAllVehicles = createAsyncThunk(
    'vehicle/getAllVehicles',
    async ()=>{
        const response = await api.get('/vehicle/getAllVehicle');
        return response.data;
    }
)
export const updateVehicle = createAsyncThunk(
    'vehicle/updateVehicle',
    async (vehicles:Vehicle)=>{
        const response = await api.put(`/vehicle/updateVehicle/${vehicles.licensePlateNo}`,vehicles);
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
        builder
            .addCase(getAllVehicles.fulfilled,(state,action)=>{
                return action.payload;
            })
            .addCase(getAllVehicles.rejected,(state,action)=>{
                console.log("Failed to fetch Vehicle : ",action.payload);
            })
            .addCase(getAllVehicles.pending,()=>{
                console.log("Vehicle Fetching...")
            })
        builder
            .addCase(deleteVehicle.fulfilled,(state,action)=>{
                return state.filter(vehicle =>vehicle.licensePlateNo !== action.payload);
            })
            .addCase(deleteVehicle.rejected,(state,action)=>{
                console.log("Failed to delete vehicle :",action.payload);
            })
        builder
            .addCase(updateVehicle.fulfilled,(state,action)=>{
                const index = state.findIndex(vehicle => vehicle.licensePlateNo === action.payload.licensePlateNo);
                if (index !== -1){
                    state[index] = action.payload;
                }
                console.log("Vehicle Updated");
            })
    }
})

export default VehicleSlice.reducer;