// @flow

import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: Colors.snow
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  rowLabel: {
    color: Colors.charcoal
  },
  textInput: {
    height: 40,
    color: Colors.snow
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
  },
  loginButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.panther,
    backgroundColor: Colors.panther,
    padding: 6
  },
  loginText: {
    textAlign: 'center',
    color: Colors.snow,
  },
  Icon: {
    color: Colors.panther,
  },
});
