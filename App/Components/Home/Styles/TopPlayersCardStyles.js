import { StyleSheet } from 'react-native';
import Colors from '../../../Themes/Colors';

export default StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 30,
    },
    topPlayerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        maxWidth: '100%',
    },
    avatarContainerStyle: {
        backgroundColor: Colors.green,
    },
    avatarUsernameContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    addedAmount: {
        color: Colors.winGreen,
        fontSize: 15
    },
})