import React, { useEffect, useState } from 'react'
import { View, Modal, Text, StyleSheet, Pressable, ImageBackground, Image, Platform, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Feather'
import LinearGradient from 'react-native-linear-gradient';
import { Tragaperra } from '../Games/Tragaperra';
import { alazar } from '../../helpers/Alazar';
import translate from '../../I18n';
import { horizontalScale, moderateScale, verticalScale } from '../../../Metrics';

export const TragaperraModal = ({ visible, onBack, onSelected, currentMinigameIndex, tragaperraIndex, numNumbersAvailable }) => {

    const [symbolActive, setSymbolActive] = useState(null);
    const [amountSlots, setAmountSlots] = useState(numNumbersAvailable);
    const [slots, setSlots] = useState(Array.from({ length: amountSlots }).fill('jackpot'));
    const [showButton, setShowButton] = useState(false);
    const [animationValue, setAnimationValue] = useState(null);

    const symbolSelection = [
        { value: require('../../Assets/Images/Tragaperras/Iconos-png/siete_icon.png'), name: 'siete_icon' },
        { value: require('../../Assets/Images/Tragaperras/Iconos-png/naranja_icon.png'), name: 'naranja_icon' },
        { value: require('../../Assets/Images/Tragaperras/Iconos-png/patilla_icon.png'), name: 'patilla_icon' },
        { value: require('../../Assets/Images/Tragaperras/Iconos-png/bar1_icon.png'), name: 'bar1_icon' },
        { value: require('../../Assets/Images/Tragaperras/Iconos-png/bar2_icon.png'), name: 'bar2_icon' },
        { value: require('../../Assets/Images/Tragaperras/Iconos-png/bar3_icon.png'), name: 'bar3_icon' },
        { value: require('../../Assets/Images/Tragaperras/Iconos-png/kiwi_icon.png'), name: 'kiwi_icon' },
        { value: require('../../Assets/Images/Tragaperras/Iconos-png/cereza_icon.png'), name: 'cereza_icon' },
        { value: require('../../Assets/Images/Tragaperras/Iconos-png/herradura_icon.png'), name: 'herradura_icon' },

    ]



    const imagesMaquinas =
    {
        2: require(`./../../Assets/Images/Tragaperras/Iconos-png/Maquina/Maquina_2.png`),
        3: require(`./../../Assets/Images/Tragaperras/Iconos-png/Maquina/Maquina_3.png`),
        4: require(`./../../Assets/Images/Tragaperras/Iconos-png/Maquina/Maquina_4.png`)
    }


    useEffect(() => {
        setAmountSlots(numNumbersAvailable);
        setSlots(Array.from({ length: numNumbersAvailable }).fill('jackpot'));
    }, [numNumbersAvailable])

    useEffect(() => {
        if (!visible) {
            setSymbolActive(null)
        }
    }, [visible])

    const toggleSymbolActive = (symbol) => {
        setShowButton(true);
        setSymbolActive(symbol);

        const _slots = [...slots]
        _slots[currentMinigameIndex] = symbol;

        setSlots(_slots)
        setAnimationValue(symbol)
        onSelected(symbol)
    }

    const handleOnBack = () => {
        onBack()
        setAnimationValue(null)
    }

    const handleRandom = () => {
        const random = alazar(0, symbolSelection.length - 1, symbolActive)
        toggleSymbolActive(symbolSelection[random].name)
    }

    return (
        <Modal visible={visible}>
            <ImageBackground
                source={require('../../Assets/Images/BackgroundMain.jpg')}
                resizeMode="cover"
                style={{ flex: 1 }}
            >
                <View style={styles.container}>

                    <View style={{ marginTop: Platform.OS === 'ios' ? verticalScale(45) : verticalScale(15) }}>
                        <Pressable onPress={() => handleOnBack()}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon name='chevron-left' size={23} color={'white'} />
                                <Text style={{ fontFamily: 'SFProDisplay-Bold', fontSize: moderateScale(17), fontWeight: 'bold', color: 'white' }}>{translate('general.goBack')}</Text>
                            </View>
                        </Pressable>
                    </View>
                    <Text style={styles.titleTragaperrasContainer}>
                        ESCOGE UN SIMBOLO PARA LA TRAGAPERRAS
                    </Text>
                    <View style={styles.containerTragaperras}>
                        <View style={styles.subContainerTragaperras}>
                            <Image
                                source={imagesMaquinas[amountSlots] || require(`../../Assets/Images/Tragaperras/Iconos-png/Maquina/Maquina_4.png`)}
                                resizeMode="cover"
                                style={styles.imageTragaperra}
                            />
                            <View style={styles.tragaperrasResult}>
                                {
                                    slots.map((_, index) => {
                                        return (
                                            <Tragaperra
                                                key={index}
                                                animationValue={animationValue}
                                                isAnimate={true}
                                                disable={currentMinigameIndex !== index}
                                                valueIndex={tragaperraIndex[index]}
                                                inGame
                                                value={slots[index]}
                                                styleValue={{ width: horizontalScale(40), height: verticalScale(55), marginHorizontal: horizontalScale(4.5) }}
                                            />
                                        )
                                    })
                                }
                            </View>

                        </View>
                        <View style={{
                            zIndex: 1,
                            bottom: verticalScale(80),
                        }}>
                            <Pressable onPress={() => handleRandom()}>
                                <LinearGradient
                                    colors={['rgba(116, 53, 0, 1)', 'rgba(255, 246, 193, 1)', 'rgba(243, 231, 149, 1)', 'rgba(203, 105, 4, 1)', 'rgba(235, 134, 6, 1)', 'rgba(184, 93, 0, 1)', 'rgba(142, 63, 6, 1)']}
                                    style={styles.buttonAlazar}
                                >
                                    <Text style={{ fontSize: moderateScale(15), color: 'white', fontWeight: 'bold' }}>{translate('game.random')}</Text>
                                </LinearGradient>
                            </Pressable>
                        </View>


                        <View style={{ zIndex: 1 }}>

                            <View style={styles.figuresTragaperras}>
                                {
                                    symbolSelection.map((item, index) => {
                                        return (
                                            <Pressable key={index} style={{
                                                width: horizontalScale(70), marginVertical: verticalScale(5),
                                            }} onPress={() => {
                                                toggleSymbolActive(item.name);
                                            }}>
                                                <View style={{
                                                    borderWidth: 3,
                                                    borderColor: 'rgba(255, 255, 255, 0.2)',
                                                    borderRadius: 12,
                                                    backgroundColor: symbolActive === item.name ? 'white' : 'transparent',
                                                }}>
                                                    <View style={{ marginHorizontal: horizontalScale(10), }}>
                                                        <Image
                                                            source={item.value}
                                                            style={{ width: horizontalScale(45), height: verticalScale(40) }}
                                                        />

                                                    </View>
                                                </View>
                                            </Pressable>
                                        )
                                    })
                                }
                            </View>
                        </View>

                        <View style={styles.endButtonContainer}>
                            {
                                showButton && symbolActive && (
                                    <Pressable
                                        onPress={() => {
                                            onSelected(symbolActive);
                                            setAnimationValue(null)
                                            onBack();
                                        }}
                                    >
                                        <LinearGradient
                                            colors={['rgba(116, 53, 0, 1)', 'rgba(255, 246, 193, 1)', 'rgba(243, 231, 149, 1)', 'rgba(203, 105, 4, 1)', 'rgba(235, 134, 6, 1)', 'rgba(184, 93, 0, 1)', 'rgba(142, 63, 6, 1)']}
                                            style={styles.buttonAceptar}
                                        >
                                            <Text style={{ fontSize: moderateScale(15), color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>{translate('general.accept')}</Text>
                                        </LinearGradient>
                                    </Pressable>
                                )
                            }
                        </View>
                        <View style={{ position: "absolute", zIndex: 0, bottom: 0, height: verticalScale(330) }}>
                            <Image
                                source={require('../../Assets/Images/puntaDeMesa.png')}
                                resizeMode="cover"
                                style={{ height: verticalScale(335) }}
                            />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </Modal>

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
        padding: 12,
    },
    buttonAceptar: {
        alignItems: 'center',
        width: '100%',
        borderRadius: moderateScale(14),
        borderColor: '#743101',
        padding: 12,
    },
    imageTragaperra: {
        width: '100%',
        height: verticalScale(200),
    },
    containerTragaperras: {
        flex: 1,
        alignItems: 'center',
        marginTop: moderateScale(25),
        marginHorizontal: horizontalScale(40),
        maxHeight: verticalScale(600),
    },
    titleTragaperrasContainer: {
        fontFamily: 'Casino-Regular',
        fontSize: moderateScale(30),
        color: '#CBCCAA',
        textAlign: 'center',
        paddingHorizontal: horizontalScale(20),
        marginTop: verticalScale(20),
    },
    subContainerTragaperras: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
    },
    tragaperrasResult: {
        top: verticalScale(72),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        position: 'absolute',
    },
    figuresTragaperras: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginHorizontal: horizontalScale(10),
    },
    endButtonContainer: {
        height: verticalScale(60),
        width: "100%",
        zIndex: 2,
    }
})
