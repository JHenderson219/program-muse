import Track from './track';
import React from 'react';

const Tracks = (props) => {
  console.log('props in tracks', props);
  return (
    <div>
      {props.tracks.map((track, index) => 
        (<Track key={index} name={track.name}></Track>))}
    </div>
  )
}

export default Tracks;