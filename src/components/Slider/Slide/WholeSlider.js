/** @jsx jsx */
import React from 'react';
import { css,jsx } from '@emotion/react';

const WholeSlider=({translate,transition,width,onTouchMove,onTouchEnd,children,onMouseMove,onMouseDown,onMouseUp}) =>{
    return (
        <div
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            css={css`
            transform: translateX(-${translate}px);
            transition: transform ease-out ${transition}s;
            height: 100%;   
            width: ${width}px;
            display: flex;
            :active{
                cursor : pointer;
            }
        `}
        >
            {children}
        </div>
    )
} 
export default WholeSlider
