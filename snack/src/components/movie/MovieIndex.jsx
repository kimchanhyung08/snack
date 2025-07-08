import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderMovieModal from "./MovieModal.jsx";
import MovieModal from "./MovieModal.jsx";
import { localhost } from "../../api/CommonAPI.jsx";
const movieListData = {
  id: 0,
  main_num: 0,
  genre: "",
  title: "",
  comment: "",
  price: "",
  img: "",
  age:"",
  year:"",
  time:""

};
const MovieIndex = () => {
  const [movieList, setMovieList] = useState([]);

  const [movieModal, setMovieModal] = useState(false);
  const [modalitem, setModalitem] = useState(movieListData);
  const onMovieModalFn = (e) => {
    const litag = e.target.parentElement;
    const imgSrc = litag.children[0].getAttribute("src");
    const eId = e.currentTarget.getAttribute("data-id");
    const title = e.currentTarget.getAttribute("data-title");
    const comment = e.currentTarget.getAttribute("data-comment");
    const price = e.currentTarget.getAttribute("data-price");
    const genre = e.currentTarget.getAttribute("data-genre");
    const age = e.currentTarget.getAttribute("data-age");
    const year = e.currentTarget.getAttribute("data-year");
    const time = e.currentTarget.getAttribute("data-time");
    const type = e.currentTarget.getAttribute("data-type");

    console.log(modalitem)


    setModalitem({
      id: parseInt(eId),
      genre: genre,
      title: title,
      img: imgSrc,
      comment: comment,
      price: price,
      age:age,
      year:year,
      time:time,
      type:type
    });
    setMovieModal(true);
  };

  useEffect(() => {
    const axiosFn1 = async () => {
      try {
        const res = await axios.get(`http://${localhost}:3001/allItems`);
        console.log(res.data);
        setMovieList(res.data);
      } catch (err) {
        alert(err);
      }
    };
    axiosFn1();
  }, []);

  return (
    <>
      {movieModal && (
        <MovieModal modalitem={modalitem} setMovieModal={setMovieModal} />
      )}
      <div className="movie">
        <div className="movie-con">
          <h1>영화</h1>
          <hr />
          <div className="comedy">
            <h1>코미디</h1>
            <ul>
              {movieList &&
                movieList.map((el, index) => {
                  if (el.type === "영화" && el.genre === "코미디") {
                    return (
                      <li key={index}>
                        <div className="image">
                          <img
                            src={`/images/itemData/${el.img}`}
                            alt={el.img}
                            onClick={onMovieModalFn}
                            key={index}
                            data-id={el.id}
                            data-genre={el.genre}
                            data-title={el.title}
                            data-comment={el.comment}
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
          <div className="action">
            <h1>액션</h1>
            <ul>
              {movieList &&
                movieList.map((el, index) => {
                  if (el.type === "영화" && el.genre === "액션") {
                    return (
                      <li key={index}>
                        <div className="image">
                          <img
                            src={`/images/itemData/${el.img}`}
                            alt={el.img}
                            onClick={onMovieModalFn}
                            key={index}
                            data-id={el.id}
                            data-genre={el.genre}
                            data-title={el.title}
                            data-comment={el.comment}
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
          <div className="fantazy">
            <h1>판타지</h1>
            <ul>
              {movieList &&
                movieList.map((el, index) => {
                  if (el.type === "영화" && el.genre === "판타지") {
                    return (
                      <li key={index}>
                        <div className="image">
                          <img
                            src={`/images/itemData/${el.img}`}
                            alt={el.img}
                            onClick={onMovieModalFn}
                            key={index}
                            data-id={el.id}
                            data-genre={el.genre}
                            data-title={el.title}
                            data-comment={el.comment}
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
          <div className="thriller">
            <h1>스릴러</h1>
            <ul>
              {movieList &&
                movieList.map((el, index) => {
                  if (el.type === "영화" && el.genre === "스릴러") {
                    return (
                      <li key={index}>
                        <div className="image">
                          <img
                            src={`/images/itemData/${el.img}`}
                            alt={el.img}
                            onClick={onMovieModalFn}
                            key={index}
                            data-id={el.id}
                            data-genre={el.genre}
                            data-title={el.title}
                            data-comment={el.comment}
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
  );
};

export default MovieIndex;
