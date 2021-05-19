/** @jsx jsx */
import React from 'react';
import { css,jsx } from '@emotion/react';

const WholeSlider=({translate,transition,width,onTouchMove,onTouchEnd,children}) =>{
    return (
        <div
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            css={css`
            transform: translateX(-${translate}px);
            transition: transform ease-out ${transition}s;
            height: 100%;   
            width: ${width}px;
            display: flex;
        `}
        >
            {children}
        </div>
    )
} 
export default WholeSlider
