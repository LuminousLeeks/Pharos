import React, { Component, PropTypes } from 'react'
import { Container, Content } from 'native-base'
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'
import Styles from './Styles/UserProfileStyle'

// const testUser = {
//   username: 'demo',
//   firstName: 'John',
//   lastName: 'Smith',
// };

class UserProfile extends Component {
  render () {
    return (
      <View>
        <View style={[Styles.row]}>
          <Text style={Styles.rowLabel}> {`Hello + ${this.props.firstName} + ${this.props.lastName} !`}</Text>
        </View>
        <View style={[Styles.row]}>
          <Text style={Styles.rowLabel}>Username: </Text>
          <Text style={Styles.rowLabel}>{this.props.username} </Text>
        </View>
        <View style={[Styles.row]}>
          <Text style={Styles.rowLabel}>First Name: </Text>
          <Text style={Styles.rowLabel}>{this.props.firstName} </Text>
        </View>
        <View style={[Styles.row]}>
          <Text style={Styles.rowLabel}>Last Name: </Text>
          <Text style={Styles.rowLabel}>{this.props.lastName} </Text>
        </View>

        <View style={[Styles.updateRow]}>
          <TouchableOpacity
            style={Styles.updateButtonWrapper}
            onPress={() => { this.props.updateUserInfo() }}
          >
            <View style={Styles.updateButton}>
              <Text style={Styles.updateText}>Update Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

UserProfile.propTypes = {
  username: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string
}

export default UserProfile
