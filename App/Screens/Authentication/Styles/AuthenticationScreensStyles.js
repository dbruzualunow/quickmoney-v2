import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../Themes/Colors';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.green,
        padding: 30,
        paddingVertical: 100,
        minHeight: Dimensions.get('window').height
    },
    logo: {
        width: 60,
        height: 60
    },
    whiteText: {
        color: 'white'
    },
    errorText: {
        color: 'red',
        textAlign: 'center'
    },
    forgotPasswordExplanation: {
        color: 'white',
        margin: 50,
        fontSize: 16,
        textAlign: 'center'
    }

})