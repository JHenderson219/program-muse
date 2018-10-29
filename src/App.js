import React, { Component } from 'react';
import './App.css';
import config from './config.js';

// TODO: Search bar view component w/ search action, on response triggers playVideo action
    // Expansion: Additional search params
    // Expansion: Live search
// TODO: Video player iframe view component
// TODO: Dispatcher pub-sub component - part of video store?
// TODO: Videos store component
class Store {
  constructor() {
    this.props = {};
    this.props.url = config.YT_DATA_URL;
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
  dispatch(action) {
    switch(action.type) {
      case 'VIDEO_SEARCH':
        return this.fetchVideos({q: action.query})
      default:
        console.warn(`No action handler for ${action}`);
        break;
    }
  }
}
let store = new Store();

class SearchButton extends Component {
  render() {
    return (
      <button onClick={this.props.onClick}>Search</button>
    )
  }
}
class Search extends Component {
  initSearch = () => {
    let query = this.state.value;
    let promise = store.dispatch({
      type: 'VIDEO_SEARCH',
      query,
    });
    promise.then((resp) => {resp.json().then(json => console.log(json))});
  }
  handleInput = (event) => {
    console.log('handling input', this, event);
    this.setState({value: event.target.value});
    console.log('this', this, 'state', this.state);
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
      <Search></Search>
    );
  }
}

export default App;
