import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOutFn } from "../../slice/authSlice";

const AdminRight = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSignIn = useSelector((state) => state.auth.isSignIn);
  const signInUser = useSelector((state) => state.auth.signInUser);

  return (
    <div className="admin-rigth">
      <div className="admin-right-con">
        <div className="admin-gnb">
          <h1 className="admin-logo">
            <Link to={"/admin"}>
              <img src="/images/common/main_logo.png" alt="logo" />
            </Link>
          </h1>
          <h1 className="admin-logo-mini">
            <Link to={"/admin"}>
              <img src="/images/common/logo.png" alt="logo" />
            </Link>
          </h1>
          <ul>
            <li>
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
            </li>
            {isSignIn && (
              <li>
                <Link to={"/member"}>{signInUser[0].userEmail}님</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminRight;
