import { Auth } from "../model/Auth.ts";
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

// Define initial state as an object (not an array)
const initialState = {
    user: null, // Stores logged-in user data
    error: null, // Stores any login error
};

export const saveAuth = createAsyncThunk(
    'user/saveUser',
    async (user: Auth, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/addUser', {
                userEmail: user.userEmail,
                password: user.password,
                role: user.role,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "User registration failed");
        }
    }
);

export const loginAuth = createAsyncThunk(
    'user/loginAuth',
    async (user: Auth, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/login', {
                userEmail: user.userEmail,
                password: user.password,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
);

const AuthSlice = createSlice({
    name: 'auths',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle user registration
            .addCase(saveAuth.fulfilled, (state, action) => {
                console.log("User saved successfully:", action.payload);
            })
            .addCase(saveAuth.rejected, (state, action) => {
                console.log("User saving rejected:", action.payload);
            })
            .addCase(saveAuth.pending, () => {
                console.log("User saving process pending");
            });

        // Handle user login
        builder
            .addCase(loginAuth.fulfilled, (state, action) => {
                state.user = action.payload; // Store user data
                state.error = null; // Clear errors if login succeeds
                console.log("User logged in successfully");
            })
            .addCase(loginAuth.rejected, (state, action) => {
                state.error = action.payload; // Store error message
                console.log("Login failed:", action.payload);
            });
    }
});

export default AuthSlice.reducer;
