import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import orderSlice from './features/order/orderSlice'
import searchSlice from './features/search/searchSlice'

const persistConfig = {
    key: 'persist',
    storage,
    blacklist: ['search']
}

const rootReducer = combineReducers({
    order: orderSlice,
    search: searchSlice
})

const makeConfiguredStore = () =>
    configureStore({
        reducer: rootReducer,
    })

export const makeStore = () => {
    const isServer = typeof window === 'undefined'
    if (isServer) {
        return makeConfiguredStore()
    } else {
        const persistedReducer = persistReducer(persistConfig, rootReducer)
        let store: any = configureStore({
            reducer: persistedReducer,
        })
        store.__persistor = persistStore(store)
        return store
    }
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']