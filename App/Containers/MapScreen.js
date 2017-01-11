import { connect } from 'react-redux'
import MapViewComponents from '../Components/MapViewComponents'
import { fetchEvents, updateEvent, updatePosition, saveWatchID } from '../Actions'

// NOTE: this is the standard format
// const mapStateToProps = (state, ownProps) => {
// however the ownProps only have ownProps.socket so we use {socket}

const mapStateToProps = (state, ownProps) => {
  return {
    events: state.events,
    region: state.userLocation.region,
    watchID: state.watchID,
    token: state.token,
    currentLocation: state.userLocation.currentLocation
  }
}

//if the Mapview need to trigger any action 
const mapDispatchToProps = (dispatch, ownProps) => ({

  getCurrentPosition: (cb) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(updatePosition(position)) //!!! add this action
        if (!!cb) { cb(position.coords) }
      },
      (err) => {},
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  },
  watchPosition: () => {
    return navigator.geolocation.watchPosition(
      (position) => {
        dispatch(updatePosition(position))
      },
      (err) => {}
      // TODO: remove this for production
      //, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    )
  },
  retrieveMapMarkers: (token, userLocation) => {
    dispatch(fetchEvents(token, userLocation))
  },
  saveWatchID: (watchID) => {
    dispatch(saveWatchID(watchID))
  }

})

export default connect(mapStateToProps, mapDispatchToProps)(MapViewComponents)
