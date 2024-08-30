import { createSlice } from '@reduxjs/toolkit';

// Initial State
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
    },
    reducers: {
        loginAction: (state, action) => {
            state.user = action.payload;
        },
        logoutAction: (state) => {
            state.user = null;
        },
    },
});

// Generate actions
export const { loginAction, logoutAction } = authSlice.actions;

// Generate reducers
const authReducer = authSlice.reducer;
export default authReducer;
