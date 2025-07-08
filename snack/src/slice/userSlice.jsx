import { createSlice } from '@reduxjs/toolkit'
import React, { act } from 'react'

const initState = {
  recentId: "",
  recent: []

}

const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    // 상품 누르면 state에 그 상품ID를 저장해줌
    addRecentFn: (state, action) => {

      // 중복처리 // 이미 있으면 그 값 찾아서 제거 후 배열의 맨 앞에 다시 추가

      const isIn = state.recent.findIndex(el => el === action.payload)

      if (isIn !== -1) {
        state.recent.splice(isIn, 1)
      }

      state.recent.unshift(action.payload)

      //-----------------------
    },
    deleteUserFn: (state, action) => {
      state.recent = []
      state.recentId = ""
    },
    updateIdFn: (state, action) => {
      state.recentId = action.payload
    },
    resetRecent: (state, action) => {
      state.recent = []
    }

  }
})

export const {addRecentFn, deleteUserFn, updateIdFn, resetRecent} = userSlice.actions
export default userSlice




