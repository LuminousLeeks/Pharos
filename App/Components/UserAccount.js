import React, { Component, PropTypes } from 'react';
import { Container, Content, List, ListItem } from 'native-base';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Styles from './Styles/UserAccountStyle';
// const testProps = {
//     username: 'Sean',
//     firstName: 'Sean',
//     email: 'sean@sean.com',
//   }

class UserAccount extends Component {

  componentWillMount() {

  }

  render() {
    // console.log(this.props, 'PROPS IN PROFILE VIEW');
    const { username } = this.props;
    return (
      <ScrollView style={Styles.container}>
        <Container>
          <Content>
            <List>
              <ListItem>
                <Text>
                <Text>Username:</Text>
                  <Text>{`${username}`}</Text>
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
  // firstName: PropTypes.string,
  // lastName: PropTypes.string,
  // email: PropTypes.string,
  // radius: PropTypes.number,
  // getAccountInfo: PropTypes.func,
};

export default UserAccount;
