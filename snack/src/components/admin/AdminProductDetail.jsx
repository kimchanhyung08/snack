import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AdminProductDetailModal from './AdminProductDetailModal'
import AdminProductDetailModal1 from './AdminProductDetailModal1'
import { localhost } from '../../api/CommonAPI'
// const productData={
// id:"",
// title:"",
// price:"",
// age:"",
// year:"",
// genre:"",
// time:"",
// comment:"",
// img:""
// }

const AdminProductDetail = () => {
    const param=useParams()
    const [productModal, setProductModal] = useState(false);
    const [productModal1, setProductModal1] = useState(false);
    
    const onProductModalFn = () => {
    setProductModal(true);
    
    }
    const onProductModal1Fn = () => {
        setProductModal1(true);
        
        }
    console.log(param)
    const [product,setProduct] = useState({})
    const navigate= useNavigate()
    

    useEffect(()=>{
        const productDetailFn = async () =>{
            // const productId = param.param.id
                try{
                    const res = await axios.get(`http://${localhost}:3001/allItems/${param.id}`)
                    console.log(res.data, 'data')
                     setProduct(res.data)                
                }catch (err) {
                    alert(err)
                  }
            }
            productDetailFn()
    },[])
    

    // const DeleteFn = async () => {
    //     if (window.confirm("삭제 하시겠습니까??")) {
    //         axios.delete(`http://${localhost}:3001/allItems/${param.id}`); 
    //         // setProduct(product.filter((product) => product.id !== id)); 
    //         navigate(-1)
    //         alert("삭제되었습니다.");
    //     } else {

    //         alert("취소합니다.");
    //     }
    //   };

    
  return (
    <>
    {productModal && (
        <AdminProductDetailModal  setProductModal={setProductModal} />
    )}
    {productModal1 && (
        <AdminProductDetailModal1  setProductModal1={setProductModal1} />
    )}
    <div className="product-detail">
        <div className="product-detail-con">
            <div className="top">
                <img src={`/images/itemData/${product.img}`} alt="{product.img}"/>
                </div>
               <div className="bottom">
                <li>
                  <h1>제목:{product.title}</h1>
                </li>
                <li>
                    분류:{product.type}
                </li>
                <li>
                    가격:{product.price}원
                </li>
                <li>
                    시청연령:{product.age}세
                </li>
                <li>
                    출시년도:{product.year}년
                </li>
                <li>
                    장르:{product.genre}
                </li>
                <li>
                    상영시간:{product.time}
                </li>
                <li>
                    내용: {product.comment}
                </li>
                <div className="button">

                <li><button onClick={onProductModalFn}>수정하기</button></li>
                <li>
                    <button onClick={onProductModal1Fn}>삭제하기</button></li>
               </div>

                </div>
            </div>
       
    </div>
    </>
  )
}

export default AdminProductDetail