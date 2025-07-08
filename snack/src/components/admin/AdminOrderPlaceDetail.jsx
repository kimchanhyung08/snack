import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import AdminOrderPlaceModal2 from './AdminOrderPlaceModal2';
import AdminOrderPlaceModal1 from './AdminOrderPlaceModal1';
import AdminOrderPlaceModal3 from './AdminOrderPlaceModal3';
import AdminOrderPlaceModal4 from './AdminOrderPlaceModal4';
import { localhost } from '../../api/CommonAPI';
const {kakao} = window
const placeData={
    id:"",
    category_group_code:"",
    address_name:"",
    category_group_name:"",
    phone:"",
    category_name:"",
    distance:"",
    place_name:"",place_url:"",road_address_name:"",x:"",y:""
    }

const AdminOrderPlaceDetail = () => {

  
    const [update,setUpdate]=useState(placeData)
    const [placeModal2, setPlaceModal2] = useState(false);
    const [placeModal1, setPlaceModal1] = useState(false);
    const [placeModal4, setPlaceModal4] = useState(false);
  
 
  const onPlaceModal4Fn = () => {
    setPlaceModal4(true);
   
    }
    const param = useParams()
    const navigate=useNavigate()
    const onPlaceModal2Fn = () => {
        setPlaceModal2(true);
       
        }
        const backFn = () =>{
          navigate(-1)
        }
    
    const onUpdateChangeFn= (e) =>{
        const name=e.target.name
        const value=e.target.value

        setUpdate({
            ...update,
            [name]:value
        })
    }


        const closeFn =() =>{
        
    }

    useEffect(()=>{
      var container = document.getElementById('map');
      // 지도를 표시할 div 
   var option = { 
   center: new kakao.maps.LatLng(update.y, update.x), // 지도의 중심좌표
   level: 4 // 지도의 확대 레벨
};
 var map = new kakao.maps.Map(container, option);

 var imageSrc = '/images/common/marker2.png', // 마커이미지의 주소입니다    
 imageSize = new kakao.maps.Size(35, 50), // 마커이미지의 크기입니다
 imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
   
 // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
 var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
 // 마커 위치
 var markerPosition  = new kakao.maps.LatLng(update.y, update.x); 
 

 // 마커를 생성합니다
 var marker = new kakao.maps.Marker({
     position: markerPosition,
     image: markerImage
 });
 marker.setMap(map);
    })
    
    useEffect(()=>{
    
        const orderPlaceFn = async () =>{
            // const productId = param.param.id
            
                try{
                    const res = await axios.get(`http://${localhost}:3001/shopList/${param.id}`)
                    console.log(res.data, 'data')
                     setUpdate(res.data)
                     
                     


                     
                }catch (err) {
                    alert(err)
                  }
            }
            orderPlaceFn()
          
          
    },[])





    
    const onPlaceModal1Fn = () => {
      setPlaceModal1(true);
      
      }
  return (
    <>
     {placeModal2 && (
        <AdminOrderPlaceModal2 update={update} setPlaceModal2={setPlaceModal2} />
    )}
    {placeModal1 && (
        <AdminOrderPlaceModal1  setPlaceModal1={setPlaceModal1} />
    )}
     {placeModal4 && (
        <AdminOrderPlaceModal4  update={update} setPlaceModal4={setPlaceModal4} />
    )}
     <div className="detail-place">
    <div className="detail-place-con">
    <div className="place-left">
      <h1>주문처 정보</h1>

      <div  className ="place-map" id="map"   ></div>
    </div>
    <div className="place-right">

      <ul>
        <li>
          {update.place_name}
            
        </li>
        <li>
          {update.address_name}
           
        </li>
        <li>
          {update.category_group_code}
             
        </li>
        <li>
          {update.phone}
             
        </li>
        <li>
         {update.category_group_name}
             
        </li>
        <li>
          {update.category_name}
            
        </li>
        <li>
          {update.distance}
           
        </li>
        <li>
          {update.place_url}
             
        </li>
        <li>
          {update.road_address_name}
             
        </li>
        <li>
          {update.x}
             
        </li>
        <li>
        {update.y}
            
        </li>
        <li>
          <button onClick={onPlaceModal4Fn}>수정하기</button>  
          <button  onClick={onPlaceModal1Fn} >삭제하기</button>  

          {/* <button  onClick={backFn} >뒤로가기</button>          */}
        </li>
      </ul>
    </div>
    </div>
  </div>
    
    
    </>
  )
}

export default AdminOrderPlaceDetail