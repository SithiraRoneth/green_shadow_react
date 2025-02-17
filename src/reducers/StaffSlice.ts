import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Staff} from "../model/Staff.ts";
import axios from "axios";

const initialState:Staff[] = []

const api = axios.create({
    baseURL: "http://localhost:3000",
})

export const saveStaffs = createAsyncThunk(
    'staff/saveStaff',
    async (staff:Staff)=>{
        const data = {
            ...staff
        };
        const response = await api.post('/staff/addStaff',data);
        return response.data;
    }
);
export const  getAllStaffs = createAsyncThunk(
    'staff/getAlls',
    async ()=>{
        const response = await api.get('/staff/getAllStaff');
        return response.data;
    }
)
export const updateStaff = createAsyncThunk(
    'staff/updateStaff',
    async (staff: Staff) => {
        const response = await api.put(`/staff/updateStaff/${staff.email}`, staff);
        return response.data;
    }
);

export const deleteStaff = createAsyncThunk(
    'staff/deleteStaff',
    async (email: string) => {
        await api.delete(`/staff/deleteStaff/${email}`);
        return email;
    }
);
const StaffSlice = createSlice({
    name : 'staffs',
    initialState : initialState,
    reducers : {
        // addStaff : (state, action) => {
        //     console.log("Data fetch")
        //     state.push(action.payload);
        // },
        // updateStaff : (state, action) => {
        //     const index = state.findIndex(staff => staff.staffId === action.payload.staffId);
        //     if (index !== -1){
        //         state[index] ={
        //             ...state[index],
        //             ...action.payload,
        //         };
        //     }
        // },
        // deleteStaff : (state, action) => {
        //     return state.filter(staff => staff.staffId !== action.payload.staffId);
        // }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(saveStaffs.fulfilled,(state, action)=>{
                state.push(action.payload);
                console.log("Staff Saved");
            })
            .addCase(saveStaffs.rejected,(state, action)=>{
                console.log("Staff saving rejected : ", action.payload);
            })
            .addCase(saveStaffs.pending,()=>{
                console.log("Staff saving pending");
            })

        builder
            .addCase(getAllStaffs.fulfilled,(state, action)=>{
                return action.payload;
            })
            .addCase(getAllStaffs.rejected,(state, action)=>{
                console.log("Failed to fetch staff : ", action.payload);
            })
            .addCase(getAllStaffs.pending,()=>{
                console.log("Fetching staff pending")
            })
        builder
            .addCase(updateStaff.fulfilled, (state, action) => {
                const index = state.findIndex(staff => staff.email === action.payload.email);
                if (index !== -1) {
                    state[index] = action.payload;
                }
                console.log("Staff Updated");
            })
            .addCase(updateStaff.rejected, (state, action) => {
                console.log("Failed to update staff: ", action.error);
            });

        builder
            .addCase(deleteStaff.fulfilled, (state, action) => {
                return state.filter(staff => staff.email !== action.payload);
            })
            .addCase(deleteStaff.rejected, (state, action) => {
                console.log("Failed to delete staff: ", action.error);
            });
    }
})

export default StaffSlice.reducer