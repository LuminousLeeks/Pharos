// @flow

import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: Colors.snow,
  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 4,
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  rowLabel: {
    color: Colors.charcoal,
  },
  textInput: {
    height: 40,
    color: Colors.snow,
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel,
  },
  updateButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.charcoal,
    backgroundColor: '#0A69FE',
    padding: 6,
  },
  updateText: {
    textAlign: 'center',
    color: Colors.panther,
  },
});
