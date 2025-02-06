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
)
const EquipmentSlice = createSlice({
    name : 'equips',
    initialState : initialState,
    reducers: {
        addEquipment: (state, action) => {
            console.log("Data fetch")
            state.push(action.payload);
        },
        updateEquipment: (state, action) => {
            const index = state.findIndex(equipment => equipment.equipmentCode === action.payload.equipId);
            if(index !== -1){
                state[index] = {
                    ...state[index],
                    ...action.payload,
                };
            }
        },
        deleteEquipment: (state, action) => {
            return state.filter(equipment => equipment.equipmentCode !== action.payload.equipId);
        }
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
                console.log("Crop Saved pending");
            })
    }
})

export const {addEquipment,updateEquipment,deleteEquipment} = EquipmentSlice.actions;
export default EquipmentSlice.reducer;