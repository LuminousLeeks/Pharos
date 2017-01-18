/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Metrics } from '../Themes';
import Styles from './Styles/MapViewComponentsStyle';
import RadialMenu from '../Containers/RadialMenu';
import MapCalloutContainer from '../Containers/MapCalloutContainer';
import NotificationCategories from '../Lib/NotificationCategories';
// import MapCalloutContainer from '../Containers/MapCalloutContainer';
import EventCategories from '../Lib/EventCategories';
import NotificationScreen from '../Containers/NotificationScreen';



export default class MapViewComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSwiper: false,
      displayedEvent: {} 
    }
  }

  componentDidMount() {
    const watchID = this.props.watchPosition();
    this.props.saveWatchID(watchID);
  }

  onRegionChange(region) {
    this.props.updateRegion(region);
    this.props.retrieveMapMarkers(this.props.token, this.props.userId, this.props.region);

  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.props.watchID);
  }
  handlePressIcon(event) {
    console.log('clicked----------------')
    console.log(event);
    console.log(this.props.events);
    this.setState({
      openSwiper: true,
      displayedEvent: event,
    })
  }

  render() {
    // let swiper = null;
    // if (this.state.openSwiper) {
    //   console.log(this.state.displayedEvent);
    //   console.log(this.props.events);
    //   swiper = (<MapCalloutContainer 
    //     event={this.state.displayedEvent}
    //     events={this.props.events}
    //     userName={this.props.userName}
    //     socket={this.props.socket}
    //   />);
    //   // console.log(swiper);
    // } 
    // let test = (
    //   <View>
    //     <Text> Test </Text>
    //   </View>        
    // );
    return (
      <View style={Styles.container}>
        <MapView
          style={Styles.map}
          region={this.props.region}
          initialRegion={this.props.region}
          onRegionChange={region => this.onRegionChange(region)}
          // showsUserLocation={this.props.showUserLocation} //TODO: need to add this function
        >
          <MapView.Marker
            coordinate={{
              latitude: this.props.region.latitude,
              longitude: this.props.region.longitude,
            }}
          >
            <Icon
              name="map-pin"
              size={Metrics.icons.small}
              color={'blue'}
            />
          </MapView.Marker>

          {this.props.notifications
            .map(notification => { return {
              notification,
              Icon: NotificationCategories[notification.categoryId].icon,
            }})
            .map((NotificationObj, index) => (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: NotificationObj.notification.location.coordinates[0],
                  longitude: NotificationObj.notification.location.coordinates[1],
                }}
                event={EventObj.event}
                style={Styles.marker}
                onPress={() => this.handlePressIcon(EventObj.event)}
              >
                <View color="#4F8EF7" syle={Styles.icon} >
                  <EventObj.Icon size={Metrics.icons.small} />
                </View>
              </MapView.Marker>
            ))
          }
        </MapView>
        <RadialMenu
          socket={this.props.socket}
          region={this.props.region}
          userId={this.props.userId}
          />
        {this.state.openSwiper ? 
          (<NotificationScreen 
            event={this.state.displayedEvent}
          />) : null}
      </View>
    );
  }
}

MapViewComponents.propTypes = {
  region: PropTypes.object,
  updateRegion: PropTypes.function,
};

/*
                <MapView.Callout style={Styles.callout} >
                  <MapCalloutContainer
                    event={EventObj.event}
                    events={this.props.events}
                    userName={this.props.userName}
                    socket={this.props.socket}
                  />
                </MapView.Callout>

*/
