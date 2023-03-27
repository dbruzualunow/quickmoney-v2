import React from 'react'
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedConfeti } from '../../Components/AnimatedConfeti/AnimatedConfeti';
import translate from '../../I18n';
import Icon from 'react-native-vector-icons/dist/Feather'

export const Congratulations = ({ navigation, route }) => {

    const { prizeWin } = route.params;

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


            <Image
                source={require('./../../Assets/Images/Felicidades.png')}
                resizeMode="contain"
                style={styles.image}
            />

            <View style={styles.reward}>
                <Text style={styles.textReward}>Has ganado</Text>
                <Text style={{ ...styles.textReward, fontSize: 40, fontWeight: 'bold' }}> {prizeWin} €</Text>
            </View>

            <View
                style={{
                    position: 'absolute',
                    height: 600,
                    width: 600,
                    bottom: 200,
                }}>
                <AnimatedConfeti />
            </View>
            <View
                style={{
                    position: 'absolute',
                    height: 600,
                    width: 600,
                    bottom: 200,
                }}>
                <AnimatedConfeti />
            </View>
            <View
                style={{
                    position: 'absolute',
                    height: 600,
                    width: 600,
                    bottom: 200,
                }}>
                <AnimatedConfeti />
            </View>

            <Pressable onPress={() => navigation.navigate('Home')}>
                <LinearGradient
                    colors={['rgba(116, 53, 0, 1)', 'rgba(255, 246, 193, 1)', 'rgba(243, 231, 149, 1)', 'rgba(203, 105, 4, 1)', 'rgba(235, 134, 6, 1)', 'rgba(184, 93, 0, 1)', 'rgba(142, 63, 6, 1)']}
                    style={styles.buttonAceptar}
                >
                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>{translate('general.accept')}</Text>
                </LinearGradient>
            </Pressable>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '80%',
        alignSelf: 'center',
    },
    buttonAceptar: {
        alignItems: 'center',
        width: '90%',
        borderRadius: 14,
        borderColor: '#743101',
        padding: 15,
        position: 'absolute',
        alignSelf: 'center',
        bottom: 10
    },
    reward: {
        alignItems: 'center',
        top: -80,
    },
    textReward: {
        fontSize: 20,
        color: 'white',
    }
})
