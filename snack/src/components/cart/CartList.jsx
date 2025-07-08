import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { decreCount, deleteCart, allDeleteCart, increCount } from '../../slice/cartslice'
import DeleteModal from '../modal/DeleteModal'

const CartList = () => {
  const [isDeleteModal,setIsDeleteModal]=useState(false)
  const [deleteItem,setDeleteItem]=useState('')
  const [selId,setSelId]=useState([])
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const cartItems=useSelector(state => state.cart.items)
  let totalPrice=0;
  let totalCount=0;
  cartItems.forEach((item)=>{
    totalPrice += item.price * item.count
    totalCount += item.count
  })
  const payFn=(e)=>{
    navigate('/paymentIndex?type=cart')  
  }
  const selectAll=(e)=>{
    const checkboxes=document.querySelectorAll('.cbox')
    const allCheck=e.target.checked
    if(allCheck){
      checkboxes.forEach((box)=>{
        box.checked=true
      })
    }else{
      checkboxes.forEach((box)=>{
        box.checked=false
      })
    }
  }
  const select=(e)=>{
    const allCheck=document.querySelector('.all')
    const checkboxes=document.querySelectorAll('.cbox')
    const checkedCnt=document.querySelectorAll('.cbox:checked').length
    const totalChk=checkboxes.length
    if(checkedCnt===totalChk){
      allCheck.checked=true;
    }else{
      allCheck.checked=false;
    }
  }
  const deleteSel=(e)=>{
    const checked=document.querySelectorAll('.cbox:checked')
    setDeleteItem('deleteSel')
    setIsDeleteModal(true)
    checked.forEach((ck)=>{
      const num=selId.findIndex((el)=>{
        return el===ck.value;
      })
      if(num===-1){
        selId.push(ck.value)
      }
      // dispatch(deleteCart(ck.value))
      ck.checked=false
    })
  }
  const deleteAllFn=(e)=>{
    setIsDeleteModal(true)
    setDeleteItem('deleteAll')
  }
  const selDeleteFn=(e)=>{
    const value=e.currentTarget.value
    selId.push(value)
    setDeleteItem('deleteSel')
    setIsDeleteModal(true)
  }
  return (
    <>
    {isDeleteModal?<DeleteModal setIsDeleteModal={setIsDeleteModal} deleteItem={deleteItem} selId={selId}/>:<></>}
      <div className="cartIndex">
        {/* <button className='back' onClick={()=>{
          navigate(-1)
        }}>이전페이지</button> */}
        <div className="cart-con">
          <div className="top">
            <h1 className="title">상품 목록</h1>
            <hr />
          </div>
          <div className="list-detail">
          {cartItems.length>0?
          <div className="list-detail-con">
            <input type="checkbox" className='all' name='All' value='All' id='check' onClick={selectAll}/>
            <button className='deleteAll' onClick={deleteAllFn}>장바구니 비우기</button>
          </div>
          :<></>}
          </div>
          <div className="item-list">
            {cartItems && cartItems.map(
              (el,idx)=>{
                return(
                  <div className="cart-items" key={idx}>
                    <div className="item-left">
                      <input type="checkbox" className='cbox' name='cbox' value={el.id} id='check' onClick={select} />
                      <img src={el.img} alt={el.img} />
                    </div>
                    <div className="item-right">
                      <div className="item-detail">
                        <span>{el.type}제목 : {el.title}</span>
                        <span>상품가격 : {el.price}원</span>
                      </div>
                      <div className="item-total">
                          <div className="count-box">
                            <span className='count'>{el.count}</span>
                            <div className="item-count-btn">
                              <button className='plus' onClick={()=>{dispatch(increCount(el.id))}}>+</button>
                              <button className='minus' onClick={()=>{dispatch(decreCount(el.id))}}>-</button>
                            </div>
                          </div>
                        <div className="item-price">
                        <span>총 금액 : {el.count * el.price}원</span>
                        <button className='delete' value={el.id} onClick={selDeleteFn}>✕</button>
                        </div> 
                      </div>                     
                    </div>
                  </div>
                )
              }
            )}
          </div>
                       
          </div>
          {cartItems.length > 0 ?
          <div className="cart-pay">
            <div className="deleteCart">
              <div className="sel-delete">
                <span>선택 상품을</span>
                <button className='sel-delete' onClick={deleteSel}>
                  삭제하기
                </button>
              </div>
              
            </div>
            <div className="cart-pay-con">   
              <ul>
                <li><span>총 {totalCount}개 상품</span></li>
                <li><span>총 금액:{totalPrice}</span></li>
              </ul>
              <button className='paybtn' onClick={payFn}>결제하기</button>
            </div>
          </div> : <></>}
      </div>
    </>
  )
}

export default CartList