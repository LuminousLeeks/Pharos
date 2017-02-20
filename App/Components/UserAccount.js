import React, { Component, PropTypes } from 'react';
import { Container, Content, List, ListItem } from 'native-base';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Styles from './Styles/UserAccountStyle';


class UserAccount extends Component {

  // componentWillMount() {
  //   this.props.fetchAccountScreenInfo();
  // }

  render() {
    const { username, firstName, lastName, email, radius, userSubscriptions } = this.props;
    return (
      <ScrollView style={Styles.container}>
        <Container>
          <Content>
            <List>
              <ListItem>
                <Text>
                  <Text>Username: </Text>
                  <Text>{`${username}`}</Text>
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <Text>Full Name: </Text>
                  <Text>{`${firstName} ${lastName}`}</Text>
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <Text>Email: </Text>
                  <Text>{`${email}`}</Text>
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <Text>Radius: </Text>
                  <Text>{`${radius}`}</Text>
                </Text>
              </ListItem>
              <ListItem>
                <Text>
                  <Text>Notification Subscriptions: </Text>
                  <Text>Click here...</Text>
                </Text>
              </ListItem>
            </List>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

UserAccount.propTypes = {
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  radius: PropTypes.number,
  // userSubscriptions: PropTypes.array,
  // fetchAccountScreenInfo: PropTypes.func,
};

export default UserAccount;
