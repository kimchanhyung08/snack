import { createSlice } from '@reduxjs/toolkit'
import React, { useState } from 'react'

const initState = {
  signInUser: [],
  isSignIn: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initState,
  reducers: {
    signInUserFn: (state, action) => {
      const num = state.signInUser.findIndex(el => {
        return el.userEmail === action.payload.userEmail
      })
      if (num === -1) {
        state.signInUser.push(action.payload)
      }
      state.isSignIn = true
    },
    replaceUserFn: (state, action) => {
      state.signInUser.splice(0,1, action.payload)
    },
    signOutFn: (state, action) => {
      state.signInUser.splice(0,1)
      state.isSignIn = false
    }
  }
})

export const {signInUserFn, signOutFn, replaceUserFn} = authSlice.actions
export default authSlice