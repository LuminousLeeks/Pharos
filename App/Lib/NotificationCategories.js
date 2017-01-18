import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default {
  3: {
    key: 'waitTime',
    description: 'Long wait time',
    icon: ({size}) => (<FontAwesome name='clock-o' size= {size}/>),
    notifications: [
      'line for restaurant',
      'line for movie',
      'line for bus'
    ]
  },
  2: {
    key: 'crime',
    description: 'Crimes found',
    icon: ({size}) => (<FontAwesome name='bug' size= {size}/>),
    notifications: [
      'theft',
      'gun man',
      'bumb'
    ]
  },
  4: {
    key: 'publicNotification',
    description: 'Public notifications',
    icon: ({size}) => (<FontAwesome name='bullhorn' size= {size}/>),
    notifications: [
      'music festival',
      'farmer market',
      'free food'
    ]
  },
  1: {
    key: 'hazard',
    description: 'Hazard notifications',
    icon: ({size}) => (<FontAwesome name='flag' size= {size}/>),
    notifications: [
      'fire',
      'flood',
      'Pokemon'
    ]
  },
  5: {
    key: 'commute',
    description: 'Commute related notifications',
    icon: ({size}) => (<FontAwesome name='car' size= {size}/>),
    notifications: [
      'traffic',
      'accident',
      'police on sight'
    ]
  },
}
