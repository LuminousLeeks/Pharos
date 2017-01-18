import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapCallout from '../Components/MapCallout'
import { sendVoteToState, sendVoteToServer } from '../Actions/index.js'


const mapStateToProps = (state, ownProps) => ({
  notification: ownProps.notification,

  userName: state.userName,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleThumbsUpIsPressed: () => {
    const votedNotification = {
      ...ownProps.notification,
      voteCount: ownProps.notification.voteCount + 1,
      votable: false,
    };

    const notifications = ownProps.notifications;
    notifications.forEach((notification, index, array) => {
      if (notification.notificationId === votedNotification.notificationId) {
        array.splice(index, 1, votedNotification);
      }
    });
    const updateNotificationsArray = notifications;

    // dispatch(sendVoteToState(updateNotificationsArray));
    dispatch(sendVoteToServer({
      userName: ownProps.userName,
      notificationId: ownProps.notification.notificationId,
      vote: true,
    }));
  },
  handleThumbsDownIsPressed: () => {
    const votedNotification = {
      ...ownProps.notification,
      voteCount: ownProps.notification.voteCount - 1,
      votable: false,
    };

    const notifications = ownProps.notifications;
    notifications.forEach((notification, index, array) => {
      if (notification.notificationId === votedNotification.notificationId) {
        array.splice(index, 1, votedNotification);
      }
    });
    const updatedNotificationsArray = notifications;

    // dispatch(sendVoteToState(updatedNotificationsArray));
    dispatch(sendVoteToServer({
      userName: ownProps.userName,
      notificationId: ownProps.notification.notificationId,
      vote: false,
    }));
  },
});

const MapCalloutContainer = connect(mapStateToProps, mapDispatchToProps)(MapCallout);

MapCalloutContainer.propTypes = {
  notification: PropTypes.object,
  userName: PropTypes.string,
  notifications: PropTypes.array,
};

export default MapCalloutContainer;
