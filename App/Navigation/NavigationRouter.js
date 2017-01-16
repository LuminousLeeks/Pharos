// @flow

import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Styles from './Styles/NavigationContainerStyle';
import NavigationDrawer from './NavigationDrawer';

// screens identified by the router
// import Mapview from '../Containers/Mapview'
import MapScreen from '../Containers/MapScreen';
import LoginScreen from '../Containers/LoginScreen';
import ReportNotificationScreen from '../Containers/ReportNotificationScreen';
import UserAccountScreen from '../Containers/UserAccountScreen';
import SignUpPage from '../Containers/SignUpPage';
import CategoriesList from '../Containers/CategoriesList';
// import socket from '../Lib/socket'
/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render() {
    return (
      <Router>
        <Scene
          key="drawer"
          component={NavigationDrawer}
          open={false}
        >
          <Scene
            key="drawerChildrenWrapper"
            navigationBarStyle={Styles.navBar}
            titleStyle={Styles.title}
            leftButtonIconStyle={Styles.leftButton}
            rightButtonTextStyle={Styles.rightButton}
          >
            <Scene
              // initial
              key="mapScreen"
              component={MapScreen}
              title="Map"
            />
            <Scene
              // initial
              key="loginScreen"
              component={LoginScreen}
              title="Login"
            />
            <Scene
              // initial
              key="userAccountScreen"
              component={UserAccountScreen}
              title="User Account"
            />
            <Scene
              key="reportNotificationScreen"
              component={ReportNotificationScreen}
              title="Report Notification"
            />
            <Scene
              // initial
              key="signUpPage"
              component={SignUpPage}
              title="Sign Up"
            />
            <Scene
              key="categoriesList"
              component={CategoriesList}
              title="Select Categories"
           />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default NavigationRouter;
