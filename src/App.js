import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import config from './config.js';
// import search from './../node_modules/youtube-search';


class App extends Component {
  getData() {
    fetch(`${config.YT_DATA_URL}key=${config.YT_DATA_KEY}&part=snippet&q=synthwave&maxResults=20`).then((resp)=>{
      resp.json().then((json) => {console.log(json)});
    });
  }
  render() {
    this.getData();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {config.YT_DATA_URL+config.YT_DATA_KEY}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
