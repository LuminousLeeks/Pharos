import React, { Component, PropTypes } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import { Actions as NavigationActions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Metrics } from '../Themes';
import Styles from './Styles/UserProfileStyle';


class UserProfile extends Component {

  componentWillMount() {
    const context = this;
    this.props.loadLoggedInUser(context.props.userId);
  }
  sendToUpdatePage() {
    NavigationActions.updateProfilePage();
  }
  render() {
    return (
      <ScrollView style={Styles.container}>
        <Container>
          <Content>
            <List>
              <ListItem>
                <Text>Username
                  <Text>{this.props.userInfo.username}</Text>
                </Text>
              </ListItem>
              <ListItem>
                <Text> Full Name
                  <Text>{` ${this.props.userInfo.firstName} ${this.props.userInfo.lastName}`}</Text>
                </Text>
              </ListItem>
              <ListItem >
                <Text > Email</Text>
              </ListItem>
            </List>
            <TouchableOpacity
              onPress={this.sendToUpdatePage}
              style={Styles.container}
            >
              <View style={Styles.button}>
                <Text style={Styles.buttonText}>Change Profile Settings</Text>
              </View>
            </TouchableOpacity>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

UserProfile.propTypes = {
  userId: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  loadLoggedInUser: PropTypes.func,
  // fetchUserInfo: PropTypes.func,
  userInfo: PropTypes.object,
};

export default UserProfile;
