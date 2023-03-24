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
        fontSize: 18,
        marginVertical: 30
    },
    paymentRowContainer: {
        borderBottomWidth: 3,
        borderColor: '#f2f5f6',
        paddingVertical: 20
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ammount: {
        color: '#e6492d',
        fontWeight: 'bold'
    },
    completedStatus: {
        color: '#addcbb'
    },
    date: {
        color: '#a6a6a6'
    }
})