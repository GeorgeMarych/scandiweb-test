/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/react';

  
  const Dots = ({ slideImages,activeSlideIndex,handleDotSlide }) => (
    <div
      css={css`
        position: absolute;
        bottom: 25px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {slideImages.map((slide, i) => (
        <span
        onClick={()=>handleDotSlide(i)}
        key={slide+i} 
        css={css`
        padding: 10px;
        margin-right: 5px;
        cursor: pointer;
        border-radius: 50%;
        background: ${activeSlideIndex === i ? 'black' : 'white'};
        opacity: 0.6;
        transition: transform ease-in 0.1s;
        &:hover {
          opacity: 0.9;
          transform: scale(1.1)
        }
      `}
    />
      ))}
    </div>
  )

export default Dots
