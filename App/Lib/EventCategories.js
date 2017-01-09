import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


export default {
  waitTime: {
    key: 'waitTime',
    description: 'Long wait time',
    icon: ({size}) => (<FontAwesome name='hand-rock-o' size= {size}/>),
    events: ['eventA', 'eventB', 'eventC']
  },
  crime: {
    key: 'crime',
    description: 'Crimes found',
    icon: ({size}) => (<FontAwesome name='hand-paper-o' size= {size}/>),
    events: ['eventD', 'eventE', 'eventF']
  },
  publicEvent: {
    key: 'publicEvent',
    description: 'Public events',
    icon: ({size}) => (<FontAwesome name='hand-scissors-o' size= {size}/>),
    events: ['eventG', 'eventH', 'eventI']
  },
  hazard: {
    key: 'hazard',
    description: 'Hazard events',
    icon: ({size}) => (<FontAwesome name='hand-lizard-o' size= {size}/>),
    events: ['eventJ', 'eventK', 'eventL']
  },
  commute: {
    key: 'commute',
    description: 'Commute related events',
    icon: ({size}) => (<FontAwesome name='hand-spock-o' size= {size}/>),
    events: ['eventM', 'eventN', 'eventO']
  },
}
