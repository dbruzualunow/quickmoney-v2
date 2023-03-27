import { StyleSheet } from 'react-native';
import Colors from '../../../Themes/Colors';

export default StyleSheet.create({
    mainContainer: {
        padding: 0,
        borderRadius: 10,
    },
    greenRowContainer: {
        backgroundColor: Colors.green,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,

    },
    innerContainer: {
        padding: 20
    },
    rankingText: {
        color: 'white',
        padding: 5,
        paddingLeft: 20,
        fontSize: 16,
        fontWeight: 'bold'
    },
    avatarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    avatarContainerStyle: {
        backgroundColor: Colors.green,
        marginRight: 10,
    },
    username: {
        fontWeight: 'bold'
    },
    timeAgo: {
        flex: 15,
        textAlign: 'right',
        color: '#88889e'
    },
    hasWinAmmount: {
        marginLeft: 40
    }

})