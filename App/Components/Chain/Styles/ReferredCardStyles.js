import {Dimensions, Platform, StyleSheet} from 'react-native';
import {colors} from 'react-native-elements';
import Colors from '../../../Themes/Colors';

export default StyleSheet.create({
  card: {
    padding: 0,
    borderRadius: 8,
  },
  heading: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.white,
    textTransform: 'uppercase',
  },
  headingWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.green,
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  logo: {
    height: 20,
    width: 20,
    marginRight: 10,
  },
  body: {
    paddingHorizontal: 25,
    paddingTop: 15,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  userAmount: {
    fontSize: 15,
  },
});
