import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/counter/counterSlice'
import searchSlice from './features/search/searchSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterSlice,
            search: searchSlice,
        },
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']