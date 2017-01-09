import React from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import MapView from 'react-native-maps'
import { Colors, Images, Metrics } from '../Themes'
import { calculateRegion } from '../Lib/MapHelpers'
import MapCallout from '../Components/MapCallout'
import Styles from './Styles/MapviewStyle'
import RadialMenu from './RadialMenu'
// import exampleNotifications from '../../data/exampleData.js'
import Icon from 'react-native-vector-icons/FontAwesome'
import Callout from './Callout'
import Icons from '../Lib/EventCategories';
import { loadEvents } from '../Actions'

class MapviewExample extends React.Component {

  constructor(props) {
    super(props);
    this.socket = props.props.socket;

    // TODO: Set the initialRegion to the last know user position read from datatbase
    let initialRegion = { latitude: 37.7749, longitude: -122.4194, latitudeDelta: 0.1, longitudeDelta: 0.1 };

    // TODO: remove exampleNotifications
    // TODO: consider moving some of these properties into the store
    this.state = {
      region: initialRegion,
      currentLocation: {},
      // notifications: exampleNotifications || [],
      notifications: props.notifications,
      showUserLocation: true
    }


    this.retrieveMapMarkers.call(this)
    this.renderMapMarkers = this.renderMapMarkers.bind(this)
    this.onRegionChange = this.onRegionChange.bind(this)
  }

  componentDidMount() {
    this.getCurrentPosition();
    this.watchPosition();
    this.retrieveMapMarkers();
  }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          // TODO: changed for development purposes. Put these back in later
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
          // latitudeDelta: 0.1,
          // longitudeDelta: 0.1
        };
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        this.setState( { region, currentLocation } );
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  // Set up watchId so we can end the geolocation watch when comonent unmounts
  watchID: ?number = null;

  watchPosition() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
        var lastPosition = JSON.stringify(position);
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          ...this.state.region
        };
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }

        this.setState({currentLocation });
      },
      (error) => alert(JSON.stringify(error))
      // TODO: remove this for production
      //, {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange (region) {
    this.retrieveMapMarkers();
    this.setState({region})
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  calculateRadius() {
    let R = 6371; // Radius of the earth in km
    let lat1 = this.state.region.latitude;
    let lat2 = this.state.region.latitude + this.state.region.latitudeDelta;
    let lon1 = this.state.region.longitude;
    let lon2 = this.state.region.longitude + this.state.region.longitudeDelta;
    let dLat = this.deg2rad(lat2-lat1);  // this.deg2rad below
    let dLon = this.deg2rad(lon2-lon1);
    let a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // Distance in km
    return d;
  }

  // TODO: Implement this function to get notifications from socket
  // Sends a region object with form { latitude: 37.7749, longitude: -122.4194, radius };
  // Outputs expects to recieve an array of nitifications and sets the state's notifications to whatever it is
  retrieveMapMarkers () {
    console.log('states',this.state);
    const location = {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
      radius: this.calculateRadius.call(this)
    }

    this.socket.emit('getNotifications', (data) => {
      console.log("notifications in map view", data);
      this.props.fetchEvents(data);
      console.log('this.notifications',this.state.notifications);
    });
  }

  // TODO: make callout render with dynamic width
  renderMapMarkers (notification) {
    return (
      <MapView.Marker key={notification.title} coordinate={{latitude: notification.latitude, longitude: notification.longitude}}
      title={notification.title} description={notification.category}
      >
        <View color="#4F8EF7" >{Icons[notification.category].icon({size: Metrics.icons.small})}</View>
        <MapView.Callout style={ Styles.myCallout } >
          <Callout notification={notification} />
        </MapView.Callout>
      </MapView.Marker>
    )
  }

  render () {
    return (
      <View style={Styles.container}>
        <MapView
          style={Styles.map}
          region={this.state.region}
          onRegionChangeComplete={region => {this.onRegionChange(region)}}
          showsUserLocation={this.state.showUserLocation}
        >
          {this.props.notifications.map((notification) => this.renderMapMarkers(notification))}
        </MapView>

        <RadialMenu notifications={this.state.notifications} region={this.state.region} socket={this.props.socket}/>

      </View>
    )
  }
}
/*
          <Icon name="menu" size={30} color="" />
          <Icon name="menu" size={30} color="#900" />
          <Icon name="menu" size={30} color="#900" />
          <Icon name="menu" size={30} color="#900" />

MaterialCommunityIcons/ target
MaterialCommunityIcons/ pig
MaterialCommunityIcons/ human-handsup
MaterialCommunityIcons/ ghost
MaterialCommunityIcons/ skull
MaterialCommunityIcons/ bomb
*/

// itemRadius (Number) 30 - Menu item radius
// menuRadius (Number) 60- Distance between root and items in open state.
// spreadAngle (Number: 0 - 360) 90 - The angle in degrees based on which menu items are spread on a circle around our root. E.g. 360 full circle, 180 half of circle and so on.
// startAngle (Number) 0 - Items are distributed in clockwise direction starting from startAngle. 0 is left, 90 top, and so on.




const mapStateToProps = (state) => {
  console.log('inside mapping props');
  return {
    notifications: state.events || []
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: (data) => dispatch(loadEvents(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapviewExample)
