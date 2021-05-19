/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react';
import leftArrow from '../../../img/left-arrow.svg';
import rightArrow from '../../../img/right-arrow.svg';


const Arrow = ({ direction,handleClick }) => {
    return (
        <div
            onClick={()=>handleClick()} 
            css={css`
            display: flex;
            position: absolute;
            top: 50%;
            ${direction === 'right' ? `right: 25px` : `left: 25px`};
            height: 50px;
            width: 50px;
            justify-content: center;
            background: transparent;
            opacity:0.6;
            border-radius: 50%;
            cursor: pointer;
            align-items: center;
            transition: transform ease-in 0.1s;
            &:hover {
              opacity: 0.8;
              transform: scale(1.2)
            }
            `}
        >
            {/*depending on direction it will display, proper arrow*/}
            {direction === "right" ? <img src={rightArrow} />: <img src={leftArrow} /> }
        </div>
    )
}

export default Arrow
