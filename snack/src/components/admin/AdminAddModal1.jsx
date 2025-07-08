import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminAddModal1 = ({setAddmodal1}) => {
    const confirmFn = (e) => {
        setAddmodal1(false);
        
      }
  return (
    <div className="addmodal1">
        <div className="addmodal1-con">
            <span>제목을 변경해주세요</span>
            <div className="button">

            <button onClick={confirmFn}>확인</button>
            </div>
        </div>
    </div>
  )
}

export default AdminAddModal1