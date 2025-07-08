import { useEffect, useState } from "react";
import axios from "axios";
import AdminOrderPlaceModal from "./AdminOrderPlaceDetail";
import AdminOrderPlaceModal1 from "./AdminOrderPlaceModal1";
import { useNavigate, useParams } from "react-router-dom";
import AdminOrderPlaceModal3 from "./AdminOrderPlaceModal3";
import { localhost } from "../../api/CommonAPI";

const { kakao } = window;
// const placeData={
//   id:"",
//   placeName:"",
//   placeAddress:"",
//   homepage:"",
//   phone:"",
//   }




function AdminOrderPlace() {



  // const [place, setPlace] = useState({});
  // const maps = useSelector((state) => state.map.items);

  // useEffect(() => {
  //   dispatch(mapThunk());
  // }, []);

  // useEffect(() => {
  //   const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
  //   const options = {
  //     //지도를 생성할 때 필요한 기본 옵션
  //     center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  //     level: 3, //지도의 레벨(확대, 축소 정도)
  //   };

  //   const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  //   var geocoder = new kakao.maps.services.Geocoder();

  //   // 주소로 좌표를 검색합니다
  //   geocoder.addressSearch(
  //     "서울 노원구 동일로 1414 롯데백화점 10층",
  //     function (result, status) {
  //       // 정상적으로 검색이 완료됐으면
  //       if (status === kakao.maps.services.Status.OK) {
  //         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

  //         // 결과값으로 받은 위치를 마커로 표시합니다
  //         var marker = new kakao.maps.Marker({
  //           map: map,
  //           position: coords,
  //         });

  //         // 인포윈도우로 장소에 대한 설명을 표시합니다
  //         var infowindow = new kakao.maps.InfoWindow({
  //           content:
  //             '<div style="width:150px;text-align:center;padding:6px 0;color:black;">롯데백화점 노원점</div>',
  //         });
  //         infowindow.open(map, marker);

  //         // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
  //         map.setCenter(coords);
  //       }
  //     }
  //   );
  // }, []);

  const [place, setPlace] = useState([]);
  const param=useParams()
  const [placeModal, setPlaceModal] = useState(false);
  const [placeModal1, setPlaceModal1] = useState(false);
  const [placeModal3, setPlaceModal3] = useState(false);
  
  const navigate= useNavigate()
  const onPlaceModal3Fn = () => {
    setPlaceModal3(true);
   
    }
    
 
  useEffect(() => {
   
    const axiosFn = async (e) => {
      try {
        const res = await axios.get(`http://${localhost}:3001/shopList`)
        const data = res.data
        console.log(data)
        setPlace(data)
        

      } catch (err) {
        alert(err)
        return
      }
    }
    axiosFn()

    
    // fn1(place)
    
  }, []);
  const placeDetailFn = (elId) => {
    
    navigate(`/admin/adminplace/detail/${elId}`)
    
  }
  
  
  // const fn1 = (val) => {
  //   console.log(place.length)  // 배열의 길이 만큼 반복해서 구현
  

  //   var container = document.getElementById(`1233`); //지도를 담을 영역의 DOM 레퍼런스
  //   var options = {
  //     //지도를 생성할 때 필요한 기본 옵션
  //     center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
  //     level: 3, //지도의 레벨(확대, 축소 정도)
  //   };
  //   var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  //   var geocoder = new kakao.maps.services.Geocoder();
  //   // 주소로 좌표를 검색합니다
  //   geocoder.addressSearch(val,
  //     function (result, status) {
  //       console.log(place, ' val')
  //       // 정상적으로 검색이 완료됐으면
  //       if (status === kakao.maps.services.Status.OK) {
  //         var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

  //         // 결과값으로 받은 위치를 마커로 표시합니다
  //         var marker = new kakao.maps.Marker({
  //           map: map,
  //           position: coords,
  //         });

  //         // 인포윈도우로 장소에 대한 설명을 표시합니다
  //         var infowindow = new kakao.maps.InfoWindow({
  //           content:
  //             '<div style="width:150px;text-align:center;padding:6px 0;color:black;">롯데백화점 노원점</div>',
  //         });
  //         infowindow.open(map, marker);

  //         // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
  //         map.setCenter(coords);
  //       }
  //     }
  //   );
  
  // }
 

  return (
    <>
    {placeModal3 && (
        <AdminOrderPlaceModal3  setPlaceModal3={setPlaceModal3} />
    )}
   
   <div className="admin-place">
   <div className="admin-place-con"> 
    <h1>주문처 페이지</h1>
      <div className="place-add">
      <li onClick={onPlaceModal3Fn}>주문처 추가</li>
        </div>
          <div className="admin-place-list" >
            <ul>

       {place && place.map((el, idx) => {
         return (
              <li  key={idx}>
                <span>{el.place_name}</span>
                {/* <li id={el.id} style={{ width: "100px", height: "50px" }}></li> */}
                <span>주소: {el.address_name}</span>
                <span>카테고리 : {el.category_name}</span>
                <span>전화번호: {el.phone}</span>
                <div className="button">

               
               
                <button onClick={()=>{
                                placeDetailFn(el.id)
                              }}>상세정보</button>
               
                </div>
               </li>     
            )
          })}
     
          </ul>
      </div>
      </div>
      </div>

    </>
  );
}

export default AdminOrderPlace;
