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
    // console.log(this.props.loadLoggedInUser, 'this sending to Actions');
    this.props.loadLoggedInUser(context.props.userId);
  }
  sendToUpdatePage() {
    console.log(this.props);
    NavigationActions.updateProfilePage();
  }
  render() {
    const {username, firstName, lastName, email, radius} = this.props;
    return (
      <ScrollView style={Styles.container}>
        <Container>
          <Content>
            <List>
              <ListItem>
                <Text>Username
                  <Text>{` ${username} `}</Text>
                </Text>
              </ListItem>
              <ListItem>
                <Text>Full Name
                  <Text>{` ${firstName} ${lastName}`}</Text>
                </Text>
              </ListItem>
              <ListItem >
                <Text > Email
                  <Text>{` ${email}`}</Text>
                </Text>
              </ListItem>
              <ListItem >
                <Text >Radius
                <Text>{` ${radius}`}</Text>
                </Text>
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
  userId: PropTypes.number,
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  radius: PropTypes.string,
  loadLoggedInUser: PropTypes.func,

  // fetchUserInfo: PropTypes.func,
  // userInfo: PropTypes.object,
};

export default UserProfile;
