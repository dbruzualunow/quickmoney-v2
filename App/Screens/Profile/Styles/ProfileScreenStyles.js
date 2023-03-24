import { Dimensions, StyleSheet } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../../../../Metrics';
import Colors from '../../../Themes/Colors';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
        minHeight: verticalScale(700),
        paddingBottom: verticalScale(80),
    },
    avatarRowContainerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        padding: 30,
    },
    avatarContainerStyle: {
        backgroundColor: Colors.green,
        marginRight: horizontalScale(30),
    },
    username: {
        fontSize: moderateScale(22),
        fontWeight: 'bold',
        marginBottom: horizontalScale(10),
        minWidth: horizontalScale(200),
        maxWidth: horizontalScale(200),
    },
    rowIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarIcon: {
        height: horizontalScale(20),
        width: horizontalScale(20),
        marginRight: horizontalScale(10),
    },
    title: {
        fontWeight: 'bold',
        fontSize: moderateScale(22),
        padding: 10,
        paddingTop: verticalScale(15),
    },
    profileContainer: {
        width: '100%',
        paddingHorizontal: horizontalScale(20),
    },
    profileRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#E5E5E5',
        alignItems: 'center',
    },
    profileRowIcon: {
        height: 24,
        width: 24,
    }
})