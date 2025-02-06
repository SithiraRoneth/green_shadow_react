import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Equipment} from "../model/Equipment.ts";
import axios from "axios";

const initialState:Equipment[] = []

const api = axios.create({
    baseURL: "http://localhost:3000",
})

export const saveEquipment = createAsyncThunk(
    'equip',
    async (equip:Equipment)=>{
        const data = {
            ...equip
        };
        const response = await api.post('/equip/addEquip', data);
        return response.data;
    }
);

export const deleteEquipment = createAsyncThunk(
    'equip',
    async (equipmentCode:string)=>{
        const response = await api.delete(`/equip/deleteEquip/${equipmentCode}`);
        return response.data;
    }
)
const EquipmentSlice = createSlice({
    name : 'equips',
    initialState : initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveEquipment.fulfilled,(state, action) => {
                state.push(action.payload);
                console.log("Equipment Saved Successfully");
            })
            .addCase(saveEquipment.rejected, (state, action) => {
                console.log("Failed to save Equipment :", action.payload);
            })
            .addCase(saveEquipment.pending,()=>{
                console.log("Equipment Saved pending");
            })
        builder
            .addCase(deleteEquipment.fulfilled,(state,action)=>{
                state.push(action.payload);
                console.log("Equipment Deleted");
            })
            .addCase(deleteEquipment.rejected,(state,action)=>{
                console.log("Failed to delete equipment : ", action.payload);
            })
            .addCase(deleteEquipment.pending,()=>{
                console.log("Equipment Deleted Pending");
            })
    }
})

export default EquipmentSlice.reducer;