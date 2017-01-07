import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


export default {
  waitTime: {
    description: 'Long wait time',
    icon: ({size}) => (<FontAwesome name='hand-rock-o' size= {size}/>),
    events: ['evantA', 'eventB', 'eventC']
  },
  crime: {
    description: 'Crimes found',
    icon: ({size}) => (<FontAwesome name='hand-paper-o' size= {size}/>),
    events: ['evantD', 'eventE', 'eventF']
  },
  publicEvent: {
    description: 'Public events',
    icon: ({size}) => (<FontAwesome name='hand-scissors-o' size= {size}/>),
    events: ['evantG', 'eventH', 'eventI']
  },
  hazard: {
    description: 'Hazard events',
    icon: ({size}) => (<FontAwesome name='hand-lizard-o' size= {size}/>),
    events: ['evantJ', 'eventK', 'eventL']
  },
  commute: {
    description: 'Commute related events',
    icon: ({size}) => (<FontAwesome name='hand-spock-o' size= {size}/>),
    events: ['evantM', 'eventN', 'eventO']
  },
}
