import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { localhost } from "../../../../api/CommonAPI";

const PaymentDetail = () => {
  const param = useParams();
  console.log(param, "dsadsa");
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState([]);
  const [isVertical, setIsVertical] = useState(true);

  useEffect(() => {
    const AxiosFn = async (e) => {
      try {
        const res = await axios.get(
          `http://${localhost}:3001/payments/${param.id}`
        );
        const resData = res.data;
        setPaymentData(resData);
        console.log(param.id, "id");
        console.log(paymentData, "test");
      } catch (err) {
        alert(err);
      }
    };
    AxiosFn();
  }, []);

  useEffect(() => {
    const img = new Image();
    img.onload = function () {
      const width = img.width;
      const height = img.height;

      if (width > height) {
        setIsVertical(true);
      } else {
        setIsVertical(false);
      }
    };
  }, []);

  return (
    <>
      <div className="paymentDetail">
        <div className="paymentDetail-con">
          <div className="top">
            <h1>결제 내역</h1>
            <hr />
          </div>
          <div className="content">
            <ul>
              <li>종류</li>
              <li>제목</li>
              <li>장르</li>
              <li>가격</li>
              <li>연도</li>
              <li>주문 개수</li>
              <li>영상 시간</li>
              <li>사진</li>
            </ul>
            <ul>
              {paymentData.paymentResult &&
                paymentData.paymentResult.map((el, idx) => {
                  return (
                    <>
                      <li>{el.type}</li>
                      <li>{el.title}</li>
                      <li>{el.genre}</li>
                      <li>{el.price}</li>
                      <li>{el.year}</li>
                      <li>{el.count}</li>
                      <li>{el.time}</li>
                      <li>
                        <img
                          className={
                            isVertical ? "verticalImg" : "horizontalImg"
                          }
                          src={el.img}
                          alt={el.img}
                        />
                      </li>
                    </>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetail;
