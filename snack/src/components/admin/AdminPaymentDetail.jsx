import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminPaymentDetailModal from './AdminPaymentDetailModal'
import { localhost } from '../../api/CommonAPI'

const AdminPaymentDetail = () => {
    const param=useParams()
    const [paymentModal, setPaymentModal] = useState(false);
    const [payment,setPayment] = useState({})
    const navigate= useNavigate()
    const onPaymentModalFn = () => {
        setPaymentModal(true);
        
        }
    useEffect(()=>{
        const paymentDetailFn = async () =>{
            // const productId = param.param.id
                try{
                    const res = await axios.get(`http://${localhost}:3001/payments/${param.id}`)
                    console.log(res.data, 'data')
                     setPayment(res.data)                
                }catch (err) {
                    alert(err)
                  }
            }
            paymentDetailFn()
    },[])
    const backFn=()=>{
        navigate(-1)
    }

  return (
    <>
    {paymentModal && (
        <AdminPaymentDetailModal  setPaymentModal={setPaymentModal} />
    )}
    <div className="adminPayment-detail">
    <div className="adminPayment-detail-con">  
        <h1> 주문 내역</h1>    
            <li>
              번호: {payment.id} 
            </li>
            <li>
                주문 일자: {payment.time}
            </li>
            <li>
                주문자: {payment.userName}
            </li>
            <li>
                주문자 이메일: {payment.userEmail}
            </li>
            <li>
                주문처: {payment.branchType}
            </li>
            <li>
                주문 방식: {payment.orderType}
            </li>
            <li>
                결제 방식: {payment.paymentMethod}
            </li>
            <li>
                주소: {payment.address}
            </li>
            <li>
                전화번호: {payment.phone}
            </li>
            <li>
                가격: {payment.paymentAmount}
            </li>
            
            
            <li>

            <div className="payment-button">
            <li><button onClick={onPaymentModalFn}>상품 내역</button></li>
            <li><button onClick={backFn}> 뒤로가기</button></li>

           </div>
            </li>

            </div>
       
</div>
</>
  )
}

export default AdminPaymentDetail