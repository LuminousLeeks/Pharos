// @flow

import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import Styles from './Styles/NavigationContainerStyle'
import NavigationDrawer from './NavigationDrawer'

// screens identified by the router
import Mapview from '../Containers/Mapview'

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
              initial
              key='mapview'
              component={Mapview}
              title='Pharos'
              />
          </Scene>
        </Scene>
      </Router>
    )
  };
};

export default NavigationRouter
