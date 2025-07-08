import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCart } from '../../slice/cartslice'
import MainModal1 from './MainModal1'
import { addPayment } from "../../slice/paymentSlice";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { localhost } from '../../api/CommonAPI';
const movietData ={
    id:'',
    title:'',
    price:'',
    img:'',
    comment:''
  }
  const mainMo = [];

const MainModal = ({modalitem,setMainModal}) => {


  const navigate = useNavigate()
  const [modalitem1,setModalitem1]=useState(modalitem)
  const [modalmainCount, setModalmainCount] = useState(1);
  const [mainmodal1, setMainModal1] = useState(false);
  const [mainItem, setMainItem] = useState([]);

  useEffect(() => {
    const axiosFn = async () => {
      
      try {
        const res = await axios.get(`http://${localhost}:3001/allItems`);
        console.log(res.data);
       
        setMainItem(res.data);
       
     
        
      } catch (err) {
        alert(err);
      }
    };
    axiosFn();
  },[]);
  const ref=useRef()
  const ref2=useRef()
  const ref3=useRef()

  const mainModalFn = (e) => {

    ref2.current.style = "display: flex;  width: 30vw; height: 350px;  flex-direction: column; justify-content: center; align-items: center;  box-sizing: border-box;  overflow: hidden; border-radius: 20px;"
 
    ref.current.style = "display: none;"

   const eId = e.currentTarget.getAttribute("data-id");

   console.log(eId)
   setMainItem({
     id: parseInt(eId),
   });

   const axiosFn = async () => {
     try {
       const res = await axios.get(
         `http://${localhost}:3001/allItems?id=${eId}`
       );
       console.log(res.data[0])

       setModalitem1(res.data[0]);
     } catch (err) {
       alert("데이터가 없습니다. 네트워크 상태를 확인해주세요.");
     }
   };
   axiosFn();

   // setMovieModal(false);
   setMainModal(true);
   console.log(modalitem1)
 };


  const mainModal1Fn = () => {
    setMainModal1(true);
  }
    const closeFn =() =>{
        setMainModal(false)
    }
    const dispatch=useDispatch()
    const mainCart={
      id : modalitem1.id,
    price: modalitem1.price,
    title: modalitem1.title,
    img: modalitem1.img,
    type: modalitem1.type,
    count:modalmainCount
    //count 개수 데이터 추가
    }
    const addCartFn=()=>{
      dispatch(addCart(mainCart))
      mainModal1Fn()
    }
    const addPayementFn = () => {
      dispatch(addPayment(mainCart));
      navigate("/paymentIndex?type=buy");
    };
    const incrementFn = () => {
      setModalmainCount(modalmainCount+1);
    }
  
    const decrementFn = () => {
      setModalmainCount(modalmainCount - 1);
      modalmainCount <= 1 ? setModalmainCount(1) : setModalmainCount(modalmainCount - 1);
    };

    if (mainItem && mainItem.length > 0) {
      const mainItemsOnly = mainItem.filter((el) => el.type === modalitem.type);
  
      while (
        mainMo.length < 4 &&
        mainMo.length < mainItemsOnly.length
      ) {
        const random = Math.floor(Math.random() * mainItemsOnly.length);
        if (!mainMo.includes(mainItemsOnly[random])) {
          mainMo.push(mainItemsOnly[random]);
        }
      }
    }
   
    
  return (
  <>
  {mainmodal1 ? (<MainModal1 setMainModal1={setMainModal1}/>):(<></>)}
    <div className="mainModal">
        <div className="mainModal-con">
            <span className='close'
            
            onClick={closeFn}>x
            </span>
            <div className="top" ref={ref2}>
                <img src={`/images/itemData/${modalitem1.img}`} alt={modalitem1.img} ref={ref3} />
            </div>
            <div className="top2" ref={ref}>
                <img src={modalitem1.img} alt={modalitem1.img} />
            </div>
                <div className="top-title">
            <span>{modalitem1.title}</span>

                </div>
            <div className="bottom">
            <li>{modalitem1.age}</li>
            <span>·</span>
            <li>{modalitem1.year}</li>
            <span>·</span>  
            <li>{modalitem1.genre}</li>
            <span>·</span>
            <li>{modalitem1.time}</li>
                  </div>
            <div className="main-payment">
                <li className='payment' onClick={addPayementFn}>결제하기</li>
                <li className='cart' onClick={addCartFn}>장바구니</li>
             <div className="mainCount">
                  <button onClick={decrementFn}>-</button>
                  <span>{modalmainCount}</span>
                  <button onClick={incrementFn}>+</button>
            </div>
                </div>
            <div className="main-comment">

            <span>{modalitem1.comment}</span>
            </div>
            <div className="main-price">

            <span><li>총금액: {modalitem1.price*modalmainCount}원</li></span>
            </div>

            <div className="sub-mainmodal">
              <div className="sub-mainmodal-con">
              <span>추천 리스트</span>
              <ul>
                {mainMo &&
                  mainMo.map((el, idx) => {
                    return (
                      <li key={idx} data-id={el.id} onClick={mainModalFn} >
                        <div className="itemImg">
                          <img
                            src={`/images/itemData/${el.img}`}
                            alt={el.img}
                            // onClick={onMainModalFn}
                            data-id={el.id}
                            data-comment={el.comment}
                            data-title={el.title}
                            data-price={el.price}
                            data-age={el.age}
                            data-year={el.year}
                            data-time={el.time}
                            data-type={el.type}
                          />
                          <div className="item-detail">

                          <span>{el.title}</span>
                          <span>{el.comment}</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            </div>
            </div>
            
            </>

  )
  
}

export default MainModal