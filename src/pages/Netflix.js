import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TopNav from "../componenets/TopNav";
//import Card from "../componenets/Card";
import { fetchMovies, getGenres } from "../store";
import SliderContainer from "../componenets/SliderContainer";

const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  const movies = useSelector((state)=> state.netflix.movies)
  const generesLoaded = useSelector((state)=>state.netflix.generesLoaded)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, );

  useEffect(() => {
        if(generesLoaded){
          dispatch(fetchMovies({type: "all"}))
        }
  });

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  // console.log(movies)

  return (
    <HeroContainer>
      <div className="hero">
        <TopNav isScrolled={isScrolled} />
        <img
          className="background-image"
          src="https://newsroompost.com/wp-content/uploads/2023/01/720603-pathaan-movie-review-webp-1500%C3%97900-.jpg" alt="hero im"
        />
        <div className="container">
          <div className="title">
            <h1>PATHAN</h1>
            <p>
            Indian special agent Pathaan must go on the adventure of his lifetime to save India from bioterrorism
            </p>
          </div>
          <div className="buttons">
            <button onClick={() => navigate("/player")} className="playBtn">
              Play
            </button>
            <button className="moreBtn">More</button>
          </div>
        </div>
      </div>
     <SliderContainer movies={movies}/>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  .hero {
    position: relative;
    .background-image {
      filter: brightness(60%);
    }
    img {
      height: 70vh;
      width: 100%;
    }
    .container {
      position: absolute;
      bottom: 0.1rem;
      .title {
        h1 {
          margin-left: 2rem;
          text-transform: uppercase;
          font-size: 40px;
          background: -webkit-linear-gradient(#FFFFFF , rgb(255,255,255)) ;
          //background: -webkit-linear-gradient(#eee, rgb(128, 13, 13));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          margin-bottom: -0px;
          width: 640px;
          margin-left: 2rem;
          font-family: "lexend Deca", sans-serif;
          color: white;
        }
      }
      .buttons {
        display: flex;
        margin: 2rem;
        gap: 2rem;
      }

      .playBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #23013f;
        border-radius: 1rem;
        font-size: 1.4rem;
        gap: 1rem;
        padding: 0.9rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: none;
        cursor: pointer;
      }
      .moreBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: black;
        border-radius: 1rem;
        font-size: 1.4rem;
        gap: 1rem;
        padding: 0.9rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: 0.1rem solid white;
        cursor: pointer;
      }
    }
  }
`;

export default Netflix;
