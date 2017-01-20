import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Notification from '../Components/Notification';
import { sendVoteToState, sendVoteToServer } from '../Actions'


const mapStateToProps = (state, ownProps) => ({
  event: ownProps.event,

  username: state.username,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleThumbsUpIsPressed: () => {
    dispatch(sendVoteToServer({
      userName: ownProps.userName,
      eventId: ownProps.event.eventId,
      vote: true,
    }));
  },
  handleThumbsDownIsPressed: () => {
    dispatch(sendVoteToServer({
      userName: ownProps.userName,
      eventId: ownProps.event.eventId,
      vote: false,
    }));
  },
});

const NotificationScreen = connect(mapStateToProps, mapDispatchToProps)(Notification);

NotificationScreen.propTypes = {
  event: PropTypes.object,
  userName: PropTypes.string,
  events: PropTypes.array,
};

export default NotificationScreen;
