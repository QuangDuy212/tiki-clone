import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';


// carts = [
//     {quantity: 1, _id: 'abc,', detail: {_id: 'abc', name: 'def'}},
//     {quantity: 1, _id: '123,', detail: {_id: '123', name: '456'}},
// ]

export interface OrderState {
    carts: ICartRedux[];
}


const initialState: OrderState = {
    carts: [] // cart info
};


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        doAddBookAction: (state, action) => {
            let carts = state.carts;
            const item = action.payload;

            let isExistIndex = carts.findIndex(c => c._id === item._id);
            if (isExistIndex > -1) {
                carts[isExistIndex].quantity = carts[isExistIndex].quantity + item.quantity;
                if (carts[isExistIndex].quantity > carts[isExistIndex].detail.quantity) {
                    carts[isExistIndex].quantity = carts[isExistIndex].detail.quantity;
                }
            } else {
                carts.push(item);
            }
            state.carts = carts;
            message.success("Sản phẩm đã được thêm vào giỏ hàng!")
        },
        doUpdateBookAction: (state, action) => {
            let carts = state.carts;
            const item = action.payload;

            let isExistIndex = carts.findIndex(c => c._id === item._id);
            if (isExistIndex > -1) {
                carts[isExistIndex].quantity = item.quantity;
                if (carts[isExistIndex].quantity > carts[isExistIndex].detail.quantity) {
                    carts[isExistIndex].quantity = carts[isExistIndex].detail.quantity;
                }
            }
            state.carts = carts;
        },
        doDeleteBookAction: (state, action) => {
            if (state.carts.length > 0) {
                state.carts = state.carts.filter(item => item._id !== action.payload._id);
            }
        },
        doResetBookCart: (state) => {
            state.carts = [];
        }
    },
    extraReducers: (builder) => {
    },
});

export const { doAddBookAction, doUpdateBookAction, doDeleteBookAction, doResetBookCart } = orderSlice.actions;

export default orderSlice.reducer;
