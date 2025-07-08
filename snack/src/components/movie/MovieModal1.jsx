import React from 'react'

const MovieModal1 = ({setMovieModal1}) => {
    
      
    
    
        const confirmFn = (e) => {
            setMovieModal1(false);
           
          }
  return (
    <div className="mainmodal1">
    <div className="mainmodal1-con">
        <span>장바구니 추가 완료</span>
        <div className="button">
        <button onClick={confirmFn}>확인</button>
        </div>
    </div>
</div>
  )
}

export default MovieModal1