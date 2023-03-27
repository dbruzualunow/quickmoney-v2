import {Dimensions, Platform, StyleSheet} from 'react-native';
import {colors} from 'react-native-elements';
import Colors from '../../../Themes/Colors';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    minHeight: Dimensions.get('screen').height,
    padding: 20,
    paddingBottom: 200,
  },
  outer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'justify',
  },
  instructions: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    textTransform: 'uppercase',
  },
  sticky: {
    position: 'sticky',
    top: 0,
  },
  floatingCTAButtonContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 150 : 130,
    width: '80%',
    alignSelf: 'center',
  },
  totalUsers: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  smallTopText: {
    fontSize: 15,
    color: Colors.green,
  },
  topRows: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 15,
    marginTop: 20,
  },
});
