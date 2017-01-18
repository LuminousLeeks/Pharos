
import React from 'react';
import { connect } from 'react-redux';
import { Container, Text, Content, InputGroup, Button, Input } from 'native-base';
// import Styles from './Styles/ReportNotificationFormsStyle';
import ReportNotificationForms from '../Components/ReportNotificationForms';
import { reportNotification } from '../Actions'
import { Actions as NavigationActions } from 'react-native-router-flux'

const mapStateToProps = (state) => {
  return {
    newNotification: state.newNotification,
  };
};

const mapDispatchToProps = dispatch => ({
  handleSubmit: (newNotification, description) => {
    let updatedNotification = newNotification;
    updatedNotification.description = description;
    dispatch(reportNotification(updatedNotification));
    NavigationActions.mapScreen();
  },
  redirectToMapview: () => {
    NavigationActions.mapScreen();
  }
});


const ReportNotificationScreen = connect(mapStateToProps, mapDispatchToProps)(ReportNotificationForms);
export default ReportNotificationScreen;

// export default connect(mapStateToProps, null)(ReportNotificationForms);
