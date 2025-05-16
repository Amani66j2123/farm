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

const images = [
  p1, p2, p3, p4, p5, p6, p7, p8, p9, p10,
  p11, p12, p13, p14, p15, p16, p17, p18, p19, p20, p21
];

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
    <div className="gallery-wrapper">
      <div className="gallery-card">
        <Slider {...settings}>
          {images.map((img, index) => (
            <div className="image-slide" key={index}>
              <img src={img} alt={`slide-${index}`} className="fill-image" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery;
