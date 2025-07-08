import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminAddModal1 from './AdminAddModal1'
import AdminAddmodal2 from './AdminAddmodal2'
import AdminAddModal3 from './AdminAddModal3'
import { localhost } from '../../api/CommonAPI'

const addProductData ={
    title:"",
    price:"",
    age:"",
    year:"",
    genre:"",
    time:"",
    comment:"",
    type:""


}


    const AdminAddProduct = () => {
    const [add,setAdd]=useState(addProductData)
  const [addmodal1, setAddmodal1] = useState(false);
  const [addmodal2, setAddmodal2] = useState(false);
  const [addmodal3, setAddmodal3] = useState(false);
  const [contents, setContents] = useState("")


    const [postImg, setPostImg] = useState('');
    const [previewImg, setPreviewImg] = useState([]);
    const navigate=useNavigate()

    const addModal1Fn = () => {
      setAddmodal1(true);
    }
    const addModal2Fn = (contents) => {
      setContents(contents)
      setAddmodal2(true);
    }
    const addModal3Fn = () => {
      setAddmodal3(true);
    }
  
    function uploadFile(e) {
        let fileArr = e.target.file[0];
        setPostImg(fileArr);

        let fileRead = new FileReader();
        fileRead.onload = function() {
            setPreviewImg(fileRead.result);
        };
        if(fileArr && fileArr.type.match('image.*')){
            fileRead.readAsDataURL(fileArr);
        }
    }
    const onAddChangeFn= (e) =>{
        const name=e.target.name
        const value=e.target.value

        setAdd({
            ...add,
            [name]:value
        })
    }
    const onAddFn = (e) =>{
    const addAxiosFn = async (e) =>{
        const res = await axios.get(`http://${localhost}:3001/allItems`)

        const num = res.data.findIndex(el=>{
            return el.title === add.title
        })

        if(num != -1){
            addModal1Fn()
            // alert("제목을 바꿔주세요")
            return
        }else if(add.title===""){
            addModal2Fn('f1')
            // alert("제목을 입력해주세요")

          return
        }else if(add.price===""){
          addModal2Fn('f2')
          // alert("제목을 입력해주세요")

        return
      }
      else if(add.age===""){
        addModal2Fn('f3')
        // alert("제목을 입력해주세요")

      return
    }
    else if(add.year===""){
      addModal2Fn('f4')
      // alert("제목을 입력해주세요")

    return
  }
  else if(add.genre===""){
    addModal2Fn('f5')
    // alert("제목을 입력해주세요")

  return
}
else if(add.time===""){
  addModal2Fn('f6')
  // alert("제목을 입력해주세요")

return
}
else if(add.comment===""){
  addModal2Fn('f7')
  // alert("제목을 입력해주세요")

return
}
else if(add.type===""){
  addModal2Fn('f8')
  // alert("제목을 입력해주세요")

return
}
        else{
            addModal3Fn()
        // const addOk = await axios.post(`http://${localhost}:3001/allItems`,add)
       
        // alert('상품추가 성공')
        }
    }
    addAxiosFn()

    }

  return (
    <>
    {addmodal1 ? (<AdminAddModal1 setAddmodal1={setAddmodal1}/>):(<></>)}
    {addmodal2 ? (<AdminAddmodal2 contents={contents} setAddmodal2={setAddmodal2}/>):(<></>)}
    {addmodal3 &&(<AdminAddModal3  add={add} setAddmodal3={setAddmodal3}/>)}
    <div className="add-product">
    <div className="add-product-con">
      <h1>상품추가</h1>
      <ul>
        <li>
          <input type="text" name="title" id="title" placeholder='제목'          
             value={add.title}
             onChange={onAddChangeFn}/>
        </li>
        <li>
          <input type="text" name="price" id="price" placeholder='가격'
            value={add.price}
            onChange={onAddChangeFn}/>
        </li>
        <li>
          <input type="text" name="age" id="age" placeholder='연령대'
             value={add.age}
             onChange={onAddChangeFn}/>
        </li>
        <li>
          <input type="text" name="year" id="year" placeholder='년도'
             value={add.year}
             onChange={onAddChangeFn}/>
        </li>
        <li>
          <input type="text" name="genre" id="genre" placeholder='장르'
            value={add.genre}
            onChange={onAddChangeFn} />
        </li>
        <li>
          <input type="text" name="time" id="time" placeholder='상영시간'
            value={add.time}
            onChange={onAddChangeFn} />
        </li>
        <li>
          <input type="text" name="comment" id="comment" placeholder='내용'
             value={add.comment}
             onChange={onAddChangeFn}/>
        </li>
        <li>
            <input multiple type="file" accept='image/jpg,image/png,image/jpeg,image/webp' name='img'
            onChange={uploadFile}
            className='s1' />
        </li>

        <li>
          <select name="type" id="type"value={add.type}
             onChange={onAddChangeFn}>
            <option value="">----</option>
            <option value="영화">영화</option>
            <option value="드라마">드라마</option>
            <option value="애니메이션">애니메이션</option>
            <option value="웹툰">웹툰</option>
          </select>
        </li>
        <li>
          <button  onClick={onAddFn} >상품추가</button>        
        </li>
      </ul>
    </div>
  </div>
</>
  )

}

export default AdminAddProduct