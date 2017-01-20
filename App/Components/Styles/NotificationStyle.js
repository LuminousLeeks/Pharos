// @flow

import { StyleSheet } from 'react-native';
import { ApplicationStyles } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  view: {
    // flex: 1,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    width: 300,
    height: 220,
    marginTop: 200,
    borderRadius: 20,
  },
  container: {
    height: 300,
  },
  callout: {
    position: 'relative',
    width: 200,
  },
  flex: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 100,
  },
  text: {
    fontSize: 15,
    width: 200,
  },
  count: {
    marginTop: 10,
    fontSize: 30,
    color: 'blue',
  },
  cardItem: {
    height: 150,
  },
});
