import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 8,
        // DEPTH 3 -> https://ethercreative.github.io/react-native-shadow-generator/
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
})