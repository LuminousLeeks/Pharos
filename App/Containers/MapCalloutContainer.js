import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapCallout from '../Components/MapCallout'
import { sendVoteToState, sendVoteToServer } from '../Actions/index.js'


const mapStateToProps = (state, ownProps) => ({
  event: ownProps.event,

  userName: state.userName,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleThumbsUpIsPressed: () => {
    const votedEvent = {
      ...ownProps.event,
      voteCount: ownProps.event.voteCount + 1,
      votable: false,
    };

    const events = ownProps.events;
    events.forEach((event, index, array) => {
      if (event.eventId === votedEvent.eventId) {
        array.splice(index, 1, votedEvent);
      }
    });
    const updateEventsArray = events;

    // dispatch(sendVoteToState(updateEventsArray));
    dispatch(sendVoteToServer({
      userName: ownProps.userName,
      eventId: ownProps.event.eventId,
      vote: true,
    }));
  },
  handleThumbsDownIsPressed: () => {
    const votedEvent = {
      ...ownProps.event,
      voteCount: ownProps.event.voteCount - 1,
      votable: false,
    };

    const events = ownProps.events;
    events.forEach((event, index, array) => {
      if (event.eventId === votedEvent.eventId) {
        array.splice(index, 1, votedEvent);
      }
    });
    const updatedEventsArray = events;

    // dispatch(sendVoteToState(updatedEventsArray));
    dispatch(sendVoteToServer({
      userName: ownProps.userName,
      eventId: ownProps.event.eventId,
      vote: false,
    }));
  },
});

const MapCalloutContainer = connect(mapStateToProps, mapDispatchToProps)(MapCallout);

MapCalloutContainer.propTypes = {
  event: PropTypes.object,
  userName: PropTypes.string,
  events: PropTypes.array,
};

export default MapCalloutContainer;
