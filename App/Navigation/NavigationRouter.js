// @flow

import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Styles from './Styles/NavigationContainerStyle';
import NavigationDrawer from './NavigationDrawer';

// screens identified by the router
// import Mapview from '../Containers/Mapview'
import MapScreen from '../Containers/MapScreen';
import LoginScreen from '../Containers/LoginScreen';
<<<<<<< HEAD
import ReportEventScreen from '../Containers/ReportEventScreen';
=======
import ReportNotificationScreen from '../Containers/ReportNotificationScreen';
>>>>>>> upstream/master
import CategoriesList from '../Containers/CategoriesList';
import UserProfilePage from '../Containers/UserProfilePage';
import SignUpPage from '../Containers/SignUpPage';
// import socket from '../Lib/socket'
/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render() {
    return (
      <Router>
        <Scene
          key='drawer'
          component={NavigationDrawer}
          open={false}>
          <Scene
            key='drawerChildrenWrapper'
            navigationBarStyle={Styles.navBar}
            titleStyle={Styles.title}
            leftButtonIconStyle={Styles.leftButton}
            rightButtonTextStyle={Styles.rightButton}
          >
            <Scene
              key='mapScreen'
              component={MapScreen}
              title='Pharos'
            />
            <Scene
              initial
              key="loginScreen"
              component={LoginScreen}
              title="Login Screen"
            />
<<<<<<< HEAD
            <Scene
              // initial
              key="signUpPage"
              component={SignUpPage}
              title="Sign-Up"
            />
            <Scene
              // initial
              key="categoriesList"
              component={CategoriesList}
              title="CategoriesList"
            />
            <Scene
              key='reportEventScreen'
              component={ReportEventScreen}
              title='Report Event'
            />
            <Scene
              // initial
=======
            <Scene
              // initial
              key="signUpPage"
              component={SignUpPage}
              title="Sign-Up"
            />
            <Scene
              // initial
              key="categoriesList"
              component={CategoriesList}
              title="CategoriesList"
            />
            <Scene
              key='reportNotificationScreen'
              component={ReportNotificationScreen}
              title='Report Notification'
            />
            <Scene
              // initial
>>>>>>> upstream/master
              key="userProfilePage"
              component={UserProfilePage}
              title="User Profile Page"
            />
          </Scene>
        </Scene>
      </Router>
    )
  };
};

export default NavigationRouter;
