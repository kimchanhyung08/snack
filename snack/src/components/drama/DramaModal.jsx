import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCart } from '../../slice/cartslice'
import { useNavigate } from 'react-router-dom'
import { addPayment } from '../../slice/paymentSlice'
import CartModal from '../modal/CartModal'
import { itemThunk } from '../../slice/itemSlice'
import { localhost } from '../../api/CommonAPI'

const item={
  id: 0,
  title:'',
  price:'',
  img:'',
  genre:''
}

const DramaModal = ({modalItem,setModalItem,setDramaModal,clickOutModal,modalRef}) => {
  const [isCartModal,setIsCartModal]=useState(false)
  const items=useSelector(state=>state.item.items)
  const closeFn = () => {
    setDramaModal(false)
  }  
  const [modalList,setModalList]=useState(item)
  const [count,setCount]=useState(1)
  useEffect(()=>{
    const type='드라마'
    dispatch(itemThunk(type))
    const axFn= async()=>{
      try{
        const res=await axios.get(`http://${localhost}:3001/allItems?id=${modalItem.id}`)
        setModalList(res.data[0])   
      }
      catch(err){alert(err)}
    }
    axFn()
  },[modalItem])
  console.log(setModalItem)    
  const modalInFn=(e)=>{
    console.log(e.target.id)
    setModalItem({
      id:parseInt(e.target.id)
    })
  }
  const dramaCart={
    id: modalList.id,
    type: modalList.type,
    title: modalList.title,
    price: modalList.price,
    img: `/images/itemData/${modalList.img}`,
    genre: modalList.genre,
    age: modalList.age,
    year: modalList.year,
    time: modalList.time,
    count: count,
    comment: modalList.comment, 
  }
  const dispatch=useDispatch()
  const addCartFn=()=>{
    dispatch(addCart(dramaCart))
    // alert('장바구니에 추가')
    setIsCartModal(true)
  }
  const addPayementFn = () => {
    dispatch(addPayment(dramaCart));
    alert("구매페이지로 이동합니다.");
    navigate("/paymentIndex?type=buy");
  };
  const navigate=useNavigate()
  const addCart2Fn=()=>{
    navigate('/cart')
  }
  const increFn=()=>{
    setCount(count+1)
  }
  const decreFn=()=>{
    count<=1 ? setCount(1) : setCount(count-1) 
  }
  return (
    <>
      {isCartModal ?<CartModal setIsCartModal={setIsCartModal} setDramaModal={setDramaModal}/>:<></>}
      <div className="dramaModal" onClick={(e)=>{clickOutModal(e)}} ref={modalRef}>
        <div className="dramaModal-con">
          <div className="item">
            <span className='close' onClick={closeFn}>✕</span>
            <div className="top">
               <img className='modalImg' src={`/images/itemData/${modalList.img}`} alt={modalList.img} />
               <span className='title'>
                <img src={`/images/itemLogo/${modalList.logoImg}`} alt={modalList.logoImg} />
               </span>
            </div>
            <div className="bottom">
              <div className="detail">
                <ul>
                <li>{modalList.age}</li>
                  <li>·</li>
                  <li>{modalList.year}</li>
                  <li>·</li>
                  <li>{modalList.genre}</li>
                  <li>{modalList.price}원</li>
                </ul>
              </div>
              <div className="cartBtn">
                <button onClick={addPayementFn}>구매하기</button>
                <button onClick={addCartFn}>
                  <img src="/images/common/cart_icon.svg" alt="cart" />
                  <span>
                    장바구니
                  </span>
                </button>
              </div>
              <div className="price">
                <div className="itemCount">
                  <button onClick={decreFn}>-</button>
                  <span>{count}</span>
                  <button onClick={increFn}>+</button>
                </div>
                <span>총 금액: {modalList.price * count}원</span>
              </div>
              <div className="comment">
                <span>{modalList.comment}</span>
              </div>
            </div>
            <div className="recommend">
              <span className='item'>추천작품</span>
              <ul>
                {items&&items.filter(el=>el.genre===modalList.genre).map((el,idx)=>{
                  return(
                    <li key={idx}>
                      <img src={`/images/itemData/${el.img}`} alt={el.img} id={el.id}
                      onClick={modalInFn}/>
                      <div className="reco-detail">
                        <span>{el.title}</span>
                        <span>{el.comment}</span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DramaModal