
import React from 'react'
import { connect } from 'react-redux'
import ReportEventForms from '../Components/ReportEventForms'

// ReportEventScreen.defaultProps = {
//   dispatch: () => {}
// };

const mapStateToProps = (state) => ({
  newEvent: state.newEvent
})

const mapDispatchToProps = () => {}

export default connect(mapStateToProps, mapDispatchToProps)(ReportEventForms)
