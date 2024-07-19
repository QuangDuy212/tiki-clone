import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SearchState {
    query: string;
}

const initialState: SearchState = {
    query: ""
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        doUpdateQuery: (state, action) => {
            state.query = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { doUpdateQuery } = searchSlice.actions

export default searchSlice.reducer