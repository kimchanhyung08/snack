import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { localhost } from '../api/CommonAPI'

const initState={
  items:[]
}


const allItemSlice = createSlice({
  name: 'allItem',
  initialState: initState,
  reducers: {
    addItem: (state,action)=>{
      const num= state.items.findIndex(el=>{
        return el.id ===action.payload.id
      })
      if (num===-1){
        state.items.push(action.payload)
      }else{
        state.items[num].count += action.payload.count
      }
    },
    deleteItem: (state,action)=>{
      const num= state.items.findIndex(el=>{
        return el.id===action.payload
      })
      if(num!==-1){
        state.items.splice(num,1)
      }
    }
  },
  extraReducers: (builder)=>{
      builder.addCase(allItemThunk.fulfilled,(state,action)=>{
        state.items=action.payload
        state.status= 'success'
      })
    }
  }
)
export const allItemThunk=createAsyncThunk('cart/allItemThunk',
  async ()=>{
    const res=await axios.get(`http://${localhost}:3001/allItems`)
    const data=res.data
    return data
  })

export const {addItem,deleteItem} =allItemSlice.actions
export default allItemSlice