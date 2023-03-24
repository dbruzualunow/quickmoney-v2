import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../Themes/Colors';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
        padding: 15,
        minHeight: Dimensions.get('screen').height
    },
    addExplanation: {
        fontSize: 20,
        paddingBottom: 30
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: 50
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    tickets: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.winGreen
    }
})