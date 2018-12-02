import React, { Component } from 'react';
// import config from './config.js';
import YTVideo from './containers/ytvideo';
import TrackContainer from './containers/track-container';
// TODO: Autoplay youtube videos on return
// TODO: Queue feature
// TODO: Autoplay on return feature
// TODO: Sorting videos by some criteria - popularity?
// TODO: Giphy Integration
// TODO: pre-selected genres, with a random giphy, in random order
// TODO: clicking a giphy goes and gets / plays a youtube video, and queues up other top results, with that genre of music


class App extends Component {
  render() {
    console.log('rendering app');
    return (
      <div>
        <TrackContainer></TrackContainer>
        <YTVideo></YTVideo>
      </div>
    );
  }
}

export default App;
