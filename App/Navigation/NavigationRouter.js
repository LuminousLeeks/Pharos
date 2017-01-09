// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'

// screens identified by the router
import Mapview from '../Containers/Mapview'
import MapScreen from '../Containers/MapScreen'
import LoginScreen from '../Containers/LoginScreen'
import MapScreen from '../Containers/MapScreen'
import ReportEventScreen from '../Containers/ReportEventScreen'

import socket from '../Lib/socket'
/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
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
            rightButtonTextStyle={Styles.rightButton}>
            <Scene
              key='mapview'
              component={Mapview}
              title='Pharos'
              props={ {socket: socket} }
              />
            <Scene
              initial
              key='mapScreen'
              component={MapScreen}
              title='Pharos'
              props={ {socket: socket} }
              />
            <Scene
              key='loginScreen'
              component={LoginScreen}
              title='Login Screen'
              socket={ {socket: socket} }
              />
            <Scene
              key='reportEventScreen'
              component={ReportEventScreen}
              title='Report Event'
              socket={ {socket: socket} }
              />
            <Scene
              key='mapScreen'
              component={MapScreen}
              title='Pharos'
              socket={ {socket: socket} }
              />
          </Scene>
        </Scene>
      </Router>
    )
  };
};

export default NavigationRouter
