import React from 'react'
import { Badge } from 'native-base';

import { View, Alert } from 'react-native'

import RadialMenu from './RadialMenu_npm'
import Styles from './Styles/RadialMenuStyles'

// import IconButton from './IconButton'

const Application = React.createClass({
  handleSelect: function(category) {
    Alert.alert(
      'Report event category: ' + category,
      null,
      [
        {text: 'Foo', onPress: () => console.log('Foo Pressed!')},
        {text: 'Bar', onPress: () => console.log('Bar Pressed!')},
        {text: 'Baz', onPress: () => console.log('Baz Pressed!')},
      ]
    )
  },
  render: function() {
    return (
      <View style={Styles.menu}>
        <RadialMenu
          onOpen={() => {}}
          onClose={() => {}}
          itemRadius={50}
          menuRadius={150}
          spreadAngle={90}
          startAngle={0}
        >
          <Badge style={Styles.root}>Report</Badge>
          <Badge style={Styles.option} primary onSelect={() => {this.handleSelect('B')}}>B</Badge>
          <Badge style={Styles.option} success onSelect={() => {this.handleSelect('C')}}>C</Badge>
          <Badge style={Styles.option} info onSelect={() => {this.handleSelect('D')}}>D</Badge>
          <Badge style={Styles.option} warning onSelect={() => {this.handleSelect('E')}}>E</Badge>
          <Badge style={Styles.option} danger onSelect={() => {this.handleSelect('F')}}>F</Badge>          
        </RadialMenu>
      </View>
    )
  }
})

export default Application

