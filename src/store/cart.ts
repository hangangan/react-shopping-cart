import { createSlice } from '@reduxjs/toolkit'

export interface cmt {
    id?:number,
    title:string,
    uid:string
}

export interface state {
    cartCmts:cmt[]
}

const initialState:state = {
    cartCmts:[]
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCmt: (state,action) => {
      state.cartCmts.push(action.payload)
    },
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const { addCmt } = cartSlice.actions

export default cartSlice.reducer