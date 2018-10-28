import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import config from './config.js';

// TODO: Search bar view component w/ search action, on response triggers playVideo action
    // Expansion: Additional search params
    // Expansion: Live search
// TODO: Video player iframe view component
// TODO: Dispatcher pub-sub component - part of video store?
// TODO: Videos store component
class Store {

}
class SearchButton extends Component {
  render() {
    return (
      <button>Search</button>
    )
  }
}
class Search extends Component {
  render() {
    return (
      <div>
        <label htmlFor='search'> Search Youtube</label>
        <input name='search' type='text'></input>
        <SearchButton></SearchButton>
      </div>
    );
  }
}
class App extends Component {
  getData() {
    fetch(`${config.YT_DATA_URL}key=${config.YT_DATA_KEY}&part=snippet&q=synthwave&maxResults=20`).then((resp)=>{
      resp.json().then((json) => {console.log(json)});
    });
  }
  render() {
    return (
      <Search></Search>
    );
  }
}

export default App;
