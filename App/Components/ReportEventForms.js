// @flow
import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { Container, Text, Content, InputGroup, Button, Input } from 'native-base';
import Styles from './Styles/ReportEventFormsStyle';


class ReportEventForms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
    }
  }

  render() {
    return (
      <Container>
        <Content style={{ padding: 20 }}>
          <Text
            style={{ alignSelf: 'center', marginTop: 200, marginBottom: 20 }}
            >
            {'Report: ' + this.props.newNotification.description + ', ' + this.props.newNotification.event}
          </Text>
          <InputGroup borderType="rounded">
            <Input
              style={{ height: 300, marginTop: 20 }}
              stackedLabel
              onChangeText={(text) => this.setState({ description: text })}
              label="Report"
              placeholder="add more details about event"
            />
          </InputGroup>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Button
            primary
            onPress={() =>
              this.props.handleSubmit(
                this.props.newNotification,
                this.state.description,
                this.props.notificationLocation,
                this.props.userId,
              )}
            style={{
              alignSelf: 'flex-start',
              margin: 20,
            }}
          >
            Submit
          </Button>
          <Button
            danger
            onPress={() => this.props.redirectToMapview()}
            style={{
              alignSelf: 'flex-end',
              margin: 20,
            }}>
            Cancel
          </Button>
        </View>
        </Content>
      </Container>
    );
  }
}

ReportEventForms.propTypes = {
  redirectToMapview: PropTypes.func,
  newEvent: PropTypes.Object,
  userId: PropTypes.number,
  newNotification: PropTypes.Object,
  notificationLocation: PropTypes.Object,
  handleSubmit: PropTypes.func,
};

export default ReportEventForms;
