<<<<<<< HEAD
import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  LayoutAnimation,
  Button,
  }
  from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { Actions as NavigationActions } from 'react-native-router-flux';

//Actions
import { registerRequest } from '../Actions/index.js';
// Styles
import { Images, Metrics } from '../Themes';
import Styles from './Styles/SignUpPageStyle';
=======
// @flow

import React from 'react';
import { ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Actions as NavigationActions } from 'react-native-router-flux';
import { registerRequest } from '../Actions/index.js';
// Styles
import styles from './Styles/SignUpPageStyle';
>>>>>>> (feat) Build new Update Profile Page and Sign Up Page

class SignUpPage extends React.Component {

  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.state = {
      selected1: undefined,
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth },
    };
    this.isAttempting = false;
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }
    onValueChange(e) {
    this.setState({
      selected1: e.target.value,
    });
  }
  handlePressRegister = () => {
    const { username,
      password,
      firstName,
      lastName,
      email } = this.state;
    const userInfo = {
      firstName,
      lastName,
      email,
    };
    this.isAttempting = true;
    this.props.attemptRegister(username, password, userInfo);
  }
  render() {
    return (
      <ScrollView style={Styles.container}>
        <Container>
          <Content>
            <List>
              <ListItem>
                <Icon name="user" size={30} />
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input
                   label="First Name"
                  onChangeText={(text) => this.setState({firstName: text})} placeholder="First" />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input
                    label="Last Name"
                    onChangeText={(text) => this.setState({lastName: text})} placeholder="Last" />
                </InputGroup>
              </ListItem>
              <ListItem>
                <Icon name="envelope" size={30}/>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input
                    label="Email"
                    placeholder="Email"
                    onChangeText={(text) => this.setState({email: text})} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <Icon name="user" size={30} />
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input label="Username"
                  onChangeText={(text) => this.setState({username: text})} placeholder="username"
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <Icon name="lock" size={30} />
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input placeholder="password"
                    onChangeText={(text) => this.setState({password: text})} secureTextEntry />
                </InputGroup>
              </ListItem>
            </List>
            <TouchableOpacity style={Styles.loginButtonWrapper} onPress={ this.handlePressRegister }>
              <View style={Styles.loginButton}>
                <Text style={Styles.loginText}>Signup</Text>
              </View>
            </TouchableOpacity>
          </Content>
        </Container>
      </ScrollView>
    )
=======
    this.state = {};
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>SignUpPage</Text>
      </ScrollView>
    );
>>>>>>> (feat) Build new Update Profile Page and Sign Up Page
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
<<<<<<< HEAD
    attemptRegister: (username, password, userInfo) => dispatch(registerRequest(username, password, userInfo)),
=======
>>>>>>> (feat) Build new Update Profile Page and Sign Up Page
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
