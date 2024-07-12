import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: IUser = {
    "access_token": "",
    "user": {
        "email": "",
        "phone": "",
        "fullName": "",
        "role": "",
        "avatar": "",
        "id": "",
    }
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, payload) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.access_token = payload?.payload?.access_token;
            state.user.avatar = payload?.payload?.user?.avatar;
            state.user.email = payload?.payload?.user?.email;
            state.user.phone = payload?.payload?.user?.phone;
            state.user.fullName = payload?.payload?.user?.fullName;
            state.user.id = payload?.payload?.user?.id;
            state.user.role = payload?.payload?.user?.role;
        },
        logout: (state) => {

            state.access_token = "";
            state.user.avatar = "";
            state.user.email = "";
            state.user.phone = "";
            state.user.fullName = "";
            state.user.id = "";
            state.user.role = "";
        }
    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = counterSlice.actions

export default counterSlice.reducer