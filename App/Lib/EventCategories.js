import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'




export default {
  waitTime: {
    key: 'waitTime',
    description: 'Long wait time',
    icon: ({size}) => (<FontAwesome name='clock-o' size= {size}/>),
    events: [
      'line for restaurant',
      'line for movie',
      'line for bus'
    ]
  },
  crime: {
    key: 'crime',
    description: 'Crimes found',
    icon: ({size}) => (<FontAwesome name='bug' size= {size}/>),
    events: [
      'theft',
      'gun man',
      'bumb'
    ]
  },
  publicEvent: {
    key: 'publicEvent',
    description: 'Public events',
    icon: ({size}) => (<FontAwesome name='bullhorn' size= {size}/>),
    events: [
      'music festival',
      'farmer market',
      'free food'
    ]
  },
  hazard: {
    key: 'hazard',
    description: 'Hazard events',
    icon: ({size}) => (<FontAwesome name='flag' size= {size}/>),
    events: [
      'fire',
      'flood',
      'Pokemon'
    ]
  },
  commute: {
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
