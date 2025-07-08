import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { localhost } from '../../api/CommonAPI'
const AdminPayment = () => {
    const[paymentList,setPaymentList]=useState([])
    const navigate = useNavigate()
    useEffect(()=>{
        const axiosFn=async()=>{
          try{
            const res = await axios.get(`http://${localhost}:3001/payments`)
          setPaymentList(res.data)
        }catch(err){
          alert(err)
        }
      }
      axiosFn()
    },[])
    const paymentDetailFn = (elId) => {
             
        navigate(`/admin/adminpayment/detail/${elId}`)
        
      }



  return (
    <>
    <div className="admin-payment">
      <div className="admin-payment-con">
        <h1>결재 내역</h1>
        <div className="adpayment">
          <div className="title">
            <span>번호</span>
            <span>시간</span>
            <span>구매자</span>
            <span>이메일</span>
            <span>전화번호</span>
            <span>주문 방식</span>
            <span>보기</span>           
          </div>
          <div className="admin-payment-list">
          <ul>
            {paymentList && paymentList.map((el, idx) => {   
                  // if(el.type === type.type) {
                          return (
                            <li key={idx} >
                              <span>{el.id}</span>
                              <span>{el.time}</span>
                              <span>{el.userName}</span>
                              <span> {el.userEmail}</span>                  
                              <span>{el.phone}</span>
                              <span>{el.orderType}</span>
                              <span onClick={()=>{
                                paymentDetailFn(el.id)
                              }} ><li>보기</li></span>
                            </li>
                          )
})}
          </ul>
          </div>
        </div>
      </div>
    </div>
  
    </>
  )
}

export default AdminPayment