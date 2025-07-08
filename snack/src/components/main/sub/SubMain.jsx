import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MainModal from "../MainModal";
import { localhost } from "../../../api/CommonAPI";

const mainListData = {
    id: "",
    main_num: "",
    genre: "",
    title: "",
    comment: "",
    price: "",
    img: "",
  };
  const mainBanner =[];


const SubMain = () => {
    const length = mainBanner.length;


    const nextSlide = () => {
      num > 6 ? setNum(0) : setNum(num => num + 1)
      const gab = gab1
      const goto = (gab * num) + 'px'
      gallery.current.style.left = goto;
      gallery.current.style.transition = 'all 0.3s'
      setNum(num === length - 1 ? 0 : num + 1);
      // console.log('dsasa')
    };
    const prevSlide = () => {
      num > 6 ? setNum(0) : setNum(num => num + 1)
      const gab = gab1
      const goto = (gab * num) + 'px'
      gallery.current.style.left = goto;
      gallery.current.style.transition = 'all 0.3s'
      setNum(num === 0 ? length - 1 : num - 1);
      // console.log('dsasa')
    };
  
  
  
    
    const [mainList, setMainList] = useState([]);
    const [num, setNum] = useState(0)
    const [gab1, setGab1] = useState(0)
    const gallery = useRef()
    const [mainModal, setMainModal] = useState(false);
    const [modalitem, setModalitem] = useState(mainListData);

    
    const onMainModalFn = (e) => {
      const litag = e.target.parentElement;
      const imgSrc = litag.children[0].getAttribute("src");
      const eId = e.currentTarget.getAttribute("data-id");
      const title = e.currentTarget.getAttribute("data-title");
      const price = e.currentTarget.getAttribute("data-price");
      const genre = e.currentTarget.getAttribute("data-genre");
      const comment = e.currentTarget.getAttribute("data-comment");
      const age = e.currentTarget.getAttribute("data-age");
      const year = e.currentTarget.getAttribute("data-year");
      const time = e.currentTarget.getAttribute("data-time");
    const type = e.currentTarget.getAttribute("data-type");

      setModalitem({
        id: parseInt(eId),
        genre: genre,
        title: title,
        img: imgSrc,
        price: price,
        comment: comment,
        age: age,
        year: year,
        time: time,
      type:type

      });
      setMainModal(true);
    };
  
    const autoGallery = () => {
      num > 6 ? setNum(0) : setNum(num => num + 1)
      const gab = gab1
      const goto = (gab * num) + 'px'
      gallery.current.style.left = goto;
      gallery.current.style.transition = 'all 1s'
    }
  
    let setln;
    
  
  
    useEffect(() => {
      const axiosFn = async () => {
        try {
          const res = await axios.get(`http://${localhost}:3001/allItems`);
        
          setMainList(res.data);
        } catch (err) {
          alert(err);
        }
      };
      axiosFn();
      setGab1(-500)
      
    console.log(gallery.current.children[0].children[0],'child0')
    console.log(gallery.current.children[0].children[1],'child1');
    gallery.current.children[0].children[0] && setGab1(gallery.current.children[0].children[0].offsetLeft - gallery.current.children[0].children[1].offsetLeft)

      num > 6 ? setNum(0) : <></>
      setln = setInterval(autoGallery, 4000)
      return () => clearInterval(setln)
    }, [num])
  
    while (
      mainBanner.length < 9 &&
      mainBanner.length < mainList.length
    ) {
      const random = Math.floor(Math.random() * mainList.length);
      if (!mainBanner.includes(mainList[random])) {
        mainBanner.push(mainList[random]);
      }
    }


  return (

    <>
          {mainModal && (
        <MainModal modalitem={modalitem} setMainModal={setMainModal} />
      )}
    <div className="maintop">
            <div className="maintop-con">
             
                <span className="leftBtn"onClick={prevSlide}><img src="images/icon/pngwing.com.png" alt="" width = '40px'   height = '35px'/></span>
                <span className="rightBtn"onClick={nextSlide}><img src="images/icon/pngwing.com.png" alt="" width = '40px'   height = '35px'/></span>

              
              <div className="gallery" ref={gallery}>
                <ul>
                {mainBanner &&
                    mainBanner.map((el, index) => {
                       {
                        return (
                          <li key={index}>
                            <div className="image">
                              <img
                                src={`/images/itemData/${el.img}`}
                                alt={el.img}
                                onClick={onMainModalFn}
                                key={index}
                                data-id={el.id}
                                data-comment={el.comment}
                                data-title={el.title}
                                data-price={el.price}
                                data-age={el.age}
                                data-year={el.year}
                                data-time={el.time}
                                 data-type={el.type}

                              />
                            </div>
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>
            </div>
          </div>
    </>
  )
}

export default SubMain