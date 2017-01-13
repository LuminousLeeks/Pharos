// @flow
import React from 'react';
import { Container, Text, Content, InputGroup, Button, Input } from 'native-base';
import Styles from './Styles/ReportEventFormsStyle';

class ReportEventForms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: ''
    }
  }

  render() {
    return (
      <Container>
        <Content style={{padding:20}}>
          <Text
            style={{alignSelf: 'center', marginTop:200, marginBottom: 20}}
            >
            {'Report: ' + this.props.newEvent.description + ', ' + this.props.newEvent.event}
          </Text>
          <InputGroup borderType='rounded'>
            <Input
              style={{height:300, marginTop:20}}
              stackedLabel
              onChangeText={text => this.setState({ description: text })}
              label="Report"
              placeholder="add more details about event"
              />
          </InputGroup>
          <Button
            onPress={() => this.props.handleSubmit(this.props.newEvent, this.state.description)}
            style={{
              alignSelf: 'center',
              marginTop: 20,
              marginBottom: 20
            }}>
            Submit
          </Button>
        </Content>
      </Container>
    );
  }
}

export default ReportEventForms;
