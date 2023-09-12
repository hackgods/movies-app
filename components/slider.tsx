"use client"
import "@/styles/globals.css";
import React from 'react';
import { Carousel } from 'react-responsive-carousel';

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

  console.log(sliderData);

  return (
    <section className="shadow-2xl max-w-screen-2xl">
      <div className="rounded-lg h-96">
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={true}
          showThumbs={false}
          interval={3500}
          dynamicHeight={false}
          transitionTime={300}
        >
          {sliderData.map((slider) => (
            <div key={slider.name}>
              <img className="rounded-lg h-96 object-fill" loading="lazy" src={slider.image} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};
