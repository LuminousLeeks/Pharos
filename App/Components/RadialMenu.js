import React from 'react'
import { Badge, Button } from 'native-base';

import { View, Alert } from 'react-native'

import RadialMenu from './RadialMenu_npm'
import Styles from './Styles/RadialMenuStyles'
import EventCategories from '../Lib/EventCategories'
// const Icon = EventCategories.waitTime.icon

// import Icon.FontAwesome from 'react-native-vector-icons/FontAwesome'
// import FontAwesome from 'react-native-vector-icons/FontAwesome'

// import IconButton from './IconButton'
const EventCategory = EventCategories.waitTime;
const Application = React.createClass({
  handleSelect: function(events, description) {
    Alert.alert(
      'Report event category: ' + description,
      null,
      events.map((event) => {
        return {
          text: event,
          onPress: (event) => {console.log(event)}
        }
      })
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
          { Object.keys(EventCategories)
            .map((EventCategoryKey) => EventCategories[EventCategoryKey])
            .map((EventCategory, index) => 
              <Button
                style={Styles.option}
                warning
                key={index} 
                onSelect={() => {
                  this.handleSelect(EventCategory.events, EventCategory.description)
                }}
              >
                <EventCategory.icon size={30} />
              </Button>
            ) 
          }
        </RadialMenu>
      </View>
    )
  }
})

export default Application


