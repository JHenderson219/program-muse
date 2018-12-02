import { combineReducers } from "redux";
import * as actions from './actions';

const reducers = {
  tracks: (state = [], action) => {
    switch (action.type) {
      case actions.LOAD_TRACKS :
        return {};
      default:
        return state;
    }
  },
  selectedTrack: (state = {}, action) => {
    switch (action.type) {
      case actions.SELECT_TRACK :
        return {};
      default:
        return state;
    }
  },
  // video id
  // gif id / url
  //
}

const programMuse = combineReducers(reducers);
export default programMuse;