import React, { useEffect, useState } from "react";
import WebtoonModal from "./WebtoonModal";
import { useDispatch, useSelector } from "react-redux";
import { allItemThunk } from "../../slice/allItemSlice";

const webtoonItems = {
  id: 0,
  title: "",
  price: "",
  img: "",
};

const WebtoonIndex = () => {
  const [isWebtoon, setIsWebtoonModal] = useState(false); //모달 화면 여부
  const [modalItem, setModalItem] = useState(webtoonItems); //모달 데이터
  const [webtoonItem, setWebtoonItem] = useState([]); //웹툰 데이터
  const dispatch = useDispatch();
  const items = useSelector(state => state.allItem.items);

  useEffect(() => {
    dispatch(allItemThunk());
  }, []);

  const filterItems = items.filter((el) => el.type === "웹툰");
  const ItemsCount = filterItems.length;

  filterItems &&
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
    setIsWebtoonModal(true);
  };

  return (
    <>
    
      {isWebtoon ? (
        <WebtoonModal
          modalItem={modalItem}
          setModalItem={setModalItem}
          setIsWebtoonModal={setIsWebtoonModal}
        />
      ) : (
        <></>
      )}
      <div className="webtoon">
        <div className="webtoon-con">
          <div className="top">
            <h1>웹툰</h1>
            <hr />
          </div>
          <div className="webtoonContent">
            <div className="mainBanner">
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
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="subMenu">
              <h2>인기웹툰</h2>
              <ul>
                {filterItems &&
                  filterItems.map((el, idx) => {
                    return (
                      <li key={idx} data-id={el.id} onClick={webtoonModalFn}>
                        <div className="itemImg">
                          <img
                            src={`/images/itemData/${el.img}`}
                            alt={el.img}
                          />
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="subMenu">
              <h2>공포 / 스릴러</h2>
              <ul>
                {filterItems &&
                  filterItems
                    .filter(
                      (el) => el.genre === "공포" || el.genre === "스릴러"
                    )
                    .map((el, idx) => {
                      return (
                        <li key={idx} data-id={el.id} onClick={webtoonModalFn}>
                          <div className="itemImg">
                            <img
                              src={`/images/itemData/${el.img}`}
                              alt={el.img}
                            />
                          </div>
                        </li>
                      );
                    })}
              </ul>
            </div>
            <div className="subMenu">
              <h2>액션</h2>
              <ul>
                {filterItems &&
                  filterItems
                    .filter((el) => el.genre === "액션")
                    .map((el, idx) => {
                      return (
                        <li key={idx} data-id={el.id} onClick={webtoonModalFn}>
                          <div className="itemImg">
                            <img
                              src={`/images/itemData/${el.img}`}
                              alt={el.img}
                            />
                          </div>
                        </li>
                      );
                    })}
              </ul>
            </div>
            <div className="subMenu">
              <h2>판타지</h2>
              <ul>
                {filterItems &&
                  filterItems
                    .filter((el) => el.genre === "판타지")
                    .map((el, idx) => {
                      return (
                        <li key={idx} data-id={el.id} onClick={webtoonModalFn}>
                          <div className="itemImg">
                            <img
                              src={`/images/itemData/${el.img}`}
                              alt={el.img}
                            />
                          </div>
                        </li>
                      );
                    })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebtoonIndex;
