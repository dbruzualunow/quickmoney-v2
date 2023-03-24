import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../Themes/Colors';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
        padding: 15,
        minHeight: Dimensions.get('screen').height,
        paddingBottom: 150
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 20,
        alignItems: 'center',
        paddingBottom: 30
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22
    },
    tickets: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.winGreen
    },
    description: {
        fontWeight: 'bold',
        fontSize: 15,
        alignSelf: 'flex-start',
        paddingBottom: 10,
    },
    gameExplanation: {
        width: '100%',
        fontSize: 20
    },
    priceCard: {
        borderRadius: 20,
        backgroundColor: '#F4F4F4',
        width: '90%',
        paddingVertical: 10,
        paddingHorizontal: 35,
        margin: 50
    },
    priceCardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10
    }
})