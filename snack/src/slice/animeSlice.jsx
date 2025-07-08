import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import React from 'react'
import { localhost } from '../api/CommonAPI'

const initState = {
  animeData: []
}

const animeSlice = createSlice({
  name: 'anime',
  initialState: initState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(animeDataFn.pending, (state, action) => {
      state.status = 'pending'
    })
    builder.addCase(animeDataFn.fulfilled, (state, action) => {
      state.animeData = action.payload
      state.status = 'complete'
    })
    builder.addCase(animeDataFn.rejected, (state, action) => {
      state.status = 'fail!'
    })
  }
})

export const animeDataFn = createAsyncThunk('anime/animeDataFn',
  async () => {
    try {
      const res = await axios.get(`http://${localhost}:3001/allItems?type=애니메이션`)
      const items = res.data
      return items

    } catch(err) {
      alert(err)
      return
    }
  }

)


export default animeSlice