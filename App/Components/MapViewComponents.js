import React, { Component } from 'react'
import { View } from 'react-native'
import MapView from 'react-native-maps'
import { Metrics } from '../Themes'
import Styles from './Styles/MapViewComponentsStyle'
import RadialMenu from '../Containers/RadialMenu'
import CalloutContainer from '../Containers/CalloutContainer'
import EventCategories from '../Lib/EventCategories'


// const Mapviews = ({ events, socket, loadEvents, updateEvents }) => {
export default class MapViewComponents extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    const retrieveMapMarkers = this.props.retrieveMapMarkers.bind(this)
    this.props.getCurrentPosition((coord)=>{
      retrieveMapMarkers(this.props.token, coord)
    });
    const watchID = this.props.watchPosition()
    this.props.saveWatchID(watchID)
  }
  onRegionChange () {
    this.props.retrieveMapMarkers(this.props.token, this.props.currentLocation);
  }  
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.props.watchID);
  }
  render() {
    return (
      <View style={Styles.container}>
        <MapView
          style={Styles.map}
          initialRegion={this.props.region}
          region={this.props.region}
          onRegionChangeComplete={this.onRegionChange.bind(this)}
          // showsUserLocation={this.props.showUserLocation} //TODO: need to add this function
        >
          {this.props.events
            .map((event) => ({
              event: event,
              Icon: EventCategories[event.category].icon
            }))
            .map((EventObj, index) => 
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: EventObj.event.latitude,
                  longitude: EventObj.event.longitude
                }}
                event={EventObj.event}
              >
                <View color="#4F8EF7" >
                  <EventObj.Icon size={Metrics.icons.small} />
                </View>
                <MapView.Callout style={Styles.myCallout} >
                  <CalloutContainer notification={EventObj.event} socket={this.props.socket}/>
                </MapView.Callout>
              </MapView.Marker>
            )
          }
        </MapView>
        <RadialMenu socket={this.props.socket} />
      </View>
    )
  }
}




