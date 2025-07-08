import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom/dist'
import { animeDataFn } from '../../../slice/animeSlice';
import { localhost } from '../../../api/CommonAPI';





const Member = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const signInUser = useSelector(state => state.auth.signInUser)


  ////////////////////////////////////////////////////////////////
  const animeData = useSelector((state) => state.anime.animeData);

  
  const user = useSelector((state) => state.user);

  const [dbRecentData, setDbRecentData] = useState([])

  const [recentItem, setRecentItem] = useState([]);

  const [recentDelete, setRecentDelete] = useState(false);

  const [liKey, setLiKey] = useState("recent")

  const [paymentData, setPaymentData] = useState([])
  const [payDetail, setPayDetail] = useState({})
  ///////////////////////////////////////////////////////////////

  const [isOpen, setIsOpen] = useState(false);
  const leftStyle = document.querySelector(".left");
  const [isPc, setIsPc] = useState(window.innerWidth > 1025 ? true : false);
  const sideBarActive = document.querySelector(".sideBar.active");

  const screenChange = (e) => {
    const matches = e.matches;
    setIsPc(matches);
  };

  const toggleMenuClose = () => {
    setIsOpen(false);
    removeStyle();
  };

  const toggleMenuCloseMain = () => {
    setIsOpen(false);

    const leftStyle = document.querySelector(".left");
    leftStyle.style.display = "block";
  };
  const toggleMenu = () => {
    setIsOpen((isOpen) => !isOpen);
    removeStyle();
  };

  const removeStyle = () => {
    if (leftStyle) {
      if (isOpen === false) {
        leftStyle.style.display = "none";
      }
      else {
        leftStyle.style.display = "block";
      }
    }
  };

  ////////////////////////////////////////////////////////////
  
  useEffect(()=> {
    dispatch(animeDataFn())

    
    

    const axiosRecent = async () => {
  
      try {

        // 결제 정보
        const payRes = await axios.get(`http://${localhost}:3001/payments?userEmail=${signInUser[0].userEmail}`);
        const payResData = payRes.data;
        setPaymentData(payResData);
        // 결제 정보

        // (최근 본) 데이터 처리 
        const res1 = await axios.get(`http://${localhost}:3001/members/${user.recentId}`)

        const DbRecentData1 = res1.data.recent

        // 전역recent 최대 4개 + db recent 최대 5개 = sumArr 최대 9개
        // 전역recent는 5개가 되면 db로 날라가게 해놓았다.
        const sumArr = user.recent.concat(DbRecentData1)

        // 중복제거 // 이 중복처리는 나중에 오는 같은 값을 제거 해줌 
        let uniqueArr = []

        sumArr.forEach(el => {
          if (!uniqueArr.includes(el)) {
            uniqueArr.push(el)
          }
        })

       

        // 5개 넘어가면 최신 5개로 cut
        if (uniqueArr.length >= 5 ) {
          uniqueArr = uniqueArr.slice(0,5)
        }

        // 최신화 된 recent 값 patch 용 데이터로 저장
        const uniqueArrKeep = {
          recent: uniqueArr
        }

        // 최근 본 작품 업데이트
        const updateRecent = await axios.patch(`http://${localhost}:3001/members/${user.recentId}`, uniqueArrKeep)


        // (최근 본) 데이터 처리


        // 데이터 가져오기
        const res = await axios.get(`http://${localhost}:3001/members/${user.recentId}`) 
    
        const dbRecentData = res.data.recent
      
        setRecentItem(dbRecentData)

        
      } catch(err) {
        alert(err)
      }
      
    }
    axiosRecent()
    




   
    
    if (leftStyle) {
      if (isPc === true) {
        leftStyle.style.display = "block"
      } else if (sideBarActive) {
        leftStyle.style.display = "none";
      }
    }

    let pcVer = window.matchMedia("screen and (min-width: 1025px)");
    pcVer.addEventListener("change", screenChange);
    return () => pcVer.removeEventListener("change", screenChange);
    // console.log(paymentData, "-----------pay")
    // console.log(isPc, "데이터")
    
  },[isOpen, isPc])

  console.log(dbRecentData)

  // recent
  // 최신작품 데이터 받기 // 주의 // filter 함수로 인해 순서가 바뀜
  const recentArrUnSort = animeData.filter((el) => recentItem.includes(el.id))

 
  
  // 다시 재배열 (정렬)
  let recentArr = []

  recentItem.forEach(item => {
    recentArrUnSort.forEach(el => {
      if (el.id === item) {
        recentArr.push(el)
      }
    })
  })
  //
  // recent
 



  const onTrashButton = () => {
    if (!recentDelete) {
      setRecentDelete(true);
    } else {
      setRecentDelete(false);
    }
  };

  console.log(signInUser[0], "회원정보 확인")

  return (
    <>
      <div className="member-index">
        <div className="member-index-con">

          <span className= 'span-back' onClick={() => {
            navigate(-1)
          }}>뒤로가기</span>

          {signInUser.length > 0 &&
            <>
              <div className="member-index-left" id='member-mobile'>
                <h3 className="member-title">회원정보</h3>

                <div className="profile-box">
                  <div className="image-box">
                    <img src={`/images/common/profile.png`} alt="image" />
                  </div>
                  <h3>{signInUser[0].userName}님</h3>
                  <span onClick={() => {
                    navigate('/member/update')
                  }}>회원정보수정</span>
                </div>

                <ul className="member-index-buttons">
                  {/* <li>별점</li>
                  <li>리뷰</li>
                  <li>댓글</li> */}
                </ul>
                <div className="storage" onClick={() => {
                  setLiKey("recent")
                }}>
                  <img src={`/images/common/storage.svg`} alt="storage" />
                  보관함
                </div>
                
              </div>
              <div className="member-index-right">
                <h3>보관함</h3>
                <div className="member-nav">
                  <ul>
                    <li onClick={() => {
                      setLiKey("recent")
                    }}>최근본</li>
                    
                    <li onClick={() => {
                      setLiKey("payment")
                    }}>구매한</li>
                    

                    <li onClick={onTrashButton}>
                      <div className="trash-icon">
                        <img src={`images/common/trash.svg`} alt="image" />
                      </div>
                      <span>삭제</span>
                      
                    </li>
                  </ul>
                
                  
                </div>
                <hr />
                <div className="member-index-right-con">
                  <div className="right-bar">
                    {!recentDelete ?
                    <span>작품 ({recentArr.length})</span> :
                    <span>선택 (0)</span>
                    }

                  </div>
                  { (recentArr.length > 0 && liKey === "recent" ) &&
                  <ul>
                  {recentArr.map((el, idx) => {
                    return (
                      <li key={idx}>
                        <div className="image-box">
                          <div className="member-top">
                            <img src={`/images/itemData/${el.img}`} alt='image'></img>
                          </div>
                          <div className="member-bottom">
                            <span>{el.title}</span>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                  </ul>
                  }

                  { (liKey === "payment" && paymentData ) &&
                  <ul>
                  {paymentData.map((el, idx) => {
                    return (
                      <li onClick={(e) => {
                        const tag = e.currentTarget.children[0].children[1].innerText
                        const item = paymentData.filter(el => el.paymentResult[0].title === tag)[0]

                        setPayDetail({
                          ...item
                        })

                        setLiKey(`paymentDetail`)
                      }} key={idx}>
                        <div className="image-box">
                          <div className="member-top">
                            <img src={el.paymentResult[0].img} alt='pay-image'></img>
                          </div>
                          <div className="member-bottom">
                            {el.paymentResult[0].title}
                          </div>
                        </div>
                      </li>
                    )

                  })}
                  </ul>
                  }

                  { (liKey === "paymentDetail" && paymentData ) && 
                    <div className="payment-detail">
                        {payDetail && 
                        <>
                        <div className="payDetail-left">
                          <h2>상품명: {payDetail.paymentResult[0].title}</h2>                     
                          <ul>
                            <li>주문처: {payDetail.branchType}</li>
                            <li>결제방식: {payDetail.paymentMethod}</li>
                            <li>주문방식: {payDetail.orderType}</li>
                            <li>가격: {payDetail.paymentResult[0].price}원</li>
                            <li>개수: {payDetail.paymentResult[0].count}</li>
                            <li>총액: {payDetail.paymentAmount}원</li>
                            <li>결제 시간: {payDetail.time}</li>
                          </ul>
                        </div>
                        <div className="payDetail-right">
                          <div className="payDetail-image">
                            <img src={payDetail.paymentResult[0].img} alt="payDetail-image" /> 
                          </div>
                        </div>
                        </>
                        }
                    </div>
                    }

                </div>
              </div>
            </>
          }
              
        </div>
      </div>
    </>
  )
}

export default Member