import { connect } from 'react-redux';
import Tracks from '../components/tracks';

const mapStateToProps = (state, ownProps) => {
  console.log('state in track container map state to props', state);
  return state;
}

const TrackContainer = connect(mapStateToProps)(Tracks);

export default TrackContainer;
