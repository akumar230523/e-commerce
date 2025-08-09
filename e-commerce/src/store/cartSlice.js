import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartitems: [],
    },
    reducers: {
        addProduct(state, action) {
            const existingItem = state.cartitems.find(item => item.product.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } 
            else {
                state.cartitems.push({ id: Date.now(), product: action.payload, quantity: 1 });
            }
        },
        removeProduct(state, action) {
            state.cartitems = state.cartitems.filter(item => item.id !== action.payload);
        },
        increaseQuantity(state, action) {
            const item = state.cartitems.find(item => item.id === action.payload);
            if (item) item.quantity += 1;
        },
        decreaseQuantity(state, action) {
            const item = state.cartitems.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } 
            else {
                state.cartitems = state.cartitems.filter(item => item.id !== action.payload);
            }
        },
    },
});

export const { addProduct, removeProduct, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;

