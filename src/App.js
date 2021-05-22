/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/react';
import Slider from "./components/Slider/Slider";

const slideImages = [
    "https://wallpaperaccess.com/full/930660.jpg",
    "https://wallpaperaccess.com/full/930661.jpg",
    "https://wallpaperaccess.com/full/930662.jpg",
    "https://wallpaperaccess.com/full/930663.jpg",
    "https://wallpaperaccess.com/full/930664.jpg",
    "https://wallpaperaccess.com/full/930666.jpg",
    "https://wallpaperaccess.com/full/930667.jpg"
]

const App = () => {
    
    return (
        <div css={styleSlider}>
            <Slider slideImages={slideImages}/>
        </div>   
    )
}


const styleSlider = css({
    position:"relative",
    height:"100vh",
    width : "100vw",
    overflow : "hidden",
    margin : "0 auto",    
});

export default App
