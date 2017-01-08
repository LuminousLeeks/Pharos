
import React from 'react'
import { connect } from 'react-redux'
import ReportEventForms from '../Components/ReportEventForms'

// ReportEventScreen.defaultProps = {
//   dispatch: () => {}
// };

const mapStateToProps = (state) => {
  return {
  newEvent: state.newEvent
  // newEvent: {}
}}

// const mapDispatchToProps = () => {}

export default connect(mapStateToProps, null)(ReportEventForms)
