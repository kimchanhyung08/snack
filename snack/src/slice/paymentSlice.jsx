import { createSlice } from "@reduxjs/toolkit";

const initstate = {
  items: [],
};

const paymentSlice = createSlice({
  name: "payment",
  initialState: initstate,
  reducers: {
    addPayment: (state, action) => {
      const num = state.items.findIndex((el) => {
        return el.id === action.payload.id;
      });

      if (num === -1) {
        state.items = initstate.items;
        state.items.push(action.payload);
      } else {
        state.items[num].count += action.payload.count;
      }
    },
    defaultPayment: (state, action) => {
      state.items = initstate.items;
    }
  }
}
)

export const { addPayment, defaultPayment } = paymentSlice.actions
export default paymentSlice;
