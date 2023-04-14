import {StyleSheet} from 'react-native';
import Colors from '../../../Themes/Colors';

export default StyleSheet.create({
  flex:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card:{
  //  backgroundColor: 'red'
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',

  },
    gameImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  titleSimulatorChain: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap'
  },
  line: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
  },
  imageContainer:{
    alignSelf: 'center',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // height: 177,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,

  },
  // addedAmount: {
  //   color: Colors.winGreen,
  //   textAlign: 'right',
  //   fontSize: 15,
  // },
  avatarContainerStyle: {
    backgroundColor: Colors.green,
    marginRight: 10,
  },
  alignRight: {
    textAlign: 'right',
    marginBottom: 0
  },
  chainSimulatorContainer: {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    height: '100%', 
    width: '100%', 
    flexDirection: 'row'
  },
  // username: {
  //   textAlign: "right",
  //   fontSize: 14,
  // }
});
