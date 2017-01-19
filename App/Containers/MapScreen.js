/* eslint-disable */
import { connect } from 'react-redux';
import MapViewComponents from '../Components/MapViewComponents';
import {
  fetchNotifications,
  updateNotification,
  updatePosition,
  saveWatchID,
  updateRegion,
  sendVoteToServer
} from '../Actions';

// NOTE: this is the standard format
// const mapStateToProps = (state, ownProps) => {
// however the ownProps only have ownProps.socket so we use {socket}

const mapStateToProps = (state, ownProps) => ({
  notifications: state.notifications,
  region: state.region,
  watchID: state.watchID,
  userId: state.userId,
  userName: state.userName,
  userId: state.userId,
  currentLocation: state.currentLocation,
});

// if the Mapview need to trigger any action
const mapDispatchToProps = (dispatch, ownProps) => ({

  getCurrentPosition: (cb) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(updatePosition(position)); //! !! add this action
        if (cb) { cb(position.coords); }
      },
      (err) => {},
      // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  },
  watchPosition: () => navigator.geolocation.watchPosition(
      (position) => {
        dispatch(updatePosition(position));
      },
      (err) => {},
      // TODO: remove this for production
      // , {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    ),
  retrieveMapMarkers: (token, userId, location) => {
    dispatch(fetchNotifications(token, location, userId));
  },
  saveWatchID: (watchID) => {
    dispatch(saveWatchID(watchID));
  },
  updateRegion: (region) => {
    console.log('in MapScreen, updateRegion props is triggered-------')
    console.log(region);
    dispatch(updateRegion(region));
  },
  voteForNotification: (vote) => {
    dispatch(sendVoteToServer(vote));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MapViewComponents);
