
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AdminMemberDetailModal2 from './AdminMemberDetailModal2';
import AdminOrderPlaceModal2 from './AdminOrderPlaceModal2';
import AdminOrderPlaceModal1 from './AdminOrderPlaceModal1';
import { localhost } from '../../api/CommonAPI';
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
const AdminOrderPlaceModal4 = ({setPlaceModal4}) => {
    const [update,setUpdate]=useState(placeData)
    const [placeModal2, setPlaceModal2] = useState(false);
    const [placeModal1, setPlaceModal1] = useState(false);
    const onPlaceModal2Fn = () => {
        setPlaceModal2(true);
       
        }
   
    const param = useParams()
    const navigate=useNavigate()
   
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
        setPlaceModal4(false)
    }
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
     <div className="update-place">
    <div className="update-place-con">
    <span className='close' onClick={closeFn}>x</span>
      <h1>주문처 정보 수정</h1>

      <ul>
        <li>
          <input type="text" name="place_name" id="place_name" placeholder='이름'
             value={update.place_name}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="address_name" id="address_name"  placeholder='주소'
            value={update.address_name}
            onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="category_group_code" id="category_group_code" placeholder='카테고리 코드'
             value={update.category_group_code}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="phone" id="phone" placeholder='전화번호'
             value={update.phone}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="category_group_name" id="category_group_name" placeholder='카테고리 그룹 이름'
             value={update.category_group_name}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="category_name" id="category_name" placeholder='카테고리 이름'
             value={update.category_name}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="distance" id="distance" placeholder='거리'
             value={update.distance}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="place_url" id="place_url" placeholder='url'
             value={update.place_url}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="road_address_name" id="road_address_name" placeholder='도로 주소'
             value={update.road_address_name}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="x" id="x" placeholder='x'
             value={update.x}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="y" id="y" placeholder='y'
             value={update.y}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <button  onClick={onPlaceModal2Fn} >수정하기</button>  

          {/* <button  onClick={backFn} >뒤로가기</button>          */}
        </li>
      </ul>
    </div>
  </div>
    
    
    </>
  )
}

export default AdminOrderPlaceModal4