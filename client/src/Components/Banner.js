import React, { useEffect, useState } from "react";
import pic from "./1.jpg";
import pic2 from "./2.jpg";
import pic3 from "./3.jpg";

const images = [pic2, pic, pic3];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="row">
      {images.map((src, index) => (
        <div className={`col-md-${index === 1 ? 6 : 3}`} key={index}>
          <img
            src={src}
            className={`bannerImg ${index === currentIndex ? 'active' : ''}`}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default Banner;