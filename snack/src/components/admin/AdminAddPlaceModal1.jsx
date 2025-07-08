import React from 'react'

const AdminAddPlaceModal1 = ({setAddPlacemodal1}) => {
    const confirmFn = (e) => {
        setAddPlacemodal1(false);
        
      }
  return (
    <div className="addplace1">
        <div className="addplace1-con">
            <span>이름을 변경해주세요</span>
            <div className="button">

            <button onClick={confirmFn}>확인</button>
            </div>
        </div>
    </div>
  )
}

export default AdminAddPlaceModal1