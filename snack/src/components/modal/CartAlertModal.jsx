import React from 'react'
import { useNavigate } from 'react-router-dom'

const CartAlertModal = ({setIsCartModal,setDramaModal,setIsAlertModal}) => {
  const navigate=useNavigate()
  const cartMoveFn=()=>{
    navigate('/cart')
  }
  const backFn=()=>{
    setIsCartModal(false)
    setDramaModal(false)
    setIsAlertModal(false)
  }
  return (
    <>
    <div className="alertModal">
      <div className="alertModal-con">
        <span>장바구니로 이동하시겠습니까?</span>
        <div className="cartMoveBtn">
          <button onClick={cartMoveFn}>예</button>
          <button onClick={backFn}>아니오</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default CartAlertModal