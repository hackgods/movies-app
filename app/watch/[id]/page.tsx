"use client"
import {fetchMovies} from "../../api";
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

  return (
    <div>
       <Video src={jmoviesData.ytLink} title={jmoviesData.title} poster={jmoviesData.posterPath} desc={jmoviesData.overview} cc=""></Video>
    </div>
  );
}

export default Watch