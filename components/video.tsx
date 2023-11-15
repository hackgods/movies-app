import React, { useRef } from 'react';
import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';
import { MediaCommunitySkin, MediaOutlet, MediaPlayer, MediaPoster,MediaPIPButton } from '@vidstack/react';


interface VideoProps {
  src: string;
  title: string;
  poster: string;
  desc: string;
  cc: string;
}

const Video: React.FC<VideoProps> = ({ src, title, poster, desc, cc }) => {
  
  
  return (
    <div>

  <MediaPlayer
  title={title}
  src={src}
  poster={poster}
  aspectRatio={16 / 9}
  crossorigin=""
  autoplay={true}>

  <MediaOutlet>
    <MediaPoster
      alt={desc}
    />
   <track
      src={cc}
      label="English"
      srcLang="en-US"
      kind="subtitles"
      default
    />
  </MediaOutlet>
  <MediaCommunitySkin />
</MediaPlayer>

    </div>
  );
}

export default Video;
