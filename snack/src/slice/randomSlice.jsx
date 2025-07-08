import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  selectctedItem: null,
};

const randomSlice = createSlice({
  name: "random",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setRandom : (state) => {
      const filterItems = state.items.filter((item) => item.isActive)
      const itemsCount = filterItems.length;
      
      if(filterItems.length > 0 ) {
        const random = Math.floor(Math.random() * itemsCount);
        state.selectctedItem = filterItems[random]
      }else {
        state.selectctedItem = null
      }

      // if (filterItems.map((el,idx)=> {
      //   const random = Math.floor(Math.random() * itemsCount); //랜덤 함수
      //   const randomItem = filterItems[random]; //필터된 데이터를 랜덤으로 돌리는 함수
      //   if(!state.items.includes(randomItem) && state.items.length < 4)
      //   {
      //     state.items.push(randomItem);
      //   }
      // })
    }
  },
});

export const { setItems, setRandom } = randomSlice.actions;
export default randomSlice;
