import React, { PropTypes } from 'react';
import { Badge, Button } from 'native-base';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions as NavigationActions } from 'react-native-router-flux';
import RadialMenu from '../Components/RadialMenu_npm';
import Styles from './Styles/RadialMenuStyles';
import EventCategories from '../Lib/EventCategories';
import { partialReport } from '../Actions';

class RadialMenuComponent extends React.Component {
  handleReport(newEvent) {
    this.props.dispatch(partialReport(newEvent));
    NavigationActions.reportEventScreen();
  }

  handleSelect(events, description, key) {
    Alert.alert(
      'Report event category: ' + description,
      null,
      events.map((event) => {
        return {
          text: event,
          onPress: () => {
            const newEvent = {
              userName: this.props.userName,
              category: key,
              latitude: this.props.region.latitude,
              longitude: this.props.region.longitude,
              userId: this.props.userId,
              event,
              description,
            };
            this.handleReport(newEvent);
          },
        };
      }),
    );
  }

  render() {
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
            .map(EventCategoryKey => EventCategories[EventCategoryKey])
            .map((EventCategory, index) =>
              <Button
                style={Styles.option}
                warning
                key={index}
                onSelect={() => {
                  this.handleSelect(EventCategory.events,
                    EventCategory.description,
                    EventCategory.key);
                }}
              >
                <EventCategory.icon size={30} />
              </Button>,
            )
          }
        </RadialMenu>
      </View>
    );
  }
}

RadialMenuComponent.propTypes = {
  userName: PropTypes.string,
  region: PropTypes.object,
  userId: PropTypes.number,
};

const mapStateToProps = state => ({
  userName: state.userName,
});


RadialMenuComponent = connect(mapStateToProps)(RadialMenuComponent);

export default RadialMenuComponent
