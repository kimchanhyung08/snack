import React, { useEffect, useRef, useState } from 'react'
import CartAlertModal from './CartAlertModal'

const CartModal = ({setIsCartModal,setDramaModal}) => {
  const [isAlertModal,setIsAlertModal]=useState(false)
  const btFn=(e)=>{
    setIsAlertModal(true)
  }
  return (
    <>
    {isAlertModal?<CartAlertModal setIsCartModal={setIsCartModal} setDramaModal={setDramaModal} setIsAlertModal={setIsAlertModal}/>:<></>}
    <div className="cartModal">
      <div className="cartModal-con">
        <span>장바구니에 추가되었습니다.</span>
        <div className="cartBtn">
          <button onClick={btFn}>확인</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default CartModal