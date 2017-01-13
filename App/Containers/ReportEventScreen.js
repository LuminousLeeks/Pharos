
import React from 'react';
import { connect } from 'react-redux';
import { postNotification } from '../Actions';
import { Container, Text, Content, InputGroup, Button, Input } from 'native-base';
// import Styles from './Styles/ReportEventFormsStyle';

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
  console.log(state, ' state inside the report event screen');
  return {
    newEvent: state.newEvent,
  // newEvent: {}
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNotification: notification => (dispatch(postNotification(notification))),
  };
};

// const mapDispatchToProps = () => {}

export default connect(mapStateToProps, mapDispatchToProps)(ReportEventForms);

// export default connect(mapStateToProps, null)(ReportEventForms);
