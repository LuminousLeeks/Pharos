import React, { PropTypes } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps'
import Styles from './Styles/MapviewStyle';
import { Metrics } from '../Themes';

const MapCallout = ({ event, handleThumbsUpIsPressed, handleThumbsDownIsPressed  }) => {
 return (
  <View >
    <Text style={Styles.text} >{event.title}</Text>
    <Text style={Styles.text} >{event.category}</Text>
    <View style={Styles.flex} >
      <Text style={Styles.count} >{event.voteCount}</Text>
      {
        !event.votable ?
          <View style={Styles.flex}>
            <Button transparent onPress={handleThumbsUpIsPressed}>
              <Icon name="thumbs-o-up" size={Metrics.icons.small} color={'blue'} />
            </Button>
            <Button transparent onPress={handleThumbsDownIsPressed}>
              <Icon name="thumbs-o-down" size={Metrics.icons.small} color={'blue'} />
            </Button>
          </View>
          : <View>Hiasdsa</View>
    }
    </View>
  </View>
)};

MapCallout.propTypes = {
  event: PropTypes.object
};

export default MapCallout;
