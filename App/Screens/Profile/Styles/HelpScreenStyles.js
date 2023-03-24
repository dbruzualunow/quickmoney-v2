import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../Themes/Colors';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        minHeight: Dimensions.get('screen').height,
        padding: 20,
        paddingBottom: 100
    },
    faqTitle: {
        padding: 20,
    },
})