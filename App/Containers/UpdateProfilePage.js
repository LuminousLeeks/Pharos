import React from 'react';
import {View, ScrollView, Image, Text, TextInput, TouchableOpacity, Keyboard,LayoutAnimation, Button, } from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon} from 'native-base';

import { connect } from 'react-redux';
import { Actions as NavigationActions } from 'react-native-router-flux';

//Actions
import { loadUserInfo, updateUserInfo  } from '../Actions/index.js';

// Styles
import { Colors, Images, Metrics } from '../Themes';
import Styles from './Styles/UpdateProfilePageStyle';

class UpdateProfilePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      //password
      visibleHeight: Metrics.screenHeight,
    };
  }

  componentWillMount () {
    this.props.loadCurrentUserInfo(this.props.userId);

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
    })
  }

  keyboardDidHide = (e) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
    })
  }
  //
  // handleUpdateUsername(e) {
  //   e.preventDefault();
  //   this.setState({
  //     username: e.target.value,
  //   });
  // }
  handleUpdateFirstName(e) {
    e.preventDefault();
    this.setState({
      firstName: e.target.value,
    });
  }
  handleUpdateLastName(e) {
    e.preventDefault();
    this.setState({
      lastName: e.target.value,
    });
  }
  handleUpdateEmail(e) {
    e.preventDefault();
    this.setState({
      email: e.target.value,
    });
  }
  // handleUpdatePassword(e) {
  //   this.setState({
  //     password: e.target.value,
  //   });
  // }
  handleSubmit = () => {
    // e.preventDefault();
    const context = this;

    const userInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email
    }

    console.log(userInfo, this.state.userId, context.state.userId, 'handle Submit');

    this.props.updateUserInfo(context.state.userId, userInfo);

    NavigationActions.UserProfile();
  }
  render() {
    const { firstName, lastName, email} = this.state;
    return (
      <ScrollView style={Styles.container}>
        <Container>
          <Content>
            <List>
              <ListItem>
              <Text>Update Profile Below</Text>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Icon
                    name="ios-person"
                    style={{ color: Colors.panther }}
                  />
                  <Input inlineLabel
                    label="First Name"
                    ref="firstName"
                    placeholder="Update First Name"
                    value={firstName}
                    keyboardType='default'
                    returnKeyType='next'
                    autoCapitalize='none'
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    onChange={this.handleUpdateFirstName.bind(this)}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Icon
                    name="ios-person"
                    style={{ color: Colors.panther }}
                  />
                  <Input inlineLabel
                    label="Last Name"
                    ref="lastName"
                    placeholder="Update Last Name"
                    value={lastName}
                    keyboardType='default'
                    returnKeyType='next'
                    autoCapitalize='none'
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    onChange={this.handleUpdateLastName.bind(this)}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Icon name="ios-person"
                    style={{ color: Colors.panther }}
                  />
                  <Input inlineLabel
                    ref="email"
                    label="Email"
                    placeholder="Update Email"
                    value={email}
                    keyboardType='email-address'
                    returnKeyType='next'
                    autoCapitalize='none'
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    onChange={this.handleUpdateEmail.bind(this)}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Icon
                    name="ios-unlock"
                    style={{ color: Colors.panther }}
                  />
                  <Input
                    ref="password"
                    inputSuccessBorderColor={Colors.facebook}
                    placeholder="Update Password"
                    secureTextEntry
                  />
                </InputGroup>
              </ListItem>
            </List>
            <TouchableOpacity
              onSubmit={() => {this.handleSubmit}}
            >
              <View style={Styles.updateButton}>
                <Text style={Styles.updateText}>Submit and Save</Text>
              </View>
            </TouchableOpacity>
          </Content>
      </Container>
    </ScrollView>
    )
  }
}
const mapStateToProps = (state) => {
    console.log(state)
  return {
    userId: state.userId,
    username: state.username,
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    visibleHeight: Metrics.screenHeight,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadCurrentUserInfo: (userId) => {
      dispatch(loadUserInfo(userId))
    },
    updateUserInfo: (userId) => {
      dispatch(updateUserInfo(userId, userInfo))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfilePage);
