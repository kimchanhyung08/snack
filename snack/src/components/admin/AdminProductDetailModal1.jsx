import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { localhost } from '../../api/CommonAPI'

const AdminProductDetailModal1 = ({setProductModal1}) => {
    const navigate=useNavigate()
    const param=useParams()
    const confirmFn = (e) => {
        setProductModal1(false);
        
      }
      const onDeleteFn = (e) =>{
        const addAxiosFn = async (e) =>{
            axios.delete(`http://${localhost}:3001/allItems/${param.id}`)
            navigate(-1);
        }
        addAxiosFn()
    }
  return (
    <div className="delete-product">
        <div className="delete-product-con">
        <img src="/images/icon/warning-98676_1920.png" alt="icon" />
            <span>삭제된 내용은 복구 하실 수 없습니다.</span>
            <span>삭제 하시겠습니까??</span>
            <div className="button">
            <button onClick={onDeleteFn} >네</button>
            <button onClick={confirmFn}>아니요</button>
            </div>
        </div>
    </div>
  )
}

export default AdminProductDetailModal1