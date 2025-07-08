import React from "react";
import HeaderNav from "../../components/common/HeaderNav";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";
import SideBar from "../../components/common/SideBar";

const DefaultLayout = () => {
  return (
    <>
      <div className="layout">
      <div className="left">
          <HeaderNav />
        </div> 
      <div className="right">
          <Header />
          <SideBar />
          <div className="content">
            <Outlet />
          </div>
        </div> 
      </div>
    </>
  );
};

export default DefaultLayout;
