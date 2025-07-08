import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";
import MapDetailModal from "../../../../api/MapDetailModal ";
import { localhost } from "../../../../api/CommonAPI";

const Payment = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState([]);
  const signInUser = useSelector((state) => state.auth.signInUser);
  const [isMapDetailModal, setIsMapDetailModal] = useState(false);
  const [detailmodalItem, setDetailmodalItem] = useState({});
  const userEmail = signInUser[0].userEmail;
  const paymentDataFilter = paymentData.filter(
    (el) => el.userEmail === userEmail
  );

  useEffect(() => {
    const AxiosFn = async (e) => {
      try {
        const res = await axios.get(`http://${localhost}:3001/payments`);
        const resData = res.data;
        setPaymentData(resData);
      } catch (err) {
        alert(err);
      }
    };
    AxiosFn();
  }, []);

  const detailFn = (eId) => {
    navigate(`/paymentDetail/${eId}`);
  };

  const mapModalFn = (e) => {
    const placeName = e.currentTarget.getAttribute("value");
      const axiosFn = async () => {
        try {
          const res = await axios.get(`http://${localhost}:3001/shopList?place_name=${placeName}`)
          if (res.data && res.data.length > 0) {
            // 데이터가 있을 경우에만 처리
            setDetailmodalItem(res.data[0]);
          } else {
            // 데이터가 없을 경우
            alert("해당 장소에 대한 정보가 없습니다.");
            setDetailmodalItem("0");  // 혹은 빈 값으로 초기화
            setIsMapDetailModal(false);
          }
        } catch (err) {
          alert(err);
        }
      };
      axiosFn();
      setIsMapDetailModal(true);
  };


 

  return (
    <>
    {isMapDetailModal ? (
        <MapDetailModal
          setIsMapDetailModal={setIsMapDetailModal}
          detailmodalItem={detailmodalItem}
        />
      ) : (
        <></>
      )}
      <div className="payment">
        <div className="payment-con">
          <div className="top">
            <h1>결제 내역</h1>
            <hr />
          </div>
          <div className="content">
            <ul>
              <li>연번</li>
              <li>결제일자</li>
              <li>지점</li>
              <li>결제수단</li>
              <li>주문방식</li>
              <li>금액</li>
              <li>상세내역</li>
            </ul>
            {paymentDataFilter &&
              paymentDataFilter.map((el, idx) => {
                return (
                  <>
                    <ul className="dataList">
                      <li>{idx + 1}</li>
                      <li key={idx}>{el.time}</li>
                      <li onClick={mapModalFn} value={el.branchType}>{el.branchType}</li>
                      <li>{el.paymentMethod}</li>
                      <li>{el.orderType}</li>
                      <li>{el.paymentAmount}</li>
                      <li
                        onClick={() => {
                          detailFn(el.id);
                        }}
                      >
                        상세내역<br/>보기
                      </li>
                    </ul>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
