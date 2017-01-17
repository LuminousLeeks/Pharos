import React, { Component, PropTypes } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  }
  from 'react-native';
import { Container, Content, List, ListItem} from 'native-base';
import { Actions as NavigationActions } from 'react-native-router-flux';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Metrics,  } from '../Themes';
import Styles from './Styles/UserProfileStyle';


class UserProfile extends Component {
  render() {
    return (
      <ScrollView>
        <Container>
          <Content>
            <List>
              <ListItem>
                <Text>{`Hello + ${this.props.firstName} + ${this.props.lastName} !`}</Text>
              </ListItem>
              <ListItem>
                <Text>Username
                  <Text>{this.props.username}</Text>
                </Text>
              </ListItem>
              <ListItem>
                <Text> Full Name
                  <Text>{`${this.props.firstName} ${this.props.lastName}`}</Text>
                </Text>
              </ListItem>
              <ListItem >
                <Text > Email</Text>
              </ListItem>
              <TouchableOpacity
                style={Styles.updateButtonWrapper}
                onPress={() => {
                  NavigationActions.updateProfilePage();
                  this.props.updateUserInfo();
                }}
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
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  updateUserInfo: PropTypes.function,
};

export default UserProfile;
