import React, { Component } from 'react';
import './App.css';
import config from './config.js';
import Store  from './store';
import YouTube from 'react-youtube';
// TODO: Autoplay youtube videos on return
// TODO: Queue feature
// TODO: Autoplay on return feature
// TODO: Sorting videos by some criteria - popularity?
// TODO: Giphy Integration
// TODO: pre-selected genres, with a random giphy, in random order
// TODO: clicking a giphy goes and gets / plays a youtube video, and queues up other top results, with that genre of music

let store = new Store();
class YTVideo extends Component {
  constructor() {
    super();
    this.state = {};
    store.on('STATE_UPDATED', this.updateState);
  }
  updateState = (state) => {
    console.log('updating state', state);
    this.setState(state);
  }
  getDefaultOpts() {
    return {
      height: '100',
      width: '100',
      playerVars: {
        autoPlay: 1
      }
    }
  }
  onStateChange = (event) => {
    console.log('state changed', event);
    if (event.data === 5) {
      event.target.playVideo();
    }
    
  }
  render = () => {
    console.log(this.state);
    return (
      <YouTube onStateChange={this.onStateChange} videoId={this.state.videoId || ''} opts={this.state.opts || this.getDefaultOpts()}></YouTube>
    );
  }
}
class SearchButton extends Component {
  render() {
    return (
      <button onClick={this.props.onClick}>Search</button>
    )
  }
}
class Search extends Component {
  initSearch = () => {
    store.dispatch({type: 'VIDEO_SEARCH'});
  }
  handleInput = (event) => {
    store.dispatch(
      {
        type: 'UPDATE_SEARCH',
        search: event.target.value
      });
  }
  render() {
    return (
      <div>
        <label htmlFor='search'> Search Youtube </label>
        <input onChange={this.handleInput} name='search' type='text'></input>
        <SearchButton onClick={this.initSearch}></SearchButton>
      </div>
    );
  }
}
class App extends Component {

  render() {
    return (
      <div>
        <Search></Search>
        <YTVideo></YTVideo>
      </div>
    );
  }
}

export default App;
