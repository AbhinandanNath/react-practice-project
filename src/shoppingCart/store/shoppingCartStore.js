import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    items: [],
    totalAmount: 0,
    totalItems: 0,
  },
  reducers: {
    addToCart: (state, actions) => {
      const newItem = actions.payload;
      const existingIndex = state.items.findIndex((item) => item.id === newItem.id);

      if (existingIndex !== -1) {
        state.items[existingIndex].quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      state.totalAmount += newItem.price * newItem.quantity;
      state.totalItems += newItem.quantity;
    },

    updateQuantity: (state, actions) => {
      const { id, quantity } = actions.payload;
      const existingIndex = state.items.findIndex((item) => item.id === id);

      if (existingIndex !== -1) {
        const product = state.items[existingIndex];
        const newQuantity = product.quantity + quantity;

        if (newQuantity <= 0) {
          // Remove item if quantity is zero or less
          state.totalAmount -= product.price * product.quantity;
          state.totalItems -= product.quantity;
          state.items.splice(existingIndex, 1);
        } else {
          // Update quantity and totals
          state.totalAmount += product.price * quantity;
          state.totalItems += quantity;
          product.quantity = newQuantity;
        }
      }
    },
  },
});

const uiSlice = createSlice({
  name: "uiSlice",
  initialState: { isCartOpen: false, isEditMode: false },
  reducers: {
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const shoopingCartStore = configureStore({
  reducer: {
    cartState: cartSlice.reducer,
    uiState: uiSlice.reducer,
  },
});

export const cartActions = cartSlice.actions;
export const uiActions = uiSlice.actions;
