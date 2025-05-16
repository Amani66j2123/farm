import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import p1 from "./1.jpg";
import p2 from "./2.jpg";
import p3 from "./3.jpg";
import p4 from "./4.jpg";
import p5 from "./5.jpg";
import p6 from "./6.jpg";
import p7 from "./7.jpg";
import p8 from "./8.jpg";
import p9 from "./9.jpg";
import p10 from "./10.jpg";
import p11 from "./11.jpg";
import p12 from "./12.jpg";
import p13 from "./13.jpg";
import p14 from "./14.jpg";
import p15 from "./15.jpg";
import p16 from "./16.jpg";
import p17 from "./17.jpg";
import p18 from "./18.jpg";
import p19 from "./19.jpg";
import p20 from "./20.jpg";
import p21 from "./21.jpg";

const Gallery = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      
    };
  
    return (
      <div > 
        
        <Slider {...settings}>
          <div>
            <img src={p1} alt=" "  />
            
          </div>
          <div>
            <img src={p2} alt=" " />
           
          </div>
          <div>
            <img src={p3} alt=" " />
           
          </div>
          <div>
            <img src={p4} alt="" />
            
          </div> <div>
            <img src={p5} alt="" />
           
          </div>
          <div>
            <img src={p6} alt=" " />
            
          </div>
          <div>
            <img src={p7} alt="" />
            
          </div>
          
           
          <div>
            <img src={p8} alt="" />
           
          </div>
          <div>
            <img src={p9} alt=" " />
            
          </div>
          <div>
            <img src={p10} alt=" " />
          
          </div>
          <div>
            <img src={p11} alt="" />
           
          </div> <div>
            <img src={p12} alt=" " />
            
          </div>
          <div>
            <img src={p13} alt=" " />
            
          </div>
          <div>
            <img src={p14} alt=" " />
            
          </div>
          <div>
            <img src={p15} alt=" " />
            
          </div>
          <div>
            <img src={p16} alt=" " />
           
          </div>
          <div>
            <img src={p17} alt=" " />
          
          </div>
          <div>
            <img src={p18} alt=" " />
            
          </div> <div>
            <img src={p19} alt=" " />
            
          </div>
          <div>
            <img src={p20} alt="" />
          
          </div>
          <div>
            <img src={p21} alt="" />
            
          </div>
        </Slider>
      </div>
    );
  };

export default Gallery;