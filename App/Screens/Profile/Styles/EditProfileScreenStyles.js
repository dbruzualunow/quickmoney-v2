import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../Themes/Colors';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
        minHeight: Dimensions.get('screen').height,
        padding: 20
    },
})