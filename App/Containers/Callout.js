import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from './Styles/MapviewStyle';
import { Metrics } from '../Themes';

class Callout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notification: props.notification,
    };
  }

  handleThumbsUpIsPressed() {
    this.setState({
      notification: {
        ...this.state.notification,
        votingDisabled: true,
        voteCount: this.state.notification.voteCount + 1,
      },
    });

    const vote = {
      // TODO: add user id
      userId: null,
      notificationId: this.state.notification.id,
      vote: false,
    };

    // TODO: send update to server via some  sendToServer function which will
    // send date through the socket
    // sendToServer(vote)
  }

  handleThumbsDownIsPressed() {
    this.setState({
      notification: {
        ...this.state.notification,
        votingDisabled: true,
        voteCount: this.state.notification.voteCount - 1,
      },
    });

    const vote = {
      // TODO: add user id
      userId: null,
      notificationId: this.state.notification.id,
      vote: false,
    };

    // TODO: send update to server via some  sendToServer function which will
    // send date through the socket
    // sendToServer(vote)
  }

  render() {
    return (
      <View >
        <Text style={Styles.text} >{this.state.notification.title}</Text>
        <Text style={Styles.text} >{this.state.notification.category}</Text>
        <View style={Styles.flex} >
        <Text style={Styles.count} >{this.state.notification.voteCount}</Text>
          {
            /*!this.state.notification.votingDisabled ?*/
              <View style={Styles.flex}>
                <Button transparent onPress={this.handleThumbsUpIsPressed.bind(this)}>
                  <Icon name="thumbs-o-up" size={Metrics.icons.medium} color={'blue'} />
                </Button>
                <Button transparent onPress={this.handleThumbsDownIsPressed.bind(this)}>
                  <Icon name="thumbs-o-down" size={Metrics.icons.medium} color={'blue'} />
                </Button>
              </View>
              /*: <View />*/
          }
        </View>
      </View>
    );
  }
}

Callout.propTypes = {
  notification: PropTypes.object,
};

export default Callout;
