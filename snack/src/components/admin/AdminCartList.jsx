import axios from "axios";
import React, { useEffect, useState } from "react";
import { localhost } from "../../api/CommonAPI";

const AdminCartList = () => {
  const [cartList, setCartList] = useState([]);
  useEffect(() => {
    const axiosFn = async () => {
      try {
        const res = await axios.get(`http://${localhost}:3001/payments`);
        setCartList(res.data);
      } catch (err) {
        alert(err);
      }
    };
    axiosFn();
  }, []);
  return (
    <div className="admin-cartlist">
      <div className="admin-cartlist-con">
        <h1>장바구니 리스트</h1>
        {/* <hr /> */}
        <ul>
          {cartList &&
            cartList.map((el, index) => {
              return (
                <li key={index} data-id={el.id}>
                  <div className="top">

                  <span>{el.time}</span>
                  <span>구매자: {el.userName}</span>
                  <span>주문처: {el.branchType}</span>

                  </div>
                  <hr/>

                  {el.paymentResult &&
                    el.paymentResult.map((el, index) => {
                      return (
                        <>
                          <div className="i1">
                          <span>{el.title}</span>
                          <span>{el.price}원</span>
                          <span>{el.count}개</span>
                         <span><img src={el.img} alt={el.img} /></span>
                          </div>
                        </>
                      );
                    }
                  )}
                  <hr/>
                  <div className="bottom">

                  <span>총금액: {el.paymentAmount}원</span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default AdminCartList;
