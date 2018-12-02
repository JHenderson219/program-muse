export const LOAD_TRACKS = 'LOAD_TRACKS';
export const SELECT_TRACK = 'SELECT_TRACK';

export function loadTracks (tracks) {
  return { action: LOAD_TRACKS, tracks}
}

export function selectTrack (track) {
  return { action: SELECT_TRACK, track}
}