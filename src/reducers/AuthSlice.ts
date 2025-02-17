import {Auth} from "../model/Auth.ts";
import axios from "axios";
import {createSlice} from "@reduxjs/toolkit";

const initialState:Auth[] = [];
const api = axios.create({
    baseURL: "http://localhost:3000",
});

const AuthSlice = createSlice({
    name:'auths',
    initialState:initialState,
    reducers:{

    }
});

export default AuthSlice.reducer;