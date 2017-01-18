import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'




export default {
  3: {
    key: 'waitTime',
    description: 'Long wait time',
    icon: ({size}) => (<FontAwesome name='clock-o' size= {size}/>),
    events: [
      'line for restaurant',
      'line for movie',
      'line for bus'
    ]
  },
  2: {
    key: 'crime',
    description: 'Crimes found',
    icon: ({size}) => (<FontAwesome name='bug' size= {size}/>),
    events: [
      'theft',
      'gun man',
      'bumb'
    ]
  },
  4: {
    key: 'publicEvent',
    description: 'Public events',
    icon: ({size}) => (<FontAwesome name='bullhorn' size= {size}/>),
    events: [
      'music festival',
      'farmer market',
      'free food'
    ]
  },
  1: {
    key: 'hazard',
    description: 'Hazard events',
    icon: ({size}) => (<FontAwesome name='flag' size= {size}/>),
    events: [
      'fire',
      'flood',
      'Pokemon'
    ]
  },
  5: {
    key: 'commute',
    description: 'Commute related events',
    icon: ({size}) => (<FontAwesome name='car' size= {size}/>),
    events: [
      'traffic',
      'accident',
      'police on sight'
    ]
  },
}
