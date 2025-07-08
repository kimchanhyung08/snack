import { configureStore } from '@reduxjs/toolkit'
import cartslice from '../slice/cartslice'
import itemSlice from '../slice/itemSlice'
import authSlice from '../slice/authSlice'
import paymentSlice from '../slice/paymentSlice'
import allItemSlice from '../slice/allItemSlice'
import animeSlice from '../slice/animeSlice'
import randomSlice from '../slice/randomSlice'
import userSlice from '../slice/userSlice'

const store = configureStore({
  reducer:{
    payment: paymentSlice.reducer,
    cart: cartslice.reducer,
    item: itemSlice.reducer,
    auth: authSlice.reducer,
    allItem: allItemSlice.reducer,
    anime: animeSlice.reducer,
    random: randomSlice.reducer,
    user: userSlice.reducer
  }
})

export default store