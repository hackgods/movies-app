"use client"
import { fetchMovies } from "../../api";
import React, { useEffect, useState, Context } from 'react';
import Head from 'next/head';
import "@/styles/globals.css";
import { FaPlay, FaPlus } from "react-icons/fa6";
import Video from "@/components/video";
import { useSearchParams, useRouter } from 'next/navigation';
import { useParams, usePathname } from 'next/navigation';

function Watch() {
  const searchParams = useSearchParams();
  const moviesData = searchParams.get('moviesData');
  const jmoviesData = JSON.parse(moviesData ? moviesData : '');

  const [iframeDimensions, setIframeDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setIframeDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial dimensions
    updateDimensions();

    // Listen for window resize events
    window.addEventListener('resize', updateDimensions);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Dynamically set the iframe source URL
  const iframeSrc = `https://vidsrc.to/embed/movie/${jmoviesData.id}`;

  return (
    <div>
      <Head>
        {/* Content Security Policy */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self';"></meta>
      </Head>
      <a target="_blank" rel="noopener noreferrer">
        <iframe
          src={iframeSrc}
          width={iframeDimensions.width}
          height={iframeDimensions.height}
          allowFullScreen
        ></iframe>
      </a>
      {/*<Video src={jmoviesData.videoUrl} title={jmoviesData.title} poster={jmoviesData.posterPath} desc={jmoviesData.overview} cc=""></Video>*/}
    </div>
  );
}

export default Watch;
