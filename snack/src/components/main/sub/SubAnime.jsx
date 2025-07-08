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


  const animeBanner = [];
const SubAnime = () => {

    const [animeList, setAnimeList] = useState([]);
    useEffect(() => {
        const axiosFn = async () => {
          
          try {
            const res = await axios.get(`http://${localhost}:3001/allItems`);
            console.log(res.data);
           
            setAnimeList(res.data);
           
         
            
          } catch (err) {
            alert(err);
          }
        };
        axiosFn();
      },[]);
    
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
          age:age,
          year:year,
          time:time,
          type:type

        });
        setMainModal(true);
      };
      if (animeList && animeList.length > 0) {
        const animeListItemsOnly = animeList.filter((el) => el.type === "애니메이션");
    
        while (
          animeBanner.length < 5 &&
          animeBanner.length < animeListItemsOnly.length
        ) {
          const random = Math.floor(Math.random() * animeListItemsOnly.length);
          if (!animeBanner.includes(animeListItemsOnly[random])) {
            animeBanner.push(animeListItemsOnly[random]);
          }
        }
      }
  return (
   <>
    {mainModal && (
        <MainModal modalitem={modalitem} setMainModal={setMainModal} />
      )}
    <div className="main-anime">
            <div className="main-anime-con">
              <div className="top">
                <ul>
                  <li>애니메이션</li>
                  <li>
                    <Link to={"anime"}>더보기</Link>
                  </li>
                </ul>
              </div>
              <div className="bottom">
                <ul>
                  {animeBanner &&
                    animeBanner.map((el, index) => {
                      if (el.type === "애니메이션") {
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

export default SubAnime