import React, { PropTypes } from 'react'
import { Badge, Button } from 'native-base'
import { View, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import RadialMenu from '../Components/RadialMenu_npm'
import TopSnackBar from '../Components/TopSnackbarDialog_npm'
import Styles from './Styles/RadialMenuStyles'
import NotificationCategories from '../Lib/NotificationCategories'
import { partialReport } from '../Actions'

class RadialMenuComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      attachedNotification: 'default text'
    }
  }

  handleReport (newNotification) {
    this.props.dispatch(partialReport(newNotification))
    //! !!!----------mistake here!!!
    NavigationActions.reportNotificationScreen()
  }
  handleAttach (description) {
    if (description) {
      this.setState({
        attachedNotification: description
      }, () => {
        TopSnackBar.show(`Release to report ${description}`)
        console.log(this.state)
      })
    }
  }
  handleDetach () {
    this.setState({
      attachedNotification: 'default text'
    }, () => {
      TopSnackBar.dismiss()
      console.log(this.state)
    })
  }
  handleSelect (notifications, description, key) {
    // helper function to get category id
    TopSnackBar.dismiss()
    const getCategoryId = (categoryName) => {
      for (let prop in NotificationCategories) {
        if (NotificationCategories[prop].key === categoryName) {
          return parseInt(prop, 10)
        }
      }
      return 0 // throws error;
    }

    Alert.alert(
      'Report notification category: ' + description,
      null,
      notifications.map((title) => {
        return {
          text: title,
          onPress: () => { // TODO : add title to it
            const newNotification = {
              username: this.props.username,
              category: key,
              latitude: this.props.region.latitude,
              longitude: this.props.region.longitude,
              userId: this.props.userId,
              categoryId: getCategoryId(key),
              title,
              description
            }
            this.handleReport(newNotification)
          }
        }
      }),
    )
  }
  render () {
    return (
      <View style={Styles.menu}>
        <RadialMenu
          onOpen={() => { console.log('open') }}
          onClose={() => { console.log('close') }}
          itemRadius={50}
          menuRadius={150}
          spreadAngle={90}
          startAngle={0}
          onAttach={(description) => { this.handleAttach(description) }}
          onDetach={() => { this.handleDetach() }}
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
                    NotificationCategory.key)
                }}
                description={NotificationCategory.description}
              >
                <NotificationCategory.icon size={30} color={'black'} />
              </Button>,
            )
          }
        </RadialMenu>
      </View>
    )
  }
}

RadialMenuComponent.propTypes = {
  username: PropTypes.string,
  region: PropTypes.object,
  userId: PropTypes.number
}

const mapStateToProps = state => ({
  username: state.username
})

RadialMenuComponent = connect(mapStateToProps)(RadialMenuComponent)

export default RadialMenuComponent
