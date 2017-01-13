// @flow
import React from 'react';
import { Container, Text, Content, InputGroup, Button, Input } from 'native-base';
import { Actions as NavigationActions } from 'react-native-router-flux';
import Styles from './Styles/ReportEventFormsStyle';

class ReportEventForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    };
  }

  handleChange(target) {
    console.log(this);
    console.log(props);
    this.setState({ description: target });
  }

  handleSubmit() {
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
              onChange={this.handleChange}
            />
        </InputGroup>
        <Button
          onPress={this.handleSubmit}
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
// const ReportEventForms = ({ newEvent }) =>(
//   <Container>
//     <Content style={{padding:20}}>
//       <Text
//         style={{alignSelf: 'center', marginTop:200, marginBottom: 20}}
//       >
//        {'Report: ' + newEvent.description + ', ' + newEvent.event}
//       </Text>
//       <InputGroup borderType='rounded'>
//           <Input
//             style={{height:300, marginTop:20}}
//             stackedLabel
//             label="Report"
//             placeholder="add more details about event"
//           />
//       </InputGroup>
//       <Button
//       style={{
//         alignSelf: 'center',
//         marginTop: 20,
//         marginBottom: 20
//       }}>
//           Submit
//       </Button>
//     </Content>
//   </Container>
// );

export default ReportEventForms;
