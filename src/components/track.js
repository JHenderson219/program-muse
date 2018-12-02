import React from 'react';

const Track = (props) => {
  console.log('props in track', props);
  return (
    <div>
      {props.name}
    </div>
  )
}

export default Track;