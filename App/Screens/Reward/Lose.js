import React, { useEffect, useRef } from 'react'
import { ImageBackground, Pressable, StyleSheet, Text, Animated, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/dist/Feather'

export const Lose = ({ navigation }) => {

    const fadeAnim = useRef(new Animated.Value(0)).current;



    const fadeIn = () => {

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true
        }).start();
    };
    useEffect(() => {

        fadeIn();

    }, [])

    return (
        <ImageBackground
            source={require('./../../Assets/Images/BackgroundMain.jpg')}
            style={styles.container}
        >

            <View style={{
                zIndex: 1,
                top: 40,
                alignSelf: 'flex-start',
            }}>
                <Pressable onPress={
                    () => navigation.goBack()
                }>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='chevron-left' size={23} color={'white'} />
                        <Text style={{ fontFamily: 'SFProDisplay-Bold', fontSize: 17, fontWeight: 'bold', color: 'white' }}> Revisar</Text>
                    </View>
                </Pressable>
            </View>


            <ImageBackground
                source={require('./../../Assets/Images/SorryBackground.png')}
                resizeMode="contain"
                style={styles.image}
            >

                <Animated.Image
                    source={require('./../../Assets/Images/_(.png')}
                    resizeMode="contain"
                    style={[styles.imageAnimated, { opacity: fadeAnim }]}
                />

            </ImageBackground>

            <Pressable onPress={() => navigation.navigate('Home')}>
                <View>
                <LinearGradient
                    colors={['rgba(116, 53, 0, 1)', 'rgba(255, 246, 193, 1)', 'rgba(243, 231, 149, 1)', 'rgba(203, 105, 4, 1)', 'rgba(235, 134, 6, 1)', 'rgba(184, 93, 0, 1)', 'rgba(142, 63, 6, 1)']}
                    style={styles.buttonAceptar}
                >
                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>{translate('general.accept')}</Text>
                </LinearGradient>
                </View>
            </Pressable>

        </ImageBackground >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '90%',
        alignSelf: 'center',
    },
    buttonAceptar: {
        alignItems: 'center',
        width: '90%',
        borderRadius: 14,
        borderColor: '#743101',
        padding: 15,
        // position: 'absolute',
        alignSelf: 'center',
    },
    imageAnimated: {
        width: '100%',
        height: '25%',
        alignSelf: 'center',
        marginTop: '70%',
    }
})
