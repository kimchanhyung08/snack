import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { localhost } from '../../api/CommonAPI'

const AdminProductDetailModal2 = ({update,setProductModal2}) => {
    const param = useParams()
    const navigate=useNavigate()
    const confirmFn = (e) => {
        setProductModal2(false);
        
      }
      const UpdateFn = async () => {
       
        axios.put(`http://${localhost}:3001/allItems/${param.id}`,update); 
         
        navigate(-1)
      };
  return (
    <div className="update-productmo">
    <div className="update-productmo-con">
        <span>수정 하시겠습니까??</span>
        <div className="button">
        <button onClick={UpdateFn} >네</button>
        <button onClick={confirmFn}>아니요</button>
        </div>
    </div>
</div>
  )
}

export default AdminProductDetailModal2