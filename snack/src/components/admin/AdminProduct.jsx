import axios, { all } from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminProductDetail from './AdminProductDetail'
import { localhost } from '../../api/CommonAPI'

// const productData={
//   type:""
// }

const AdminProduct = () => {

  const [type,setType]=useState('all')
  const[itemList,setItemList]=useState([])


  useEffect(()=>{
    const axiosFn=async()=>{
      try{
        const res = await axios.get(`http://${localhost}:3001/allItems`)
      setItemList(res.data)
    }catch(err){
      alert(err)
    }
  }
  axiosFn()
},[])
    const navigate = useNavigate()


    const productDetailFn = (elId) => {
      // const eId = e.currentTarget.getAttribute('data-id')
       //여기 부분에 값 안들어감           
      navigate(`/admin/product/detail/${elId}`)
      
    }
    const onTypeChangeFn= (e) =>{
      // setType(e.target.value)

      const axiosFn=async()=>{
        try{
          if(e.target.value==='all' ){
            const res = await axios.get(`http://${localhost}:3001/allItems`)
            setItemList(res.data)
          }else{
            const res = await axios.get(`http://${localhost}:3001/allItems?type=${e.target.value}`)
            setItemList(res.data)
          }
        }catch(err){
          alert(err)
        }
      }
      axiosFn()
  }
  
  return (
    <>
      <div className="admin-product">
        <div className="admin-product-con">
          <h1>제품 리스트</h1>
          <div className="product">
            <div className="title">
              <span>번호</span>
              <span>장르</span>
              <span>사진</span>
              <span>제목</span>
              <span>가격</span>
              <span>보기</span>          
            </div>
            <div className="option">
            <li>
          <select name="type" id="type" value={type.type}
             onChange={onTypeChangeFn}>
            <option value='all'>전체</option>
            <option value='영화'>영화</option>
            <option value="드라마">드라마</option>
            <option value="애니메이션">애니메이션</option>
            <option value="웹툰">웹툰</option>
          </select>
        </li>
            </div>
            <div className="allItem-list">
            <ul>
              {itemList && itemList.map((el, idx) => {   
                    // if(el.type === type.type) {
                            return (
                              <li key={idx} >
                                <span>{el.id}</span>
                                <span>{el.genre}</span>
                                <span> <img src={`/images/itemData/${el.img}`}/></span>                  
                                <span>{el.title}</span>
                                <span>{el.price}</span>
                                <span onClick={()=>{
                                  productDetailFn(el.id)
                                }} ><li>보기</li></span>
                              </li>
                            )
                            
            // }  
  
  


})}
            </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminProduct