import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../Themes/Colors';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        padding: 15,
        minHeight: Dimensions.get('screen').height
    },
    iconBackContainerStyle: {
        alignSelf: 'flex-start',
        padding: 5
    },
    randomGameText: {
        color: Colors.green,
        textDecorationLine: 'underline',
        paddingVertical: 5,
        fontSize: 16
    },
    partText: {
        fontWeight: 'bold',
        fontSize: 18
    },
    selectedNumber: {
        alignSelf: 'center',
        fontWeight: 'bold',
        marginVertical: 15
    },
    backgroundImage: {
        height: 130,
        width: 130,
        alignSelf: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    selectButton: {
        borderRadius: 100,
        backgroundColor: Colors.green,
        padding: 10,
        alignContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
    overlayStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
        padding: 15,
        minHeight: Dimensions.get('screen').height,
        alignContent: 'center',
        // justifyContent: 'center'
    },
    modalImage: {
        height: 250,
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        margin: 10,
        marginBottom: 50
    }


})