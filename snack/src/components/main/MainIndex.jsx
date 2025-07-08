import React from 'react'
import SubMain from './sub/SubMain'
import SubMovie from './sub/SubMovie'
import SubDrama from './sub/SubDrama'
import SubAnime from './sub/SubAnime'
import SubWebtoon from './sub/SubWebtoon'




const MainIndex = () => {
  return (
   <>
    <div className="main3">
        <div className="main3-con">
          <SubMain/>
          <SubMovie/>
          <SubDrama/>
          <SubAnime/>
          <SubWebtoon/>
        </div>
    </div>
   
   </>
  )
}

export default MainIndex