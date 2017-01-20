import React, { PropTypes } from 'react';
import { Badge, Button } from 'native-base';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions as NavigationActions } from 'react-native-router-flux';
import RadialMenu from '../Components/RadialMenu_npm';
import Styles from './Styles/RadialMenuStyles';
import NotificationCategories from '../Lib/NotificationCategories';
import { partialReport } from '../Actions';

class RadialMenuComponent extends React.Component {
  handleReport(newNotification) {
    this.props.dispatch(partialReport(newNotification));
    NavigationActions.reportNotificationScreen();
  }


  handleSelect(notifications, description, key) {

    // helper function to get category id
    const getCategoryId = (categoryName) => {
      for(let prop in NotificationCategories) {
        if (NotificationCategories[prop].key === categoryName) {
          return parseInt(prop, 10);
        }
      }
      return 0; // throws error;
    };

    Alert.alert(
      'Report notification category: ' + description,
      null,
      notifications.map((title) => {
        return {
          text: title,
          onPress: () => { // TODO : add title to it
            const newNotification = {
              userName: this.props.userName,
              category: key,
              latitude: this.props.region.latitude,
              longitude: this.props.region.longitude,
              userId: this.props.userId,
              categoryId: getCategoryId(key),
              title,
              description,
            };
            this.handleReport(newNotification);
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
          { Object.keys(NotificationCategories)
            .map(NotificationCategoryKey => NotificationCategories[NotificationCategoryKey])
            .map((NotificationCategory, index) =>
              <Button
                style={Styles.option}
                warning
                key={index}
                onSelect={() => {
                  this.handleSelect(NotificationCategory.notifications,
                    NotificationCategory.description,
                    NotificationCategory.key);
                }}
              >
                <NotificationCategory.icon size={30} color={'black'} />
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
