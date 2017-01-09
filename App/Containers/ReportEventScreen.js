
import React from 'react'
import { connect } from 'react-redux'
import ReportEventForms from '../Components/ReportEventForms'

// ReportEventScreen.defaultProps = {
//   dispatch: () => {}
// };

const mapStateToProps = (state) => {
  console.log(state, ' state inside the report event screen');
  return {
    newEvent: state.mapAction.newEvent,
  // newEvent: {}
  };
};

// const mapDispatchToProps = () => {}
const ReportEventScreen = connect(mapStateToProps, null)(ReportEventForms);
export default ReportEventScreen;

// export default connect(mapStateToProps, null)(ReportEventForms);
