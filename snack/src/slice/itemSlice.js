import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { localhost } from '../api/CommonAPI'

const initState={
  items:[]
}


const itemSlice = createSlice({
  name: 'item',
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
      const num1= state.items.findIndex(el=>{
        return el.id===action.payload
      })
      if(num1!==-1){
        state.items.splice(num1,1)
      }
    }
  },
  extraReducers: (builder)=>{
      builder.addCase(itemThunk.fulfilled,(state,action)=>{
        state.items=action.payload
        state.status= 'success'
      })
    }
  }
)
export const itemThunk=createAsyncThunk('item/itemThunk',
  async (type)=>{
    const res=await axios.get(`http://${localhost}:3001/allItems?type=${type}`)
    const data=res.data
    return data
  })
export const {addItem,deleteItem} =itemSlice.actions
export default itemSlice