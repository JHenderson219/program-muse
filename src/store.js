import config from './config.js';

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
    if (!queryParams.autoplay) queryParams.autoplay = 1;
    
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

export default Store;