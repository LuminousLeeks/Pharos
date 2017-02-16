import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default {
  3: {
    key: 'waitTime',
    description: 'Long wait time',
    icon: ({size, color}) => (<FontAwesome name='clock-o' size={size} color={color} />),
    notifications: [
      'line for restaurant',
      'line for movie',
      'line for bus'
    ]
  },
  2: {
    key: 'crime',
    description: 'Crimes found',
    icon: ({size, color}) => (<FontAwesome name='bug' size={size} color={color} />),
    notifications: [
      'theft',
      'gun man',
      'bumb'
    ]
  },
  4: {
    key: 'publicNotification',
    description: 'Public notifications',
    icon: ({size, color}) => (<FontAwesome name='bullhorn' size={size} color={color} />),
    notifications: [
      'music festival',
      'farmer market',
      'free food'
    ]
  },
  1: {
    key: 'hazard',
    description: 'Hazard notifications',
    icon: ({size, color}) => (<FontAwesome name='flag' size={size} color={color} />),
    notifications: [
      'fire',
      'flood',
      'Pokemon'
    ]
  },
  5: {
    key: 'commute',
    description: 'Commute related notifications',
    icon: ({size, color}) => (<FontAwesome name='car' size={size} color={color} />),
    notifications: [
      'traffic',
      'accident',
      'police on sight'
    ]
  }
}
