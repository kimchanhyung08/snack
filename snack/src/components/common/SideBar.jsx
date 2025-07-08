import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOutFn } from "../../slice/authSlice";
import axios from "axios";
import { defaultPayment } from "../../slice/paymentSlice";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSignIn = useSelector((state) => state.auth.isSignIn);
  const signInUser = useSelector((state) => state.auth.signInUser);
  const isCart = useSelector((state) => state.cart.items);
  const [isPaymentList, setIsPaymentList] = useState([]);
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

  useEffect(() => {
    if (signInUser.length > 0) {
      const AxiosFn = async (e) => {
        try {
          const res = await axios.get(
            `http://192.168.23.215:3001/payments?userEmail=${signInUser[0].userEmail}`
          );
          const resData = res.data;
          setIsPaymentList(resData);
        } catch (err) {
          alert(err);
        }
      };
      AxiosFn();
    }

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
  }, [dispatch, signInUser, isPaymentList, isPc]);

  return (
    <>
      <div className={`sideBar ${isOpen ? "active" : ""}`}>
        <div className={"sideBar-con"}>
          <div className="gnb">
            <h1 className="logo">
              <Link to={"/"}>
                <img
                  src="/images/common/main_logo.png"
                  alt="logo"
                  onClick={() => toggleMenuCloseMain()}
                />
              </Link>
            </h1>
            <h1 className="logo-mini">
              <Link to={"/"}>
                <img
                  src="/images/common/logo.png"
                  alt="logo"
                  onClick={() => toggleMenuCloseMain()}
                />
              </Link>
            </h1>
            <div
              className="sideBarToggle"
              onClick={() => {
                toggleMenu();
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="gnb_nav">
            <ul className={isOpen ? "showMenu" : "hideMenu"}>
              {isSignIn && isPaymentList.length > 0 && (
                <li>
                  <Link to={"/payment"} onClick={() => toggleMenuClose()}>
                    결제내역
                  </Link>
                </li>
              )}
              <li>
                <Link to={"/kakaopage"} onClick={() => toggleMenuClose()}>
                  지점
                </Link>
              </li>
              {isCart.length > 0 && (
                <li>
                  <Link to={"/cart"} onClick={() => toggleMenuClose()}>
                    {" "}
                    장바구니
                  </Link>
                </li>
              )}
              <li>
                {isSignIn ? (
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      alert("로그아웃 되었습니다. ");
                      dispatch(signOutFn());
                      dispatch(defaultPayment());
                      toggleMenuClose();
                      navigate("/");
                    }}
                  >
                    로그아웃
                  </Link>
                ) : (
                  <Link to={"/signIn"} onClick={() => toggleMenuClose()}>
                    로그인
                  </Link>
                )}
              </li>
              {!isSignIn && (
                <li>
                  <Link to={"/signUp"} onClick={() => toggleMenuClose()}>
                    회원가입
                  </Link>
                </li>
              )}
              {isSignIn && (
                <li>
                  <Link to={"/member"} onClick={() => toggleMenuClose()}>
                    {signInUser[0].userEmail}님
                  </Link>
                </li>
              )}
              {isSignIn ? (
                signInUser[0].role === "ROLE_ADMIN" ? (
                  <li>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenuClose();
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

export default SideBar;
