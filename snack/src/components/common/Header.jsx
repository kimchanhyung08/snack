import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOutFn } from "../../slice/authSlice";
import { defaultPayment } from "../../slice/paymentSlice";
import AlertModal from "../auth/AlertModal";
import { localhost } from "../../api/CommonAPI";
import axios from "axios";
import { deleteUserFn } from "../../slice/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSignIn = useSelector((state) => state.auth.isSignIn);
  const signInUser = useSelector((state) => state.auth.signInUser);
  const isCart = useSelector((state) => state.cart.items);
  const [isPaymentList, setIsPaymentList] = useState([]);

  //recent
  const user = useSelector((state) => state.user);
  //

  useEffect(() => {
    if (signInUser.length > 0) {
      const AxiosFn = async (e) => {
        try {
          const res = await axios.get(
            `http://${localhost}:3001/payments?userEmail=${signInUser[0].userEmail}`
          );
          const resData = res.data;
          setIsPaymentList(resData);
        } catch (err) {
          alert(err);
        }
      };
      AxiosFn();
    }
  }, [dispatch, signInUser, isPaymentList]);

  const onSignOut = (e) => {
    e.preventDefault();
    handlerFn("logOut"); // 회원정보페이지에서 로그아웃 시 모달창 안뜸
    dispatch(signOutFn());
    dispatch(defaultPayment());
    navigate("/");
  };

  const [isAlertModal, setIsAlertModal] = useState(false);
  const [contents, setContents] = useState("");

  const handlerFn = (contents) => {
    setContents(contents);
    setIsAlertModal(true);
  };

  

  const recentOut = () => {
    

    // 최근 본 목록 최신 데이터로 업데이트 시켜주는 함수
    const getDbRecent = async () => {
      try {
        const res = await axios.get(`http://${localhost}:3001/members/${user.recentId}`)

        const DbRecentData = res.data.recent

        // 전역recent 최대 4개 + db recent 최대 5개 = sumArr 최대 9개
        // 전역recent는 5개가 되면 db로 날라가게 해놓았다.
        const sumArr = user.recent.concat(DbRecentData)

        // 중복제거
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

      } catch(err) {
        alert(err)
      }

    
    }
    getDbRecent()
    // 최근 본 목록 최신 데이터로 업데이트 시켜주는 함수

    dispatch(deleteUserFn());

  };

 

  return (
    <>
      {isAlertModal && (
        <AlertModal contents={contents} setIsAlertModal={setIsAlertModal} />
      )}
      <div className="header">
        <div className="header-con">
          <div className="gnb">
            <h1 className="logo">
              <Link to={"/"}>
                <img src="/images/common/main_logo.png" alt="logo" />
              </Link>
            </h1>
            <ul>
              <li>
                <Link to={"/kakaopage"}>지점</Link>
              </li>
              {isSignIn && isPaymentList.length > 0 && (
                <li>
                  <Link to={"/payment"}>결제내역</Link>
                </li>
              )}

              {isCart.length > 0 && (
                <li>
                  <Link to={"/cart"}>장바구니</Link>
                </li>
              )}
              <li>
                {isSignIn ? (
                  <Link
                    onClick={(event) => {
                      onSignOut(event);
                      recentOut();
                    }}
                  >
                    로그아웃
                  </Link>
                ) : (
                  <Link to={"/signIn"}>로그인</Link>
                )}
              </li>
              {!isSignIn && (
                <li>
                  <Link to={"/signUp"}>회원가입</Link>
                </li>
              )}
              {isSignIn && (
                <li>
                  <Link to={"/member"}>{signInUser[0].userEmail}님</Link>
                </li>
              )}
              {isSignIn ? (
                signInUser[0].role === "ROLE_ADMIN" ? (
                  <li>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/admin/index");
                      }}
                    >
                      관리자 페이지
                    </Link>
                  </li>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
