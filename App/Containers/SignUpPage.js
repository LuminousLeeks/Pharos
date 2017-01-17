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
import { Container, Content, List, ListItem, InputGroup, Input, Icon } from 'native-base';

import { connect } from 'react-redux';
import { Actions as NavigationActions } from 'react-native-router-flux';

//Actions
import { registerRequest } from '../Actions/index.js';
// Styles
import { Images, Metrics } from '../Themes';
import Styles from './Styles/SignUpPageStyle';

class SignUpPage extends React.Component {

  constructor(props) {
    super(props);
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
                <InputGroup>
                  <Input inlineLabel label="First Name"
                  onChangeText={(text) => this.setState({firstName: text})} placeholder="John" value=""/>
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input inlineLabel label="Last Name"
                    onChangeText={(text) => this.setState({lastName: text})} placeholder="Appleseed" value=""/>
                </InputGroup>
              </ListItem>
              <ListItem>
              <InputGroup>
                <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                <Input placeholder="Email"
                  onChangeText={(text) => this.setState({email: text})} />
              </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input inlineLabel label="Username"
                  onChangeText={(text) => this.setState({username: text})} placeholder="username" value=""/>
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
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
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    attemptRegister: (username, password, userInfo) => dispatch(registerRequest(username, password, userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
