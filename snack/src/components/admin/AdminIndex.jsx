import React from 'react'
import { Link } from 'react-router-dom'

const AdminIndex = () => {
  return (
    <div className="adminIndex">
      <div className="adminIndex-con">
        <div className="title">
        <h1>관리자 메인</h1>
        </div>
        <div className="category">
          <ul>
            <li><Link to={"/admin/adminmember"}> 멤버 리스트</Link></li>
            <li><Link to={"/admin/admincart"}>장바구니</Link></li>
            <li><Link to={"/admin/adminpayment"}>결제</Link></li>
            <li><Link to={"/admin/product"}>제품 리스트</Link></li>
            <li><Link to={"/admin/addproduct"}>제품 추가</Link></li>
            <li><Link to={"/admin/adminplace"}>주문처</Link></li>
            
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminIndex