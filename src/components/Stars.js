import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Stars = ({ stars, reviews }) => {
  const starsArray = [];

  for (let i = 0; i < 5; i++) {
    if (stars === 0 || stars < 0.5) {
      starsArray.push(
        <span key={i}>
          <BsStar />
        </span>
      );
    } else if (stars >= 0.5 && stars < 1) {
      stars = 0;
      starsArray.push(
        <span key={i}>
          <BsStarHalf />
        </span>
      );
    } else {
      stars--;
      starsArray.push(
        <span key={i}>
          <BsStarFill />
        </span>
      );
    }
  }

  return (
    <Wrapper>
      <div className="stars">
        {/* Start */}
        {starsArray}
        {/* End */}
      </div>
      <p className="reviews">{reviews} customer reviews</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
