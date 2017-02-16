
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapCallout from '../Components/MapCallout';
import { sendVoteToState, sendVoteToServer } from '../Actions/index.js';

const mapStateToProps = (state, ownProps) => ({
  notification: ownProps.notification,

  username: state.username
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleThumbsUpIsPressed: () => {
    // const votedEvent = {
    //   ...ownProps.event,
    //   voteCount: ownProps.event.voteCount + 1,
    //   votable: false,
    // };

    // const events = ownProps.events;
    // events.forEach((event, index, array) => {
    //   if (event.eventId === votedEvent.eventId) {
    //     array.splice(index, 1, votedEvent);
    //   }
    // });
    // const updateEventsArray = events;

    // dispatch(sendVoteToState(updateNotificationsArray));
    dispatch(sendVoteToServer({
      username: ownProps.username,
      notificationId: ownProps.notification.notificationId,
      vote: true
    }))
  },
  handleThumbsDownIsPressed: () => {
    // dispatch(sendVoteToState(updatedNotificationsArray));
    dispatch(sendVoteToServer({
      username: ownProps.username,
      notificationId: ownProps.notification.notificationId,
      vote: false
    }))
  }
})

const MapCalloutContainer = connect(mapStateToProps, mapDispatchToProps)(MapCallout)

MapCalloutContainer.propTypes = {
  notification: PropTypes.object,
  username: PropTypes.string,
  notifications: PropTypes.object,
};

export default MapCalloutContainer
