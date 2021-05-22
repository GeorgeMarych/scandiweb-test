/** @jsx jsx */
import React from 'react';
import { css,jsx } from '@emotion/react';


const Slide = ({img})=>{
    return (
        <div 
            css={css({
            height: "100%",
            width: "100%",
            backgroundImage: `url('${img}')`,
            backgroundSize: "cover",
            backgroundRepeat:"no-repeat",
            backgroundPosition: "center",
        })
    }>

    </div>
    )
    
}


export default Slide
