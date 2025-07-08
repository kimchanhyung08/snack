import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCart } from '../../slice/cartslice'
import MovieModal1 from './MovieModal1'
import { addPayment } from "../../slice/paymentSlice";
import { useNavigate } from 'react-router-dom'
import { localhost } from '../../api/CommonAPI'
const movietData ={
    id:0,
    title:'',
    comment:'',
    price:'',
    img:''
  }
  const mainMo = [];
  
const MovieModal = ({modalitem,setMovieModal}) => {
  const navigate = useNavigate()
  const [modalitem1,setModalitem1]=useState(modalitem)
  const [modalmovieCount, setModalmovieCount] = useState(1);
  const [moviemodal1, setMovieModal1] = useState(false);
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
  
  const movieModalFn = (e) => {

    ref2.current.style = "display: flex;"

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
    setMovieModal(true);
    console.log(modalitem1)
  };


  const movieModal1Fn = () => {
    setMovieModal1(true);
  }
    const closeFn =() =>{
        setMovieModal(false)
    }
    const incrementFn = () => {
      setModalmovieCount(modalmovieCount+1);
    }
  
    const decrementFn = () => {
      setModalmovieCount(modalmovieCount - 1);
      modalmovieCount <= 1 ? setModalmovieCount(1) : setModalmovieCount(modalmovieCount - 1);
    };

    // useEffect(()=>{
    //     const axiosFn1=async ()=>{
    //       try{
    //         //   const res = await axios.get(`http://${localhost}:3001/comedy`,{id:"id값"})
    //           const res = await axios.get(`http://${localhost}:3001/comedy`,{ params: { id:  }}) // { params: { answer: 42 }
    //         //   const res = await axios.get(`http://${localhost}:3001/comedy?id=${}`)
    //           console.log(res.data)
    //       }catch(err){
    //         alert(err)
    //       }
    //     }
    //     axiosFn1()
    //   },[])
    const dispatch=useDispatch()
    const movieCart={
      id : modalitem1.id,
    price: modalitem1.price,
    title: modalitem1.title,
    img: modalitem1.img,
    type: modalitem1.type,
    count:modalmovieCount
    
    //count 개수 데이터 추가
    }
    const addCartFn=()=>{
      
      
      dispatch(addCart(movieCart))
       movieModal1Fn()
    }
    const addPayementFn = () => {
      dispatch(addPayment(movieCart));
      navigate("/paymentIndex?type=buy");
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
    console.log(modalitem1.img,'huhuh')
  return (
  <>
   {moviemodal1 ? (<MovieModal1 setMovieModal1={setMovieModal1}/>):(<></>)}
    <div className="movieModal">
        <div className="movieModal-con">
            <span className='close'
            
            onClick={closeFn}>x
            </span>
            <div className="top" ref={ref2}>
                <img src={`/images/itemData/${modalitem1.img}`} alt={modalitem1.img} />
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
            <div className="movie-payment">
                <li className='payment' onClick={addPayementFn}>결제하기</li>
                <li className='cart' onClick={addCartFn}>장바구니</li>
             <div className="movieCount">
                  <button onClick={decrementFn}>-</button>
                  <span>{modalmovieCount}</span>
                  <button onClick={incrementFn}>+</button>
            </div>
                </div>
            <div className="movie-comment">

            <span>{modalitem1.comment}</span>
            </div>
            <div className="movie-price">

            <span><li>총금액: {modalitem1.price*modalmovieCount}원</li></span>
            </div>

            <div className="sub-moviemodal">
              <div className="sub-moviemodal-con">
                <span>추천 리스트</span>
              <ul>
                {mainMo &&
                  mainMo.map((el, idx) => {
                    return (
                      <li key={idx} data-id={el.id} onClick={movieModalFn} >
                        <div className="itemImg">
                          <img
                            src={`/images/itemData/${el.img}`}
                            alt={el.img}
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

export default MovieModal