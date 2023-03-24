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
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 30,
        marginBottom: 10
    },
    activityIndicator: {
        alignSelf: 'center',
        width: Dimensions.get('screen').width - 20 * 2,
        minHeight: 300
    }
})