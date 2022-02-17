import Aside from 'Components/MainWrapper/parts/Aside';
import PageHeader from 'Components/PageHeader';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
function HowToPlayPage() {
  const [videoBuffer,setVideoBuffer] = useState(false);
  return (
    <div className="how-to-play-page main-wrapper ">
    <Aside
      currPath={'/howtoplay'}
      unreadCounts={0}
      isAdmin={false}
          />   
      <div className="wrap main-content">
          <PageHeader title="How to play?" />  
          <ReactPlayer
          className='react-player'
          playing={true}
          url='https://tcg-web-assets.s3.us-east-2.amazonaws.com/TCG+Tutorial+Final+HD+MP4.mp4'
          width='100%'
          height='100%'
          controls
          onBuffer={() => setVideoBuffer(true)}
          config={{ file: { attributes: { disablepictureinpicture: 'true' }}}}
        />
      </div>

    </div>
  );
}
export default HowToPlayPage;
