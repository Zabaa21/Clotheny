import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
// eslint-disable-next-line
import { Carousel } from 'react-responsive-carousel';
import image1 from '../../assets/img/bd (1).jpg'

import image3 from '../../assets/img/bd (3).jpg'


export default function carrusel ({onChange,onClickItem, onClickThumb}){
        return (
        <div className="carousel-wrapper" >
            <Carousel autoPlay={true}
             interval={4000}
             showStatus={false} 
             showThumbs={false}
             showArrows={true}
             onChange={onChange}
             dynamicHeight={true}
             onClickItem={onClickItem} 
             onClickThumb={onClickThumb}
             infiniteLoop={true}>
                <div>
                    <img src={image1} alt=""/>
                    {/* <p className="legend">Winter Wear Collection is Here</p> */}
                </div>
                <div>
                    <img  src={image3} alt="" />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
        </div>
        );
    }
