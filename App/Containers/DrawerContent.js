import React, { Component } from 'react';
import { ScrollView, BackAndroid } from 'react-native';
import { Actions as NavigationActions } from 'react-native-router-flux';
import styles from './Styles/DrawerContentStyle';
import DrawerButton from '../Components/DrawerButton';

class DrawerContent extends Component {

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.context.drawer.props.open) {
        this.toggleDrawer();
        return true;
      }
      return false;
    });
  }

  toggleDrawer() {
    this.context.drawer.toggle();
  }
  handlePressMapScreen() {
    this.toggleDrawer();
    NavigationActions.mapScreen();
  }
  handlePressUserProfile() {
    this.toggleDrawer();
    NavigationActions.loginScreen();
  }
  handlePressLogout() {
    this.toggleDrawer();
    NavigationActions.logout(); // TODO: add Logout screen in Nav router
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <DrawerButton text="Map Screen" onPress={this.handlePressMapScreen} />
        <DrawerButton text="Manage Account" onPress={this.handlePressUserProfile} />
        <DrawerButton text="Logout" onPress={this.handlePressLogout} />
      </ScrollView>
    );
  }
}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object,
};

export default DrawerContent;
