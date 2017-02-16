
// import React from 'react';
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
// import { Container, Text, Content, InputGroup, Button, Input } from 'native-base';
// import Styles from './Styles/ReportNotificationFormsStyle';
import ReportNotificationForms from '../Components/ReportNotificationForms'
import { reportNotification } from '../Actions'

const mapStateToProps = state => ({
  newNotification: state.newNotification,
  notificationLocation: state.region
})

const mapDispatchToProps = dispatch => ({
  handleSubmit: (newNotification, description, location, userId) => {
    const updatedNotification = { ...newNotification, description, location }
    dispatch(reportNotification(updatedNotification, userId))
    NavigationActions.mapScreen()
  },
  redirectToMapview: () => {
    NavigationActions.mapScreen()
  }
})

const ReportNotificationScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportNotificationForms)
export default ReportNotificationScreen

// export default connect(mapStateToProps, null)(ReportNotificationForms);
