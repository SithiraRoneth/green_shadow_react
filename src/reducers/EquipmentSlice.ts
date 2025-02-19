import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Equipment} from "../model/Equipment.ts";
import axios from "axios";

const initialState:Equipment[] = []

const api = axios.create({
    baseURL: "http://localhost:3000",
})

export const saveEquipment = createAsyncThunk(
    'equip/saveEquip',
    async (equip:Equipment)=>{
        const data = {
            ...equip
        };
        const response = await api.post('/equip/addEquip', data);
        return response.data;
    }
);

export const updateEquipment = createAsyncThunk(
    'equip/updateEquips',
    async (equip:Equipment)=>{
        const response = await api.put(`/equip/updateEquip/${equip.equipmentCode}`,equip);
        return response.data;
    }
)
export const deleteEquipment = createAsyncThunk(
    'equip/deleteEquip',
    async (equipmentCode:string)=>{
        await api.delete(`/equip/deleteEquip/${equipmentCode}`);
        return equipmentCode;
    }
)

export const getAllEquipments = createAsyncThunk(
    'equip/getAllEquipments',
    async ()=>{
        const response = await api.get('/equip/getEquips');
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
            .addCase(getAllEquipments.fulfilled,(state, action) => {
                return action.payload;
            })
            .addCase(getAllEquipments.rejected, (state, action) => {
                console.log("Failed to fetch Equipment :", action.payload);
            })
            .addCase(getAllEquipments.pending,()=>{
                console.log("Equipment Fetching pending");
            })

        builder
            .addCase(deleteEquipment.fulfilled,(state,action)=>{
                return state.filter(equip => equip.equipmentCode !== action.payload);
            })
            .addCase(deleteEquipment.rejected,(state,action)=>{
                console.log("Failed to delete equipment : ", action.payload);
            })

        builder
            .addCase(updateEquipment.fulfilled, (state, action) => {
                const index = state.findIndex(equip => equip.equipmentCode === action.payload.equipmentCode);
                if (index !== -1) {
                    state[index] = action.payload;
                }
                console.log("Equipment Updated");
            })
            .addCase(updateEquipment.rejected, (state, action) => {
                console.log("Failed to update equipment: ", action.error);
            });
    }
})

export default EquipmentSlice.reducer;