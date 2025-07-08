import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import AdminProductDetailModal2 from './AdminProductDetailModal2';
import { localhost } from '../../api/CommonAPI';
const productData={
    id:"",
    title:"",
    price:"",
    age:"",
    year:"",
    genre:"",
    time:"",
    comment:"",
    img:""
    }
const AdminProductDetailModal = ({setProductModal}) => {
    const [update,setUpdate]=useState(productData)
    const [productModal2, setProductModal2] = useState(false);
    const [postImg, setPostImg] = useState('');
    const [previewImg, setPreviewImg] = useState([]);
    const onProductModal2Fn = () => {
      setProductModal2(true);
     
      }
    const param = useParams()
    const navigate=useNavigate()
    const ref = useRef(null);

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
    
    const onUpdateChangeFn= (e) =>{
        const name=e.target.name
        const value=e.target.value

        setUpdate({
            ...update,
            [name]:value
        })
    }
    
        const closeFn =() =>{
            setProductModal(false)
        }
        const UpdateFn = async () => {
            if (window.confirm("수정 하시겠습니까??")){
            axios.put(`http://${localhost}:3001/allItems/${param.id}`,update); 
            // setProduct(product.filter((product) => product.id !== id)); 
            navigate(-1)
            alert('수정완료');
            }else {

                alert("취소합니다.");
            }
          };
          const [product,setProduct] = useState({})
          
          useEffect(()=>{
            const productDetailFn = async () =>{
                // const productId = param.param.id
                    try{
                        const res = await axios.get(`http://${localhost}:3001/allItems/${param.id}`)
                        console.log(res.data, 'data')
                         setUpdate(res.data)                
                    }catch (err) {
                        alert(err)
                      }
                }
                productDetailFn()
        },[])
  return (
    <>
    {productModal2 && (
        <AdminProductDetailModal2 update={update} setProductModal2={setProductModal2} />
    )}
    <div className="update-product">
    <div className="update-product-con">
    <span className='close' onClick={closeFn}>x</span>
      <h1>상품수정</h1>
      <ul>
        <li>
          <input type="text" name="title" id="title" placeholder='제목'
             value={update.title}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="price" id="price"  placeholder='가격'
            value={update.price}
            onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="age" id="age" placeholder='연령대'
             value={update.age}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="year" id="year" placeholder='년도'
             value={update.year}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="genre" id="genre" placeholder='장르'
            value={update.genre}
            onChange={onUpdateChangeFn}/>
        </li>
        <li>
          <input type="text" name="time" id="time" placeholder='상영시간'
            value={update.time}
            onChange={onUpdateChangeFn} />
        </li>
        <li>
          <input type="text" name="comment" id="comment" placeholder='내용'
             value={update.comment}
             onChange={onUpdateChangeFn}/>
        </li>
        <li>
            <input multiple type="file" accept='image/jpg,image/png,image/jpeg,image/webp' name='img'
            onChange={uploadFile}
            className='s1' />
        </li>

        <li>
          <select name="type" id="type"value={update.type}
             onChange={onUpdateChangeFn}>
            <option value='영화'>영화</option>
            <option value="드라마">드라마</option>
            <option value="애니메이션">애니메이션</option>
            <option value="웹툰">웹툰</option>
          </select>
        </li>
        <li>
          <button  onClick={onProductModal2Fn} >수정하기</button>        
        </li>
      </ul>
    </div>
  </div>
</>
  )
}

export default AdminProductDetailModal