import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import MapModal from './MapModal'
import { localhost } from './CommonAPI';

const { kakao } = window;

const KakaoApi = () => {
  const modalRef=useRef()
  const [mapModal,setMapModal]=useState(false)
  const [kakaoData,setKakaoData]=useState([])
  const [onkakao, setOnkakao]=useState("롯데시네마 노원")
  const [modalItem,setModalitem]=useState({})
  const [resizeMap,setResizeMap]=useState(window.innerWidth)
  const clickOutModal=(e)=>{
    if(setMapModal&&(modalRef.current===e.target)){setMapModal(false)}
  }
  useEffect(() => {
    // 지도를 표시할 div
    var container = document.getElementById("map");

    // 지도 옵션
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 7, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    var map = new kakao.maps.Map(container, options);

    var imageSrc = "/images/common/marker2.png", // 마커이미지의 주소입니다
      imageSize = new kakao.maps.Size(75, 100), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );
    // 마커 위치
    // var markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 
  

    // // 마커를 생성합니다
    // var marker = new kakao.maps.Marker({
    //     position: markerPosition,
    //     image: markerImage
    // });


    // 마커가 지도 위에 표시되도록 설정합니다
    // marker.setMap(map);

  


    //////////////////////////////////////////////////////////////////////////

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // var iwRemovable=true;
    // var infowindow = new kakao.maps.InfoWindow({zIndex:1,removable:iwRemovable});

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
      setModalitem(place);

      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
        image: markerImage,
      });
      window.addEventListener("resize",function(event){

        var resizePosition = marker.getPosition(); 
        map.relayout();
        map.setCenter(resizePosition);
      })
      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        // infowindow.setContent(
        //   '<div style="padding:5px;font-size:12px;color:#000;">' + place.place_name + `<div style="padding:5px;font-size:12px;"}>자세히보기</div>` + '</div>'
        // );
        // infowindow.open(map, marker);

        setMapModal(true);
      });
    }

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (kakaoData.length === 0) {
        console.log(data, "데이터 추가");
        setKakaoData(data);
      }

      // db 저장
      const axiosKakaoFn = async () => {
        try {
          const res = await axios.get(`http://${localhost}:3001/shopList`);

          if (res.data.length === 0) {
            const filterItem = data.filter(
              (item) =>
                item.place_name.includes("CGV") ||
                item.place_name.includes("메가박스") ||
                item.place_name.includes("롯데시네마")
            );

            filterItem.map((el) => {
              axios.post(`http://${localhost}:3001/shopList`, el);
            });
            await Promise.all(filterItem);
          }
        } catch (err) {
          alert(err);
        }
      };
      axiosKakaoFn();

      const hahaha = data.filter((el) => el.place_name === onkakao)[0];
      console.log(hahaha,'hahaha');

      var bounds = new kakao.maps.LatLngBounds();
      displayMarker(hahaha);
      bounds.extend(new kakao.maps.LatLng(hahaha.y, hahaha.x));
      map.setBounds(bounds);

      // if (status === kakao.maps.services.Status.OK) {

      //   // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      //   // LatLngBounds 객체에 좌표를 추가합니다
      //   var bounds = new kakao.maps.LatLngBounds()

      //   for (var i=0; i<data.length; i++) {
      //     displayMarker(data[i]);
      //     bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
      //   }

      //   // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      //   map.setBounds(bounds);

      // }
    }

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    ps.keywordSearch('노원 상계동 영화관', placesSearchCB); 
    
  },[onkakao])
  
  
  return (
    <>
      {mapModal? <MapModal modalRef={modalRef} clickOutModal={clickOutModal} setMapModal={setMapModal} modalItem={modalItem}/>:<></>}
      <div className="kakao-api">
        <div className="kakao-api-header">
          <h1>주문처</h1>
          <hr />
        </div>

        <div className="kakao-api-con">
          <div className="kakao-api-left">
            <div id="map"></div>
            {/* <div id="map" style={{width: "400px" , height: "300px" }}></div> */}
          </div>
          <div className="kakao-api-right">
            <div className="right-con">
              <div className="title">
                <h1>지역 검색</h1>
                <span>함께하는 snack</span>
              </div>
              <div className="buttons">
                <div className="buttons-con">
                  {kakaoData.slice(0, 6).map((el, idx) => {
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setOnkakao(`${el.place_name}`);
                        }}
                      >
                        {el.place_name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KakaoApi;
