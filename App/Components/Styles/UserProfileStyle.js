
import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  text: {
    ...Fonts.style.h5,
    color: Colors.snow,
    marginVertical: Metrics.baseMargin,
  },
});
