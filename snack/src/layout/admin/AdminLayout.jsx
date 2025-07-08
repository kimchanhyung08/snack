import React, { useEffect } from "react";
import AdminLeft from "./AdminLeft";
import { Outlet, useNavigate } from "react-router-dom";
import AdminRight from "./AdminRight";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const isLogin = useSelector((state) => state.auth.isSignIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin === false) {
      navigate("/signIn");
    }
  });

  return (
    <>
      <div className="admin">
        <div className="admin-left">
          <AdminLeft />
        </div>
        <div className="admin-right">
          <AdminRight />
          <div className="admin-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
