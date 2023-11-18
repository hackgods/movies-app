"use client"
// Import necessary modules
import { fetchMovies } from "../../api";
import React, { useEffect, useState } from 'react';
import "@/styles/globals.css";
import { FaPlay, FaPlus } from "react-icons/fa6";
import Video from "@/components/video";
import { useParams } from 'next/navigation';

function Watch() {
  const params = useParams();
  // Get id from param query
  let id = Number(params['id']);

  
  // Initialize id state
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


  
  useEffect(() => {
    const blockExternalNavigation = (event: BeforeUnloadEvent) => {
      const beforeUnloadEvent = event as BeforeUnloadEvent;
      beforeUnloadEvent.preventDefault();
    };
  
    window.addEventListener('beforeunload', blockExternalNavigation);
  
    return () => {
      window.removeEventListener('beforeunload', blockExternalNavigation);
    };
  }, []);

  let originalWindowOpen: any;

useEffect(() => {
  // Store the original window.open method
  originalWindowOpen = window.open;

  // Override window.open to prevent new windows
  const blockWindowOpen = () => null;
  window.open = blockWindowOpen;

  return () => {
    // Restore the original window.open method on component unmount
    window.open = originalWindowOpen;
  };
}, []);

  

  // Dynamically set the iframe source URL
  const iframeSrc = id ? `https://vidsrc.to/embed/movie/${id}` : null;

  return (
    <div>
      <a target="_blank" rel="noopener noreferrer">
        {iframeSrc && (
          <iframe
            src={iframeSrc}
            width={iframeDimensions.width}
            height={iframeDimensions.height}
            allowFullScreen
          ></iframe>
        )}
      </a>
    </div>
  );
}

export default Watch;
