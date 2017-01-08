// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'

// screens identified by the router
import Mapview from '../Containers/Mapview'
import LoginScreen from '../Containers/LoginScreen'
import ReportEventScreen from '../Containers/ReportEventScreen'

/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    let test = 'Report!';

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
              initial
              key='mapview'
              component={Mapview}
              title='Pharos'
              socket={test}
              />
            <Scene
              key='loginScreen'
              component={LoginScreen}
              title='Login Screen'
              socket={test}
              />
            <Scene
              key='reportEventScreen'
              component={ReportEventScreen}
              title='Report Event'
              socket={test}
              />                              
          </Scene>
        </Scene>
      </Router>
    )
  };
};

export default NavigationRouter
