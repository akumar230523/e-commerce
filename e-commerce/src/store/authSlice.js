import { createSlice } from '@reduxjs/toolkit';

// Hardcoded credentials
const VALID_USER = {
    username: 'user@example.com',
    password: 'password123',
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
    },
    reducers: {
        login(state, action) {
            const { username, password } = action.payload;
            if (username === VALID_USER.username && password === VALID_USER.password) {
                state.isAuthenticated = true;
                state.user = { username };
            } 
            else {
                throw new Error('Invalid credentials');
            }
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;