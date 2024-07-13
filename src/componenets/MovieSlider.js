import React, { useEffect,useState, useRef } from "react";
import Card from "./Card";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

const Container = styled.div`
  gap: 0.7rem;
  position: relative;
  padding: 1rem 0;
  h1 {
    margin-left: 25px;
    font-size: 22px;
    color: white;
  }
  .wrapper {
    .slider {
      display: flex;
      width: max-content;
      gap: 0.6rem;
      transform: translateX(0px);
      transition: 1s ease-in-out;
      margin-left: 5px;
    }
    .slider-action {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      z-index: 99;
      height: 100%;
      top: 2rem;
      bottom: 0;
      width: 50px;
      transition: 0.1s ease-in-out;
      svg {
        font-size: 2rem;
        cursor: pointer;
        color: white;
      }
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
    .none {
      display: none;
    }
  }
`;

// ... (previous code)

const MovieSlider = React.memo(function MovieSlider({ data, title }) {
  const sliderRef = useRef();
  const posterRefs = useRef([]);

  const [controlvisibility, setcontrolvisibility] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);

  const handleDirection = (direction) => {
    let distance = sliderRef.current.getBoundingClientRect().x - 70;
    if (direction === 'left' && sliderPosition > 0) {
      sliderRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === 'right' && sliderPosition < 4) {
      sliderRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };

  const handleMouseEnter = (index) => {
    // Set the trailer for the corresponding movie index
    // (Assuming data[index].trailer is the URL of the trailer)
    const trailerUrl = data[index].trailer;
    // Use the trailerUrl as needed (e.g., play the trailer)
    console.log(`Play trailer for index ${index}, URL: ${trailerUrl}`);
  };

  // Create refs for each movie poster outside of the map function
  useEffect(() => {
    posterRefs.current = data.map(() => React.createRef());
  }, [data]);

  return (
    <Container
      controlvisibility={controlvisibility.toString()}
      onMouseEnter={() => setcontrolvisibility(true)}
      onMouseLeave={() => setcontrolvisibility(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        <div className={`slider-action left ${!controlvisibility ? 'none' : ''}`}>
          <AiOutlineLeft onClick={() => handleDirection('left')} />
        </div>
        <div className="slider" ref={sliderRef}>
          {data.map((movie, index) => (
            <div
              key={movie.id}
              onMouseEnter={() => handleMouseEnter(index)}
              ref={posterRefs.current[index]}
            >
              <Card movieData={movie} index={index} />
            </div>
          ))}
        </div>
        <div className={`slider-action right ${!controlvisibility ? 'none' : ''}`}>
          <AiOutlineRight onClick={() => handleDirection('right')} />
        </div>
      </div>
    </Container>
  );
});

export default MovieSlider;
