/* eslint-disable */
import React, { Component, PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import MapView from 'react-native-maps';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Metrics } from '../Themes';
import Styles from './Styles/MapViewComponentsStyle';
import RadialMenu from '../Containers/RadialMenu';
import MapCalloutContainer from '../Containers/MapCalloutContainer';
import NotificationCategories from '../Lib/NotificationCategories';
// import MapCalloutContainer from '../Containers/MapCalloutContainer';
import NotificationScreen from '../Containers/NotificationScreen';
import SnackBar from './SnackbarDialog_npm';

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
  handlePressIcon(notification, Icon) {
    console.log(notification);
    const descriptions = `${notification.title}: ${notification.description}`;
    const upvoteIcon = (
      <FontAwesomeIcon name="thumbs-o-up" size={Metrics.icons.medium} color={'blue'} />
    )
    const downvoteIcon = (
      <FontAwesomeIcon name="thumbs-o-down" size={Metrics.icons.medium} color={'blue'} /> 
    )    
    let vote = {
      notificationId: notification.id,
      userId: this.props.userId,
    }
    // console.log(this.props.events);
    SnackBar.show(descriptions, {
      confirmText: upvoteIcon,
      onConfirm: () => {
        console.log('upvoted');
        SnackBar.dismiss();
        vote.type = true;
        // this.props.voteForNotification(vote);

      },
      cancelText: downvoteIcon,
      onCancel: () => {
        console.log('downvoted')
        SnackBar.dismiss()
        vote.type = false;
        // this.props.voteForNotification(vote);        
      },
      summaryText: `Current Vote Count: ${notification.voteCount}  `,
      onSummary: () => {},
    })
  }

  render() {
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
            style={{
              zIndex: 10,
            }}
          >
            <FontAwesomeIcon
              name="crosshairs"
              size={Metrics.icons.medium}
              color={'red'}
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
                event={NotificationObj.notification}
                style={Styles.marker}
                onPress={() => {
                  this.handlePressIcon(NotificationObj.notification, NotificationObj.Icon)
                }}
              >
                <View color="#4F8EF7" style={Styles.icon} >
                  <NotificationObj.Icon
                    size={Metrics.icons.small}
                    color={'blue'}
                  />
                  <Image
                    source={require('../Images/mapmarker2.png')}
                    style={{
                      width: 50,
                      height: 50,
                      position: 'absolute',
                      top: -7,
                      left: -16,
                      zIndex: -1,
                    }}
                  />
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
      </View>
    );
  }
}

MapViewComponents.propTypes = {
  region: PropTypes.object,
  updateRegion: PropTypes.func,
  userId: PropTypes.number,
  voteForNotification: PropTypes.func,

};

/*
                  </Image>


                <MapView.Callout style={Styles.callout} >
                  <MapCalloutContainer
                    event={EventObj.event}
                    events={this.props.events}
                    userName={this.props.userName}
                    socket={this.props.socket}
                  />
                </MapView.Callout>

*/
