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
import Styles from './Styles/UpdateProfilePageStyle';

class UpdateProfilePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
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
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
    })
  }
    onValueChange(e) {
    this.setState({
      selected1: e.target.value,
    });
  }
  handlePressUpdate = () => {
    const { username, firstName, lastName, email } = this.state;
    this.isAttempting = true;
    this.props.attempt(username, password);
  }
  render() {
    return (
        <Container>
          <Content>
            <List>
              <ListItem>
                <InputGroup>
                  <Input inlineLabel label="First Name" placeholder="John" value=""/>
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input inlineLabel label="Last Name" placeholder="Appleseed" value=""/>
                </InputGroup>
              </ListItem>
              <ListItem>
              <InputGroup>
                <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                <Input placeholder="Email" />
              </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                  <Input placeholder="PASSWORD" secureTextEntry />
                </InputGroup>
              </ListItem>
            </List>
            <TouchableOpacity style={Styles.updateButtonWrapper} onPress={ this.handlePressUpdate }>
              <View style={Styles.updateButton}>
                <Text style={Styles.updateText}>Signup</Text>
              </View>
            </TouchableOpacity>
          </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfilePage);
