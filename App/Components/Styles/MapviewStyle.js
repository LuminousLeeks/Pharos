// @flow

import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    // For Android :/
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  callout: {
    position: 'relative',
    width: 200,
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
    width: 200,
  },
  count: {
    fontSize: 30,
    color: 'blue',
  },
});
