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


  const movieBanner = [];
const SubMovie = () => {
    const [movieList, setMovieList] = useState([]);
    useEffect(() => {
        const axiosFn = async () => {
          
          try {
            const res = await axios.get(`http://${localhost}:3001/allItems`);
            console.log(res.data);
           
            setMovieList(res.data);
           
         
            
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
      if (movieList && movieList.length > 0) {
        const movieListItemsOnly = movieList.filter((el) => el.type === "영화");
    
        while (
          movieBanner.length < 5 &&
          movieBanner.length < movieListItemsOnly.length
        ) {
          const random = Math.floor(Math.random() * movieListItemsOnly.length);
          if (!movieBanner.includes(movieListItemsOnly[random])) {
            movieBanner.push(movieListItemsOnly[random]);
          }
        }
      }
      
  return (
    <>
     {mainModal && (
        <MainModal modalitem={modalitem} setMainModal={setMainModal} />
      )}
    <div className="main-movie">
            <div className="main-movie-con">
              <div className="top">
                <ul>
                  <li>영화</li>
                  <li>
                    <Link to={"movie"}>더보기</Link>
                  </li>
                </ul>
              </div>
              <div className="bottom">
                <ul>
                  {movieBanner &&
                    movieBanner.map((el, index) => {
                      if (el.type === "영화") {
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

export default SubMovie