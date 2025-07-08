import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allDeleteCart, deleteCart } from '../../slice/cartslice'

const DeleteModal = ({setIsDeleteModal,deleteItem,selId}) => {
  const cartItems=useSelector(state=>state.cart.items)
  const dispatch=useDispatch()
  useEffect(()=>{
    const contents=document.querySelector('.contents')
    if(deleteItem==='deleteAll'){
      contents.innerText='장바구니를 비우시겠습니까?'
    }else if(deleteItem==='deleteSel'){
      contents.innerText='선택한 상품을 제거하시겠습니까?'
    }
  },[])
  const deleteFn=()=>{
    if(deleteItem==='deleteAll'){
      dispatch(allDeleteCart(cartItems))
    }else if(deleteItem==='deleteSel'){
      selId.forEach((el)=>{
        dispatch(deleteCart(el))
      })
    }
    setIsDeleteModal(false)
  }
  const closeFn=()=>{
    setIsDeleteModal(false)
  }
  return (
  <>
    <div className="deleteModal">
      <div className="deleteModal-con">
        <span className='contents'></span>
        <div className="deleteBtn">
          <button onClick={deleteFn}>예</button>
          <button onClick={closeFn}>아니오</button>
        </div>
      </div>
    </div>
  </>
  )
}

export default DeleteModal