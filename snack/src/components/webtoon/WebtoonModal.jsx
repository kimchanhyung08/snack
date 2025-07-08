import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../slice/cartslice";
import { addPayment } from "../../slice/paymentSlice";
import { useNavigate } from "react-router-dom";
import { localhost } from "../../api/CommonAPI";

const WebtoonModal = ({ modalItem, setModalItem, setIsWebtoonModal }) => {
  const [modalItemCount, setModalItemCount] = useState(1);
  const [modalItems, setModalItems] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.allItem.items);
  const [webtoonItem, setWebtoonItem] = useState([]); //웹툰 데이터
  const modalContentRef = useRef(null);

  const closeFn = (e) => {
    setIsWebtoonModal(false);
  };

  const incrementFn = () => {
    setModalItemCount(modalItemCount + 1);
  };

  const decrementFn = () => {
    setModalItemCount(modalItemCount - 1);
    modalItemCount <= 1
      ? setModalItemCount(1)
      : setModalItemCount(modalItemCount - 1);
  };

  useEffect(() => {
    const axiosFn = async () => {
      try {
        const res = await axios.get(
          `http://${localhost}:3001/allItems?id=${modalItem.id}`
        );
        setModalItems(res.data[0]);
      } catch (err) {
        alert("데이터가 없습니다. 네트워크 상태를 확인해주세요.");
      }
    };
    axiosFn();
    modalContentRef.current.scrollTop = 0;
  }, []);

  const webtoonCart = {
    id: modalItems.id,
    type: modalItems.type,
    title: modalItems.title,
    price: modalItems.price,
    img: `/images/itemData/${modalItems.img}`,
    genre: modalItems.genre,
    age: modalItems.age,
    year: modalItems.year,
    time: modalItems.time,
    count: modalItemCount,
    coment: modalItems.coment,
  };

  const addCartFn = () => {
    dispatch(addCart(webtoonCart));
    alert("장바구니에 추가되었습니다");
  };

  const addPayementFn = () => {
    dispatch(addPayment(webtoonCart));
    alert("구매페이지로 이동합니다.");
    navigate("/paymentIndex?type=buy");
  };

  const filterItems = items.filter((el) => el.type === "웹툰");
  const ItemsCount = filterItems.length;

  filterItems.map((el, idx) => {
    const random = Math.floor(Math.random() * ItemsCount); //랜덤 함수
    const randomItem = filterItems[random]; //필터된 데이터를 랜덤으로 돌리는 함수

    if (!webtoonItem.includes(randomItem) && webtoonItem.length < 4) {
      setWebtoonItem([...webtoonItem, randomItem]);
    }
  });

  const webtoonModalFn = (e) => {
    const eId = e.currentTarget.getAttribute("data-id");
    setModalItem({
      id: parseInt(eId),
    });

    const axiosFn = async () => {
      try {
        const res = await axios.get(`http://${localhost}:3001/allItems?id=${eId}`);
        setModalItems(res.data[0]);
      } catch (err) {
        alert("데이터가 없습니다. 네트워크 상태를 확인해주세요.");
      }
    };
    axiosFn();
    setIsWebtoonModal(true);
    modalContentRef.current.scrollTop = 0;
  };

  return (
    <>
      <div className="webtoonModal">
        <div className="webtoonModal-con" ref={modalContentRef}>
          <div className="item">
            <span className="close" onClick={closeFn}>
              ×
            </span>
            <div className="top">
              <img
                src={`/images/itemData/${modalItems.img}`}
                alt={modalItems.img}
              />
              <span className="title">{modalItems.title}</span>
            </div>
            <div className="bottom">
              <div className="detail">
                <ul>
                  <li>{modalItems.age}</li>
                  <li>·</li>
                  <li>{modalItems.year}</li>
                  <li>·</li>
                  <li>{modalItems.genre}</li>
                  <li>·</li>
                  <li>편당 {modalItems.price}원</li>
                </ul>
              </div>
              <div className="cartBtn">
                <button onClick={addPayementFn}>📼 구매</button>
                <button onClick={addCartFn}>🛒 장바구니</button>
              </div>
              <div className="cartBtn">
                <div className="itemCount">
                  <button onClick={decrementFn}>-</button>
                  <span>{modalItemCount}</span>
                  <button onClick={incrementFn}>+</button>
                </div>
                <div className="count">
                  {modalItems.price * modalItemCount}원
                </div>
              </div>
              <div className="comment">
                <span>{modalItems.comment}</span>
              </div>
              <div className="random">
                <ul>
                  {webtoonItem &&
                    webtoonItem.slice(0, 4).map((el, idx) => {
                      return (
                        <li key={idx} data-id={el.id} onClick={webtoonModalFn}>
                          <div className="itemImg">
                            <img
                              src={`/images/itemData/${el.img}`}
                              alt={el.img}
                            />
                            <ul>
                              <li>
                                <span>{el.title}</span>
                              </li>
                              <li>
                                <span>{el.comment}</span>
                              </li>
                            </ul>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebtoonModal;
