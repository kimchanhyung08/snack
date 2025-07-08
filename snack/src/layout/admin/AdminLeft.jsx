import React from 'react'
import { Link } from 'react-router-dom'

const AdminLeft = () => {
  return (
    <div className="admin-left">
    <div className="admin-left-con">
      <h1 className="admin-logo">
        <Link to={"/admin"}><img src="/images/common/logo.svg" alt="logo" /></Link>
      </h1>
      <div className="admin-gnb">
        <ul>
          <li>
            <Link to={"/admin/adminmember"}> 멤버</Link>
          </li>
          <li>
            <Link to={"/admin/admincart"}>장바구니</Link>
          </li>
          <li>
            <Link to={"/admin/adminpayment"}>결제</Link>
          </li>
          <li>
            <Link to={"/admin/product"}> 제품 리스트</Link>
          </li>
          <li>
            <Link to={"/admin/addproduct"}>제품 추가</Link>
          </li>
          <li>
            <Link to={"/admin/adminplace"}>주문처</Link>
          </li>
          <li>
            <Link to={"/"}>HOME</Link>
          </li>
        </ul>
      </div>
      <div className="admin-gnb-mini">
        <ul>
          <li>
            <Link to={"/admin/adminmember"}> <img src="/images/icon/user-2517433_1920.png" alt="logo" /> <span> 멤버</span> </Link>
          </li>
          <li>
            <Link to={"/admin/admincart"}> <img src="/images/icon/commerce-2160909_1920.png" alt="logo" /><span> 장바구니</span></Link>
          </li>
          <li>
            <Link to={"/admin/adminpayment"}> <img src="/images/icon/store-2160918_1920.png" alt="logo" /><span> 결제</span></Link>
          </li>
          <li>
            <Link to={"/admin/product"}> <img src="/images/icon/list-2160914_1920.png" alt="logo" /><span> 제품 리스트</span></Link>
          </li>
          <li>
            <Link to={"/admin/addproduct"}> <img src="/images/icon/folder-2517422_1920.png" alt="logo" /><span> 제품 추가</span></Link>
          </li>
          <li>
            <Link to={"/admin/adminplace"}> <img src="/images/icon/map-2133937_1920.png" alt="logo" /><span> 주문처</span></Link>
          </li>
          <li>
            <Link to={"/"}> <img src="/images/icon/home-2160318_1920.png" alt="logo" /><span>HOME</span></Link>
          </li>
          
        </ul>
      </div>

    
        
      
    </div>
  </div>
  )
}

export default AdminLeft