import axios from 'axios';
import React, { useState } from 'react'
import AdminAddPlaceModal1 from './AdminAddPlaceModal1';
import AdminAddPlaceModal2 from './AdminAddPlaceModal2';
import AdminAddPlaceModal3 from './AdminAddPlaceModal3';
import { localhost } from '../../api/CommonAPI';

const addPlaceData ={
 
  category_group_code:"",
  address_name:"",
  category_group_name:"",
  phone:"",
  category_name:"",
  distance:"",
  place_name:"",place_url:"",road_address_name:"",x:"",y:""
}
const AdminOrderPlaceModal3 = ({setPlaceModal3}) => {
    const [addPlace,setAddPlace]=useState(addPlaceData)
    const [addPlacemodal1, setAddPlacemodal1] = useState(false);
    const [addPlacemodal2, setAddPlacemodal2] = useState(false);
    const [addPlacemodal3, setAddPlacemodal3] = useState(false);
    const [contents, setContents] = useState("")

    const addPlaceModal1Fn = () => {
        setAddPlacemodal1(true);
      }
      const addPlaceModal2Fn = (contents) => {
      setContents(contents)

        setAddPlacemodal2(true);
      }
      const addPlaceModal3Fn = () => {
        setAddPlacemodal3(true);
      }
      const onAddChangeFn= (e) =>{
        const name=e.target.name
        const value=e.target.value

        setAddPlace({
            ...addPlace,
            [name]:value
        })
    }
    const onAddFn = (e) =>{
        const addAxiosFn = async (e) =>{
            const res = await axios.get(`http://${localhost}:3001/shopList`)
    
            const num = res.data.findIndex(el=>{
                return el.place_name === addPlace.place_name
            })
    
            if(num != -1){
                addPlaceModal1Fn()
                // alert("제목을 바꿔주세요")
                return
            }else if(addPlace.place_name===""){
                addPlaceModal2Fn('f1')
                // alert("을 입력해주세요")
    
              return
            }
            else if(addPlace.address_name===""){
              addPlaceModal2Fn('f2')
              // alert("을 입력해주세요")
  
            return
          }
          else if(addPlace.category_group_code===""){
            addPlaceModal2Fn('f3')
            // alert("을 입력해주세요")

          return
        }
        else if(addPlace.phone===""){
          addPlaceModal2Fn('f4')
          // alert("을 입력해주세요")

        return
      }  
      else if(addPlace.category_group_name===""){
        addPlaceModal2Fn('f5')
        // alert("을 입력해주세요")

      return
    }
    else if(addPlace.category_name===""){
      addPlaceModal2Fn('f6')
      // alert("을 입력해주세요")

    return
  }
  else if(addPlace.distance===""){
    addPlaceModal2Fn('f7')
    // alert("을 입력해주세요")

  return
}
else if(addPlace.place_url===""){
  addPlaceModal2Fn('f8')
  // alert("을 입력해주세요")

return
}
else if(addPlace.road_address_name===""){
  addPlaceModal2Fn('f9')
  // alert("을 입력해주세요")

return
}
else if(addPlace.x===""){
  addPlaceModal2Fn('f10')
  // alert("을 입력해주세요")

return
}
else if(addPlace.y===""){
  addPlaceModal2Fn('f11')
  // alert("을 입력해주세요")

return
}

            else{
                addPlaceModal3Fn()
            // const addOk = await axios.post(`http://${localhost}:3001/allItems`,add)
           
            // alert('상품추가 성공')
            }
        }
        addAxiosFn()
    
        }
        const backFn = () => {
            setPlaceModal3(false);
           
            }
  return (
    <>
    {addPlacemodal1 ? (<AdminAddPlaceModal1 setAddPlacemodal1={setAddPlacemodal1}/>):(<></>)}
    {addPlacemodal2 ? (<AdminAddPlaceModal2 contents={contents} setAddPlacemodal2={setAddPlacemodal2}/>):(<></>)}
    {addPlacemodal3 &&(<AdminAddPlaceModal3  addPlace={addPlace} setAddPlacemodal3={setAddPlacemodal3}/>)}
    <div className="add-place">
    <div className="add-place-con">
      <h1>주문처 추가</h1>
      <ul>
      <li>
          <input type="text" name="place_name" id="place_name" placeholder='이름'
             value={addPlace.place_name}
             onChange={onAddChangeFn}/>
        </li>
        <li>
          <input type="text" name="address_name" id="address_name"  placeholder='주소'
            value={addPlace.address_name}
            onChange={onAddChangeFn}/>
        </li>
        <li>
          <input type="text" name="category_group_code" id="category_group_code" placeholder='카테고리 코드'
             value={addPlace.category_group_code}
             onChange={onAddChangeFn}/>
        </li>
        <li>
          <input type="text" name="phone" id="phone" placeholder='전화번호'
             value={addPlace.phone}
             onChange={onAddChangeFn}/>
        </li>
        <li>
          <input type="text" name="category_group_name" id="category_group_name" placeholder='카테고리 그룹 이름'
             value={addPlace.category_group_name}
             onChange={onAddChangeFn}/>
        </li>
        <li>
          <input type="text" name="category_name" id="category_name" placeholder='카테고리 이름'
             value={addPlace.category_name}
             onChange={onAddChangeFn}/>
        </li>
        <li>
          <input type="text" name="distance" id="distance" placeholder='거리'
             value={addPlace.distance}
             onChange={onAddChangeFn}/>
        </li>
        <li>
          <input type="text" name="place_url" id="place_url" placeholder='url'
             value={addPlace.place_url}
             onChange={onAddChangeFn}/>
        </li>
        <li>
          <input type="text" name="road_address_name" id="road_address_name" placeholder='도로 주소'
             value={addPlace.road_address_name}
             onChange={onAddChangeFn}/>
        </li>
        <li>
          <input type="text" name="x" id="x" placeholder='x'
             value={addPlace.x}
             onChange={onAddChangeFn}/>
        </li>
        <li>
          <input type="text" name="y" id="y" placeholder='y'
             value={addPlace.y}
             onChange={onAddChangeFn}/>
        </li>
        <li>
          <button  onClick={onAddFn} >주문처 추가</button> 
          <button onClick={backFn}>닫기</button>       
        </li>
      </ul>
    </div>
  </div>
    </>
)
}

export default AdminOrderPlaceModal3