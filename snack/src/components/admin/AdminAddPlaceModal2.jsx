import React from 'react'

const AdminAddPlaceModal2 = ({setAddPlacemodal2,contents}) => {
    const confirmFn = (e) => {
        setAddPlacemodal2(false);
        
      }
  return (
    <div className="addplace2">
    <div className="addplace2-con">
        {contents === 'f1' && <span>이름을 입력해주세요</span>}
        {contents === 'f2' && <span>주소를 입력해주세요</span>}
        {contents === 'f3' && <span>카테고리 코드를 입력해주세요</span>}
        {contents === 'f4' && <span>전화번호를 입력해주세요</span>}
        {contents === 'f5' && <span>카테고리 그룹 이름을 입력해주세요</span>}
        {contents === 'f6' && <span>카테고리 이름을 입력해주세요</span>}
        {contents === 'f7' && <span>거리를 입력해주세요</span>}
        {contents === 'f8' && <span>url을 입력해주세요</span>}
        {contents === 'f9' && <span>도로주소를 입력해주세요</span>}
        {contents === 'f10' && <span>x를 입력해주세요</span>}
        {contents === 'f11' && <span>y를 입력해주세요</span>}

        <div className="button">

        <button onClick={confirmFn}>확인</button>
        </div>
    </div>
</div>
  )
}

export default AdminAddPlaceModal2