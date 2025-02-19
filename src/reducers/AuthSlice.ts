import {Auth} from "../model/Auth.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState:Auth[] = [];
const api = axios.create({
    baseURL: "http://localhost:3000",
});

export const saveAuth = createAsyncThunk(
    'user/saveUser',
    async (user:Auth)=>{
        const data = {
            userEmail:user.userEmail,
            password:user.password,
            role:user.role,
        }
        const response = await api.post('/auth/addUser',data);
        return response.data;
    }
)
const AuthSlice = createSlice({
    name:'auths',
    initialState:initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(saveAuth.fulfilled,(state, action)=>{
                state.push(action.payload);
                console.log("User saved Successfully");
            })
            .addCase(saveAuth.rejected,(state, action)=>{
                console.log("User saving rejected :", action.payload);
            })
            .addCase(saveAuth.pending,()=>{
                console.log("User saving process pending");
            })
    }
});

export default AuthSlice.reducer;