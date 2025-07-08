import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminAddmodal2 = ({setAddmodal2,contents}) => {
    const navigate = useNavigate();

    const confirmFn = (e) => {
        setAddmodal2(false);
        
      }
      
  return (
    <div className="addmodal2">
        <div className="addmodal2-con">
        {contents === 'f1' && <span>제목을 입력해주세요</span>}
        {contents === 'f2' && <span>가격을 입력해주세요</span>}
        {contents === 'f3' && <span>연령대를 입력해주세요</span>}
        {contents === 'f4' && <span>년도를 입력해주세요</span>}
        {contents === 'f5' && <span>장르를 입력해주세요</span>}
        {contents === 'f6' && <span>상영시간을 입력해주세요</span>}
        {contents === 'f7' && <span>내용을 입력해주세요</span>}
        {contents === 'f8' && <span>타입을 입력해주세요</span>}

            <div className="button">

            <button onClick={confirmFn}>확인</button>
            </div>
        </div>
    </div>
  )
}

export default AdminAddmodal2