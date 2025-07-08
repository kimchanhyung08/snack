import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { localhost } from '../../api/CommonAPI';

const AdminAddModal3 = ({add,setAddmodal3}) => {
    const navigate=useNavigate()
    const confirmFn = (e) => {
        setAddmodal3(false);
        
      }
      const onAddFn = (e) =>{
        const addAxiosFn = async (e) =>{
            const addOk = await axios.post(`http://${localhost}:3001/allItems`,add)
            navigate(-1);
        }
        addAxiosFn()
    }
  return (
    <div className="addmodal3">
        <div className="addmodal3-con">
            <span>추가 하시겠습니까??</span>
            <div className="button">
            <button onClick={onAddFn}>네</button>
            <button onClick={confirmFn}>아니요</button>
            </div>
        </div>
    </div>
  )
}

export default AdminAddModal3