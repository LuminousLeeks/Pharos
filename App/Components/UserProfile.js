import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  }
  from 'react-native';
import { Container, Content, List, ListItem } from 'native-base';
import { Actions as NavigationActions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Metrics } from '../Themes';
import Styles from './Styles/UserProfileStyle';


class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('componentWillMount');
    // console.log(type)
    this.props.fetchUserInfo(this.props.userId);
    console.log('in componentWillMount');
    console.log(typeof this)
  }
  handleClick(){
    NavigationActions.updateProfilePage();
    console.log('in handleClick');
    console.log(typeof this)
    this.props.updateUserInfo();
  }
  render() {
    return (
      <ScrollView>
        <Container>
          <Content>
            <List>
              <ListItem>

              </ListItem>
              <ListItem>
                <Text>Email
                  <Text>{this.props.userInfo.email}</Text>
                </Text>
              </ListItem>
              <ListItem>
                <Text> Full Name
                  <Text>{`${this.props.userInfo.firstName} ${this.props.userInfo.lastName}`}</Text>
                </Text>
              </ListItem>
              <ListItem >
                <Text > Email</Text>
              </ListItem>
              <TouchableOpacity
                style={Styles.updateButtonWrapper}
                onPress={this.handleClick}
              >
                <Text style={Styles.updateButton}>
                  <Text style={Styles.updateText}>Change Profile Settings</Text>
                </Text>
              </TouchableOpacity>
            </List>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

UserProfile.propTypes = {
  userId: PropTypes.string,
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  updateUserInfo: PropTypes.function,
  fetchUserInfo: PropTypes.function,
};

export default UserProfile;
