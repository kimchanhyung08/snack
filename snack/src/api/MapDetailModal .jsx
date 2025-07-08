import axios from "axios";
import React, { useEffect } from "react";

const { kakao } = window;

const MapDetailModal = ({ setIsMapDetailModal, detailmodalItem }) => {

  useEffect(() => {
    // 지도를 표시할 div
    var container = document.getElementById("map");

    // 지도 옵션
    var options = {
      center: new kakao.maps.LatLng(detailmodalItem.y, detailmodalItem.x), // 지도의 중심좌표
      level: 7, // 지도의 확대 레벨
    };

    var map = new kakao.maps.Map(container, options); //지도 생성

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    var imageSrc = "/images/common/marker2.png", //이미지 주소
      imageSize = new kakao.maps.Size(75, 100), //이미지 크기
      imageOption = { offset: new kakao.maps.Point(27, 69) }; //이미지 위치

    // 마커의 이미지 정보를 가지고 마커 이미지 생성

    var markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imageOption
    );

    // 마커 좌표

    var markerPosition = new kakao.maps.LatLng(detailmodalItem.y, detailmodalItem.x);

    // 마커 생성
    var marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    // 마커 지도에 표시
    marker.setMap(map);

    kakao.maps.event.addListener(marker, "click", function () {
      window.open(`https://place.map.kakao.com/m/${detailmodalItem.id}`);
    });
  }, [detailmodalItem]);

  const closeFn = () => {
    setIsMapDetailModal(false);
  };

  return (
    <>
      <div className="mapModal">
        <div className="mapModal-con">
          <div className="maptitle">
            <div className="none"></div>
            <h2>
              <img src="/images/common/main_logo.png" alt="logo" />
            </h2>
            <span className="close" onClick={closeFn}>
              ✕
            </span>
          </div>
          <div className="mapitem">
            <div id="map"></div>
            <div className="mapbottom">
              <span>{detailmodalItem.place_name}</span>
              <div className="mapDetail">
                <ul className="mapName">
                  <li>지점명</li>
                  <li>상세주소</li>
                  <li>연락처</li>
                </ul>
                <ul className="nameDetail">
                  <li>{detailmodalItem.place_name}</li>
                  <li>{detailmodalItem.address_name}</li>
                  <li>{detailmodalItem.phone}</li>
                </ul>
              </div>
              <div className="none"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapDetailModal;
