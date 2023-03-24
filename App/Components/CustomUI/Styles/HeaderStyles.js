import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    backContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: Dimensions.get('window').width / 2,
    },
    backTitle: {
        color: 'white',
        marginLeft: 5,
        fontSize: 20,
        fontWeight: 'bold'
    },
    logo: {
        width: 30,
        height: 30
    },
    iconContainer: {
        flexDirection: 'row'
    },
    icon: {
        width: 25,
        height: 25,
        marginHorizontal: 5
    },
    userLinkContainer: {
        alignItems: 'center'
    },
    myProfileText: {
        color: 'white'
    }
})