import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const MainModal1 = ({setMainModal1}) => {
   
    
      const navigate=useNavigate()
        const navi = (e) =>{
          navigate('/cart')
        }

        const confirmFn = (e) => {
            setMainModal1(false);
           
          }
  return (
    <div  className="mainmodal1">
    <div className="mainmodal1-con">
        <span>장바구니 추가 완료  </span>
        <span>장바구니 페이지로 이동하시겠습니까?</span> 
      
        <div className="button">
        <button onClick={navi}>네</button>
        <button onClick={confirmFn}>아니오</button>
        </div>
    </div>
</div>
  )
}

export default MainModal1