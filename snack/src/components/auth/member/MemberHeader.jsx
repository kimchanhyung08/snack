import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOutFn } from "../../../slice/authSlice";
import axios from "axios";
import { localhost } from "../../../api/CommonAPI";

const MemberHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSignIn = useSelector((state) => state.auth.isSignIn);
  const signInUser = useSelector((state) => state.auth.signInUser);
  const isCart = useSelector((state) => state.cart.items);
  const [isPaymentList, setIsPaymentList] = useState([]);

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

  return (
    <div className="member-header">
      <div className="member-header-con">
        <div className="gnb">
          <h1 className="logo">
            <Link to={"/"}>
              <img src="/images/common/main_logo.png" alt="logo" />
            </Link>
          </h1>
          <h1 className="logo-mini">
            <Link to={"/"}>
              <img src="/images/common/logo.png" alt="logo" />
            </Link>
          </h1>
          <ul>
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
                  onClick={(e) => {
                    e.preventDefault();
                    alert("로그아웃 되었습니다. ");
                    dispatch(signOutFn());
                    navigate("/");
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
  );
};
export default MemberHeader;
