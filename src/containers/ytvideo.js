import YouTube from 'react-youtube';
import React from 'react';
class YTVideo extends React.Component {
  getDefaultOpts() {
    return {
      height: '100',
      width: '100',
      playerVars: {
        autoPlay: 1
      }
    }
  }
  // onStateChange = (event) => {
  //   console.log('state changed', event);
  //   if (event.data === 5) {
  //     event.target.playVideo();
  //   }
  // }
  render = (props) => {
    return (
      <YouTube videoId='' opts={this.getDefaultOpts()}></YouTube>
    );
  }
}

export default YTVideo;