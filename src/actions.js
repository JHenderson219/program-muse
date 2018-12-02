export const LOAD_TRACKS = 'LOAD_TRACKS';
export const SELECT_TRACK = 'SELECT_TRACK';
export const LOAD_GIFS_REQUEST = 'LOAD_GIFS_REQUEST';
export const LOAD_GIFS_SUCCESS = 'LOAD_GIFS_SUCCESS';
export const LOAD_GIFS_ERROR = 'LOAD_GIFS_ERROR';

export function loadTracks (tracks) {
  return { action: LOAD_TRACKS, tracks }
}

export function selectTrack (track) {
  return { action: SELECT_TRACK, track }
}

export function loadGifsRequest (tracks) {
  return { action: LOAD_GIFS_REQUEST, tracks }
}
