"use client"

import "@/styles/globals.css";
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';


// Define the type for the movie data object
type SliderData = {
  name: string;
  image: string;
  link: string;
};

type SliderProps = {
  sliderData: SliderData[];
};

export const Slider: React.FC<SliderProps> = ({ sliderData }) => {

  const handleSliderClick = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <section className="relative mt-4 shadow-2xl max-w-screen-2xl mb-9">
      <div className="rounded-lg h-96">
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={2000}
          dynamicHeight={false}
          transitionTime={300}
          swipeable={true}
          emulateTouch={true}
          className="shadow-2xl rounded-lg hover:border-[4px]
          border-gray-400 transition-all duration-250 ease-in animate-fade-up"
        >
          {sliderData.map((slider) => (
            <div key={slider.name} onClick={() => handleSliderClick(slider.link)} >
              <Image className="object-cover rounded-lg h-96" loading="eager" alt="Slider Image" src={slider.image} width={1920} height={1080}/>
              <h1 className="absolute text-2xl font-semibold text-white bottom-4 left-10">{slider.name}</h1>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};
