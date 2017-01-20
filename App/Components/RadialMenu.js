import React from 'react'
import RadialMenu from 'react-native-radial-menu'

var Application = React.createClass({
  render: function() {
    return (
      <View>
        <RadialMenu onOpen={() => {}} onClose={() => {}}>
          <Text>ROOT</Text>
          <Text onSelect={() => {}}>A</Text>
          <Text onSelect={() => {}}>B</Text>
          <Text onSelect={() => {}}>C</Text>
          <Text onSelect={() => {}}>D</Text>
        </RadialMenu>
      </View>
    )
  }
})

export default Application
