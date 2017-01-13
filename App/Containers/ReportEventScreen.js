
import React from 'react';
import { connect } from 'react-redux';
import { Container, Text, Content, InputGroup, Button, Input } from 'native-base';
// import Styles from './Styles/ReportEventFormsStyle';
import ReportEventForms from '../Components/ReportEventForms';
import { reportEvent } from '../Actions'
import { Actions as NavigationActions } from 'react-native-router-flux'

class ReportEventForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    };
  }

  handleChange(text) {
    console.log(text);
    this.setState({ description: text });
  }

  handleSubmit() {
    console.log(this);
    this.props.newEvent.description = this.state.description;
    this.props.submitNotification(this.props.newEvent);
  }

  render() {
    return (
    <Container>
      <Content style={ { padding:20 } }>
        <Text
          style={{alignSelf: 'center', marginTop:200, marginBottom: 20}}
        >
         {'Report: ' + this.props.newEvent.description + ', ' + this.props.newEvent.event}
        </Text>
        <InputGroup borderType='rounded'>
            <Input
              style={{height:300, marginTop:20}}
              stackedLabel
              label="Report"
              placeholder="add more details about event"
              onChangeText={this.handleChange.bind(this)}
            />
        </InputGroup>
        <Button
          onPress={this.handleSubmit.bind(this)}
          style={{
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 20,
          }}>
            Submit
        </Button>
      </Content>
    </Container>);
  }
}

const mapStateToProps = (state) => {
  return {
    newEvent: state.newEvent,
  };
};


const mapDispatchToProps = dispatch => ({
  handleSubmit: (newEvent, description) => {
    let updatedEvent = newEvent;
    updatedEvent.description = description;
    dispatch(reportEvent(updatedEvent));
    NavigationActions.mapScreen();
  },
});


const ReportEventScreen = connect(mapStateToProps, mapDispatchToProps)(ReportEventForms);
export default ReportEventScreen;

// export default connect(mapStateToProps, null)(ReportEventForms);
