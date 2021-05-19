/** @jsx jsx */
import React,{useState,useRef,useEffect} from 'react';
import { jsx, css } from '@emotion/react';

import {WholeSlider, Slide, Arrow, Dots} from './components/Export'; 

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
    //this will basically be slides width.
    const getSlideWidth = () => window.innerWidth;

    //three slides that I am going to display 
    const firstSlide = slideImages[0]
    const secondSlide = slideImages[1]
    const lastSlide = slideImages[slideImages.length - 1]    

    const [transition,setTransition] = useState(1);
    const [translate,setTranslate] = useState(getSlideWidth());
    const [activeSlideIndex,setActiveSlideIndex] = useState(0);
    const [activeSlidesArray,setActiveSlidesArray] = useState([lastSlide,firstSlide,secondSlide]);
    const [touchLocation,setTouchLocation] = useState(0);
    
    const transitionRef = useRef();
    const resizeRef = useRef();

    useEffect(() => {
        transitionRef.current = infiniteTransition
        resizeRef.current = handleSlideResize
    })

    useEffect(() => {
        const infiniteTrans = (e) => {
            {/* here I am checking for the transition of Slider, 
            because there is a transition for arrows and dots also */}
            if(e.target.className.includes("WholeSlider")){
                transitionRef.current()
            }
          }

        const resizeSlide = () => {
            resizeRef.current()
        }
        
        const transitionEnd = window.addEventListener('transitionend', infiniteTrans);
        const onSlideResize = window.addEventListener('resize', resizeSlide)

        return ()=> {
            window.removeEventListener('transitionend', transitionEnd);
            window.removeEventListener('resize', onSlideResize);
        };
    },[]);

    //whenever translate changes value, if transition is zero, it is set to 1.5
    useEffect(() => { 
        if (transition === 0) {
            setTransition(1)
        }  
      }, [translate]);

    //When the resize ends it is set to the whole width, 
    const handleSlideResize = () =>{
        setTranslate(getSlideWidth());
        setTransition(0);
    }

    const infiniteTransition = () => {
        let activeSlides = []

        {/*basically I am checking for three ocassions of my slide 
            first check is when the last slide is displayed,
            second check is when the first slide is displayed
            and finally last line sets activeSlides array to Prev,Active and Next slide.
        */}
        if (activeSlideIndex === slideImages.length - 1)
        activeSlides = [slideImages[slideImages.length - 2], lastSlide, firstSlide]
        else if (activeSlideIndex === 0) activeSlides = [lastSlide, firstSlide, secondSlide]
        else activeSlides = slideImages.slice(activeSlideIndex - 1, activeSlideIndex + 2)
       
        setTransition(0);
        setActiveSlidesArray(activeSlides);
        setTranslate(getSlideWidth());

      }
    
    // next two functions are for arrows, going forward and backwards.
    const nextSlide = () => {
        setActiveSlideIndex(activeSlideIndex === slideImages.length - 1 ? 0 : activeSlideIndex + 1);
        setTranslate(translate + getSlideWidth());
    }
    
    const previousSlide = () => {
        setActiveSlideIndex(activeSlideIndex === 0 ? slideImages.length - 1  : activeSlideIndex - 1);
        setTranslate(0);
    }
      
    //handles dots, so that when it's pressed proper slide is displayed.
    const handleDotSlide = (index) => {
        let dotArray=[slideImages[index - 1],slideImages[index],slideImages[index + 1]];
        setActiveSlidesArray(dotArray);
        setActiveSlideIndex(index);
    }

    const handleTouch = (e) =>{
        const delta = touchLocation - e.nativeEvent.touches[0].clientX;
        setTouchLocation(e.nativeEvent.touches[0].clientX);

        //my default translate is getSlideWidth(), therefore
        //I need to check, for first touch on screen and it shouldn't
        //be 0, that way delta is becoming -e.nativeEvent.touches[0].clientX
    
        touchLocation !== 0 && setTranslate(translate + delta);
        
        //two checks, to make sure that while swiping we don't swipe more than
        //one slide
        if(translate > getSlideWidth()*2){
            setTranslate(getSlideWidth()*2)
        }else if(translate < 0){
            setTranslate(0);
        }
    }

    const handleTouchEnd = () =>{
        //endPosition is value, that tells me how much of the other
        //slide is shown on the screen, if it's more than 50% I am changing activeSlideIndex
        //and translate also, for a smooth snap.
        const endPosition = translate/getSlideWidth();
        if(endPosition > 1.5){
            setTranslate(getSlideWidth()*2);
            setActiveSlideIndex(activeSlideIndex + 1);
            activeSlideIndex === slideImages.length - 1 && setActiveSlideIndex(0);    
        }else if(endPosition < 0.5){
            setTranslate(0);
            setActiveSlideIndex(activeSlideIndex - 1);
            activeSlideIndex === 0 && setActiveSlideIndex(slideImages.length - 1);
        }else{
            setTranslate(getSlideWidth());
            setActiveSlidesArray(activeSlidesArray);
        }
        setTouchLocation(0);
    }

    return (
        <div css={styleSlider}>
            <WholeSlider onTouchMove={handleTouch} onTouchEnd={handleTouchEnd} translate={translate} transition={transition} width={getSlideWidth() * activeSlidesArray.length}>
            {activeSlidesArray.map((img,idx)=>(
                    <Slide key={img+idx} img={img}/>
                ))}
            </WholeSlider>
            <Arrow  direction="left"  handleClick={previousSlide} />
            <Arrow  direction="right" handleClick={nextSlide} />
            <Dots handleDotSlide={handleDotSlide} slideImages={slideImages} activeSlideIndex={activeSlideIndex} />
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
