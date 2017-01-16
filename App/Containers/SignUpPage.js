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

class SignUpPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>SignUpPage</Text>
      </ScrollView>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
