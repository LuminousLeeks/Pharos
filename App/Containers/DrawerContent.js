import React, { Component } from 'react';
import { ScrollView, BackAndroid } from 'react-native';
import styles from './Styles/DrawerContentStyle';
import DrawerButton from '../Components/DrawerButton';
import { Actions as NavigationActions } from 'react-native-router-flux';

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
  handlePressMapView() {
    this.toggleDrawer();
    NavigationActions.mapScreen();
  }
  handlePressProfilePage() {
    this.toggleDrawer();
    NavigationActions.userProfilePage();
  }
  handlePressCategoriesList() {
    this.toggleDrawer();
    NavigationActions.categoriesList();
  }
  handlePressLoginScreen() {
    this.toggleDrawer();
    NavigationActions.loginScreen();
  }
  handlePressMapScreen() {
    this.toggleDrawer();
    NavigationActions.mapScreen();
  }
  handlePressLogoutScreen() {
    this.toggleDrawer();
    NavigationActions.logoutScreen();
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <DrawerButton text="Map View" onPress={this.handlePressMapView.bind(this)} />
        <DrawerButton text="Profile" onPress={this.handlePressProfilePage.bind(this)} />
        <DrawerButton text="Categories List" onPress={this.handlePressCategoriesList.bind(this)} />
        <DrawerButton text="Logout" onPress={this.handlePressLogoutScreen.bind(this)} />
      </ScrollView>
    );
  }
}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object,
};

export default DrawerContent;
