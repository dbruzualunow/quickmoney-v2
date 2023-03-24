import React, { useEffect, useState } from 'react'
import { View, Modal, Text, StyleSheet, Pressable, ImageBackground, Image, Platform, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Feather'
import LinearGradient from 'react-native-linear-gradient';
import { Craps } from '../Games/Craps';
import translate from './../../I18n';
import { horizontalScale, moderateScale, verticalScale } from '../../../Metrics';

export const CrapsModal = ({ visible, onBack, onSelected }) => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const [numberActive, setNumberActive] = useState(null)
    const [animationValue, setAnimationValue] = useState(null)
    const [showButton, setShowButton] = useState(false)

    const alazar = () => {
        const number = numbers[Math.floor(Math.random() * numbers.length)];
        setNumberActive(number)
        setAnimationValue(number)
        setShowButton(true)
    }

    const toggleNumberActive = (number) => {
        setNumberActive(number)
        setAnimationValue(number)
        onSelected(number)
    }

    useEffect(() => {
        setShowButton(numberActive !== null)
    }, [numberActive])

    const handleOnBack = () => {
        setNumberActive(null)
        setAnimationValue(null)
        onBack()
    }
    return (
        <Modal
            visible={visible}
            transparent={true}
        >

            <ImageBackground
                source={require('../../Assets/Images/backgroundRojo.png')}
                resizeMode="cover"
                style={{ flex: 1 }}
            >
                <View style={styles.container}>
                    <View style={{ paddingTop: Platform.OS === 'ios' ? verticalScale(45) : verticalScale(15) }}>
                        <Pressable onPress={() => handleOnBack()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='chevron-left' size={23} color={'white'} />
                                <Text
                                    style={{ fontFamily: 'SFProDisplay-Bold', fontSize: moderateScale(17), fontWeight: 'bold', color: 'white' }}
                                    allowFontScaling={false}
                                >
                                    {translate('general.goBack')}
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                        <Text
                            style={styles.titleCrap}
                            allowFontScaling={true}
                            adjustsFontSizeToFit={false}
                        >
                            ESCOGE UN NUMERO PARA TU DADO
                        </Text>
                    <View style={styles.containerCrap}>
                        <View style={styles.subContainCrap}>
                            <Craps
                                value={numberActive}
                                animationValue={animationValue}
                                isAnimate={true}
                                styleValue={{ height: verticalScale(250), width: horizontalScale(190) }}
                                resizeModeValue='contain'
                            />
                        </View>
                        <View style={{
                            zIndex: 5,
                            justifyContent: 'center',
                            marginBottom: verticalScale(70),
                        }}>
                            <Pressable onPress={() => alazar()}>
                                <LinearGradient
                                    colors={['rgba(116, 53, 0, 1)', 'rgba(255, 246, 193, 1)', 'rgba(243, 231, 149, 1)', 'rgba(203, 105, 4, 1)', 'rgba(235, 134, 6, 1)', 'rgba(184, 93, 0, 1)', 'rgba(142, 63, 6, 1)']}
                                    style={styles.buttonAlazar}
                                >
                                    <Text style={{ fontSize: moderateScale(15), color: 'white', fontWeight: 'bold' }} allowFontScaling={true} adjustsFontSizeToFit={false}>{translate('game.random')}</Text>
                                </LinearGradient>
                            </Pressable>
                        </View>
                        <View style={styles.numberContainerCrap}>
                            <View style={styles.numberCraps}>
                                {
                                    numbers.map((number, key) => {
                                        return (
                                            <Pressable style={{
                                                width: "30%", marginVertical: 5
                                            }} key={key} onPress={() => {
                                                toggleNumberActive(number)
                                            }}>
                                                <View style={{
                                                    borderWidth: 3,
                                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                                    borderRadius: moderateScale(12),
                                                    height: verticalScale(50),
                                                    justifyContent: "center",
                                                    alignContent: "center",
                                                    backgroundColor: "#333",
                                                    backgroundColor: numberActive === number ? 'white' : 'transparent',
                                                }}>
                                                    <Text
                                                        style={{
                                                            fontSize: moderateScale(20),
                                                            textAlign: "center",
                                                            fontWeight: 'bold',
                                                            color: numberActive === number ? '#0D5B2B' : 'white',
                                                            borderRadius: moderateScale(12),
                                                        }}>
                                                        {number}
                                                    </Text>
                                                </View>
                                            </Pressable>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={styles.buttonEndContainer}>
                            {
                                showButton && (
                                    <Pressable
                                        onPress={() => {
                                            onSelected(numberActive)
                                            setAnimationValue(null)
                                            setNumberActive(null)
                                            onBack()
                                        }}
                                    >
                                        <LinearGradient
                                            colors={['rgba(116, 53, 0, 1)', 'rgba(255, 246, 193, 1)', 'rgba(243, 231, 149, 1)', 'rgba(203, 105, 4, 1)', 'rgba(235, 134, 6, 1)', 'rgba(184, 93, 0, 1)', 'rgba(142, 63, 6, 1)']}
                                            style={styles.buttonAceptar}
                                        >
                                            <Text style={{ fontSize: moderateScale(16), color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>{translate('general.accept')}</Text>
                                        </LinearGradient>
                                    </Pressable>
                                )
                            }
                        </View>
                        <View style={{ position: "absolute", zIndex: 0, bottom: 0, height: verticalScale(300) }}>
                            <Image
                                source={require('../../Assets/Images/puntaDeMesa.png')}
                                resizeMode="cover"
                                style={{ height: verticalScale(300) }}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </Modal >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonAlazar: {
        alignItems: 'center',
        width: horizontalScale(150),
        borderRadius: moderateScale(14),
        borderColor: '#743101',
        padding: 15,
    },
    buttonAceptar: {
        alignItems: 'center',
        width: '100%',
        borderRadius: moderateScale(14),
        borderColor: '#743101',
        padding: 15,
    },
    containerCrap: {
        flex: 1,
        alignItems: 'center',
        marginTop: verticalScale(25),
    },
    titleCrap: {
        fontFamily: 'Casino-Regular',
        fontSize: moderateScale(30),
        minWidth: horizontalScale(320),
        paddingHorizontal: horizontalScale(10),
        paddingVertical: verticalScale(15),
        color: '#CBCCAA',
        textAlign: 'center',
    },
    subContainCrap: {
        flex: 1,
        width: horizontalScale(300),
        alignItems: 'center',
        bottom: verticalScale(40),
    },
    numberContainerCrap: {
        height: verticalScale(170),
        position: "relative",
        zIndex: 1,
        justifyContent: "center",
    },
    numberCraps: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginHorizontal: horizontalScale(50),
    },
    buttonEndContainer: {
        height: verticalScale(50),
        width: horizontalScale(250),
        zIndex: 2,
    }
})







