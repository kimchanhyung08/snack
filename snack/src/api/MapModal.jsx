import React from 'react'

const MapModal = ({setMapModal,modalItem,clickOutModal,modalRef}) => {
  const closeFn=()=>{
    setMapModal(false)
  }
  console.log(modalItem)
  return (
    <>
    <div className="mapModal" ref={modalRef} onClick={(e)=>{clickOutModal(e)}}>
      <div className="mapModal-con">
        <div className="maptitle">
          <div className="none"></div>
          <h2><img src="/images/common/main_logo.png" alt="logo" /></h2>
          <span className="close" onClick={closeFn}>✕</span>
        </div>
        <div className="mapitem">
          <div className="maptop">
            <img src="/images/shopList/CGV중계.png" alt="movie" />
          </div>
          <div className="mapbottom">
            <span>{modalItem.place_name}</span>
            <div className="mapDetail">
              <ul className='mapName'>
                <li>지점명</li>
                <li>상세주소</li>
                <li>연락처</li>
                <li><img src="/images/common/home.png" alt="home" /></li>
              </ul>
              <ul className='nameDetail'>
                <li>{modalItem.place_name}</li>
                <li>{modalItem.address_name}</li>
                <li>{modalItem.phone}</li>
                <li><a href={modalItem.place_url}>홈페이지</a></li>
              </ul>
            </div>
            <div className="none"></div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default MapModal