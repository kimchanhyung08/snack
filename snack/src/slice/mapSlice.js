// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import axios from 'axios'

// const initState = {
//   items: []
// }


// const mapSlice = createSlice({
//   name: 'map',
//   initialState: initState,
//   reducers: {

//   },
//   extraReducers: (builder) => {
//     builder.addCase(mapThunk.pending, (state, action) => {
//       state.status = 'pending'
//     })
//     builder.addCase(mapThunk.fulfilled, (state, action) => {
//       state.items = action.payload
//       state.status = 'complete'
//     })
//     builder.addCase(mapThunk.rejected, (state, action) => {
//       state.status = 'fail!'
//     })
//   }

// }
// )
// export const mapThunk = createAsyncThunk('map/mapThunk',
//   async () => {
//     try {
//       const res = await axios.get(`http://${localhost}:3001/orderPlace`)
//       const data = res.data
//       return data
//     } catch (err) {
//       alert(err)
//       return
//     }

//   }
// )

// export const { } = mapSlice.actions
// export default mapSlice