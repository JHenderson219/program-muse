import React, { Component } from 'react';
import './App.css';
import config from './config.js';

// TODO: Search bar view component w/ search action, on response triggers playVideo action
    // Expansion: Additional search params
    // Expansion: Live search
// TODO: Video player iframe view component
// TODO: Redux-ish store class
class Store {
  constructor() {
    this.props = {};
    this.props.url = config.YT_DATA_URL;
    this.state = {};
    this.listeners = new Map();
  }
  getBaseURL() {
    return this.props.url;
  }
  serializeParams(queryParams = {}) {
    if (!queryParams.part) queryParams.part = 'snippet';
    if (!queryParams.maxResults) queryParams.maxResults = 20;
    if (!queryParams.key) queryParams.key = config.YT_DATA_KEY;
    let entries = Object.entries(queryParams);
    console.log(entries)
    let out = entries.reduce((acc, pair) => {
      return acc+pair.reduce((key, value) => `&${key}=${value}`);
      }, '');
    return out;
  }
  getFetchURL(query) {
    let params = this.serializeParams(query);
    console.log('fetch url', this.getBaseURL()+params);
    return this.getBaseURL()+params;
  }
  fetchVideos(query) {
    let url = this.getFetchURL(query);
    return fetch(url);
  }
  updateState(stateUpdates) {
    Object.entries(stateUpdates).forEach(element => {
      this.state[element[0]] = element[1];
    });
    this.trigger('STATE_UPDATED', this.state);
  }
  dispatch(action) {
    switch(action.type) {
      case 'VIDEO_SEARCH':
        this.fetchVideos({q: this.state.search})
            .then(resp => resp.json()
            .then(json => {
              let videoId = this.selectVideoId(json.items);
              this.updateState({videoId});
            }));
        break;
      case 'UPDATE_SEARCH':
        this.updateState({search: action.search});
        break;
      default:
        console.warn(`No action handler for ${action}`);
        break;
    }
  }
  selectVideoId(videos) {
    let selection = videos[Math.floor(Math.random()*20)].id.videoId;
    console.log(selection);
    return selection;
  }
  trigger(event, params) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => callback(params));
    }
  }
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }
}
let store = new Store();
class YTVideo extends Component {
  constructor() {
    super();
    store.on('STATE_UPDATED', this.render);
  }
  updateStyle(key, value) {
    this.style[key] = value;
  }
  render = (state = {}) => {
    console.log('rendering with state:', state);
    let src = '';
    // TODO: Get this componenet to re-render with a new src when the corresponding events fire
    if (!state.videoId) {
    } else {
      src = config.YT_EMBED_URL+state.videoId
    }
    src = config.YT_EMBED_URL+'THRfmv__bx8';
    return (
      <iframe title='selectedVideo' src={src}></iframe>
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
