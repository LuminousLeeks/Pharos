import { connect } from 'react-redux'
import MapViewComponents from '../Components/MapViewComponents'
import { loadEvents, updateEvent, updatePosition } from '../Actions'

// NOTE: this is the standard format
// const mapStateToProps = (state, ownProps) => {
// however the ownProps only have ownProps.socket so we use {socket}

const mapStateToProps = (state, {socket}) => {
  return {
    events: state.events,
    region: state.userLocation.region,
    currentLocation: state.userLocation.currentLocation,
    socket: socket // use socket for rate event, no dispatch is associated
  }
}

//if the Mapview need to trigger any action 
const mapDispatchToProps = (dispatch, {socket}) => ({

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
  retrieveMapMarkers: (token, region) => {
    const location = {
      latitude: region.latitude,
      longitude: region.longitude,
      radius: 0 //need to implement redius calculation

    }
    dispatch(fetchEvents(token, region))
  }

})

export default connect(mapStateToProps, mapDispatchToProps)(MapViewComponents)
