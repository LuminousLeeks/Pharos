import React from 'react'
import { Badge, Button } from 'native-base';

import { View, Alert } from 'react-native'
import { connect } from 'react-redux'
import RadialMenu from '../Components/RadialMenu_npm'
import Styles from './Styles/RadialMenuStyles'
import EventCategories from '../Lib/EventCategories'
import { reportEvent } from '../Actions'
import { Actions as NavigationActions } from 'react-native-router-flux'

const EventCategory = EventCategories.waitTime;
class RadialMenuComponent extends React.Component {
  handleReport (event) {
    this.props.dispatch(reportEvent(event))
    NavigationActions.reportEventScreen();
  }

  handleSelect (events, description, key) {
    Alert.alert(
      'Report event category: ' + description,
      null,
      events.map((event) => {
        return {
          text: event,
          onPress: () => {
            let event = {
              category: key,
              description: description,
              event: event
            }
            this.handleReport(event);
            // dispatch(reportEvent({}));

          }
        }
      })
    )
  }
  render () {
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
          <Badge style={Styles.root}>{this.props.socket}</Badge>
          { Object.keys(EventCategories)
            .map((EventCategoryKey) => EventCategories[EventCategoryKey])
            .map((EventCategory, index) => 
              <Button
                style={Styles.option}
                warning
                key={index} 
                onSelect={() => {
                  this.handleSelect(EventCategory.events, EventCategory.description, EventCategory.key)
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
}
RadialMenuComponent.defaultProps = {
  dispatch: () => {}
};
RadialMenuComponent = connect()(RadialMenuComponent);

export default RadialMenuComponent
