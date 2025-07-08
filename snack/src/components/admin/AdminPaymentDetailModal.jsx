import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { localhost } from '../../api/CommonAPI'

const AdminPaymentDetailModal = ({setPaymentModal}) => {
    const param = useParams()
    const [payment,setPayment]=useState({})
    const closeFn =() =>{
        setPaymentModal(false)
    }
    useEffect(()=>{
        const paymentDetailFn = async () =>{
            // const productId = param.param.id
                try{
                    const res = await axios.get(`http://${localhost}:3001/payments/${param.id}`)
                    console.log(res.data, 'data')
                     setPayment(res.data)   
                     console.log(res.data)             
                }catch (err) {
                    alert(err)
                  }
            }
            paymentDetailFn()
    },[])

  return (
    <>
    <div className="admin-payment-cartlist">
        <div className="admin-payment-cartlist-con">
        <span className='close' onClick={closeFn}>x</span>
            <h1>주문상품 내역</h1>
            <div className="admin-cartlist-title">
                <ul>
                    <li>번호</li>
                    <li>이미지</li>
                    <li>제목</li>
                    <li>가격</li>
                    <li>갯수</li>
                </ul>
            </div>
            <div className="admin-cartlist-list">
            {payment.paymentResult
             &&
                payment.paymentResult.map((el, index) => {
                    return(
                <ul>
                <li>{el.id}</li>
                <li><img src={el.img} alt={el.img} /></li>
                <li>{el.title}</li>
                <li>{el.price}</li>
                <li>{el.count}</li>
                </ul>
                )
                })}
                
            </div>
        </div>
    </div>
    
    
    
    
    </>
  )
}

export default AdminPaymentDetailModal