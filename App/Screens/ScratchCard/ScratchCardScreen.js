import { Image, ImageBackground, StyleSheet, Text, View, Pressable, ActivityIndicator, Dimensions, Alert, Modal, ScrollView } from 'react-native'
import { ScratchCard } from 'rn-scratch-card'
import LinearGradient from 'react-native-linear-gradient';
import React, { useState } from 'react'
import { Card } from '../../Components/Games/Card';
import { Craps } from '../../Components/Games/Craps';
import { Tragaperra } from '../../Components/Games/Tragaperra';
import { useEffect } from 'react';
import translate from "../../I18n";
import { AnimatedCurrency } from '../../Components/AnimatedCurrency/AnimatedCurrency';
import { AnimatedTransformCurrency } from '../../Components/AnimatedCurrency/AnimatedTransformCurrency';
import LocaleFormatNumber from "../../helpers/LocaleFormatNumber";
import { horizontalScale, moderateScale, verticalScale } from '../../../Metrics';

const ScratchCardScreen = ({ route, navigation }) => {
    const TYPES = ['corazones', 'treboles', 'diamantes', 'picas'];
    const [loadingAdd, setLoadingAdd] = useState(false)
    const [result, setResult] = useState(false)
    const animatedListCurrency = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    const simbolos =
    {
        10: 'jackpot',
        2: 'siete_icon',
        3: 'naranja_icon',
        4: 'patilla_icon',
        5: 'bar1_icon',
        6: 'bar2_icon',
        7: 'bar3_icon',
        8: 'kiwi_icon',
        9: 'cereza_icon',
        1: 'herradura_icon',
    }
    const { winningNumbers, tragaperraIndex, dadoIndex, cardIndex } = route.params;
    const [winingCards, setWinningCards] = useState([0, 0, 0, 0])
    const [winningDices, setWinningDices] = useState([0, 0, 0, 0])
    const [winningTragaPerras, setWinningTragaperras] = useState([]);
    const [yourCards, setYourCards] = useState([])
    const [yourDices, setYourDices] = useState([])
    const [yourTragaPerras, setYourTragaPerras] = useState([])
    const [numNumbersAvailable, setNumNumbersAvailable] = useState(4);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [showButton, setShowButton] = useState(false)

    const imagesMaquinas =
    {
        2: require(`../../Assets/Images/Tragaperras/Iconos-png/Maquina/Maquina_2.png`),
        3: require(`../../Assets/Images/Tragaperras/Iconos-png/Maquina/Maquina_3.png`),
        4: require(`../../Assets/Images/Tragaperras/Iconos-png/Maquina/Maquina_4.png`)
    }

    useEffect(() => {

        setTimeout(() => {
            let WC = []
            let WD = []
            let WTP = []

            for (const key in winningNumbers) {
                if (key.includes('cardNumber'))
                    WC.push(winningNumbers[key])
                if (key.includes('diceNumber'))
                    WD.push(winningNumbers[key])
                if (key.includes('slotNumber'))
                    WTP.push(simbolos[winningNumbers[key]])
            }

            setWinningCards(WC);
            setWinningDices(WD);
            setWinningTragaperras(WTP);
            setNumNumbersAvailable(WTP.length);

            setYourCards(cardIndex);
            setYourDices(dadoIndex);
            setYourTragaPerras(tragaperraIndex);
            setIsLoading(false)
        }, 1000);
    }, [])

    const handleScratch = (scratchPercentage) => {
        if (scratchPercentage < 54) { return; }

        if (scratchPercentage >= 54 && !loadingAdd) {
            console.log('load ad')
            setResult(true)
            setShowButton(true)
            setModalVisible(true)
        }

    }

    return (
        <>
            <ImageBackground source={require('./../../Assets/Images/BackgroundMain.jpg')} style={styles.container}>
                {
                    isLoading ? (
                        <ActivityIndicator size="large" color="#fff" style={{ position: 'absolute', top: '50%', left: '55%', transform: [{ translateX: -50 }, { translateY: -50 }] }} />
                    ) : (
                        <>
                            <View style={styles.gameContainer}>

                                <View style={{ marginTop: verticalScale(50) }}>
                                    <Text style={styles.titleGame}>{translate('scratchCard.titleGame')}</Text>

                                    <ImageBackground
                                        source={require('./../../Assets/Images/rasca-gana/Marco_rasca-gana.png')}
                                        style={styles.marco}
                                        resizeMode="contain"
                                    >
                                        <View style={styles.marcostyles}>

                                            <View style={styles.d_flex}>
                                                {
                                                    winingCards.map((_, index) => (
                                                        <View
                                                            key={index}
                                                            style={{
                                                                borderWidth: result === true && yourCards[index] === _ ? 2 : 0,
                                                                borderColor: result === true && yourCards[index] === _ ? '#2EDC13' : 'transparent',
                                                                borderRadius: 5,
                                                                paddingTop: 6,
                                                                paddingBottom: 6,
                                                            }}
                                                        >
                                                            <Card card={winingCards[index]} type={TYPES[index]} stylesValue={{ width: horizontalScale(50), height: verticalScale(50) }} />
                                                        </View>
                                                    ))
                                                }
                                            </View>
                                            <View style={styles.d_flex}>
                                                {
                                                    winningDices.map((_, index) => (
                                                        <View
                                                            key={index}
                                                            style={{
                                                                borderWidth: result === true && yourDices[index] === _ ? 2 : 0,
                                                                borderColor: result === true && yourDices[index] === _ ? '#2EDC13' : 'transparent',
                                                                borderRadius: 5,
                                                            }}
                                                        >
                                                            <Craps key={index} value={winningDices[index]} styleValue={{ width: horizontalScale(50), height: verticalScale(50) }} />
                                                        </View>
                                                    ))
                                                }
                                            </View>

                                            <Image
                                                source={imagesMaquinas[numNumbersAvailable] || require(`../../Assets/Images/Tragaperras/Iconos-png/Maquina/Maquina_4.png`)}
                                                resizeMode="contain"
                                                style={styles.tragaperrasWin}
                                            />

                                            <View style={{
                                                top: 18,
                                                alignSelf: 'center',
                                                ...styles.d_flex,
                                                width: winningTragaPerras.length === 4 ? 156 : winningTragaPerras.length === 3 ? 118 : 76,
                                            }}>
                                                {
                                                    winningTragaPerras.map((v, index) => (
                                                        <View
                                                            key={index}
                                                            style={{
                                                                borderWidth: result === true && yourTragaPerras[index] === v ? 2 : 0,
                                                                borderRadius: 10,
                                                                borderColor: result === true && yourTragaPerras[index] === v ? '#2EDC13' : 'transparent',
                                                                height: 90,
                                                                width: 40,
                                                            }}
                                                        >
                                                            <Tragaperra
                                                                styleValue={{
                                                                    top: result === true && yourTragaPerras[index] === v ? 22 : 25,
                                                                    left: -3,
                                                                    width: 32,
                                                                    height: 45,
                                                                }}
                                                                value={v}
                                                            />
                                                        </View>
                                                    ))
                                                }
                                            </View>

                                        </View>
                                        {!result &&
                                            <ScratchCard
                                                source={require('./../../Assets/Images/rasca-gana/Rasca.png')}
                                                brushWidth={40}
                                                onScratch={handleScratch}
                                                style={styles.scratch_card}
                                            />
                                        }

                                    </ImageBackground>

                                </View>

                                <View style={{ flex: 1, alignItems: 'center', width: Dimensions.get('window').width }}>
                                    <Text style={styles.titleElecciones}>{translate('game.yourChoices')}</Text>
                                    <View style={{
                                        ...styles.gamesSelections,
                                        opacity: result ? 1 : 0.5,
                                    }}>
                                        <View style={{ padding: 8, }}>
                                            <View style={{ marginBottom: 2, ...styles.d_flex }}>
                                                {yourCards.map((_, index) => (
                                                    <View
                                                        key={index}
                                                        style={{
                                                            borderWidth: result === true && winingCards[index] === _ ? 2 : 0,
                                                            borderColor: result === true && winingCards[index] === _ ? '#2EDC13' : 'transparent',
                                                            borderRadius: 5,
                                                            paddingTop: 6,
                                                            paddingBottom: 6,
                                                        }}>
                                                        <Card
                                                            card={yourCards[index]}
                                                            type={TYPES[index]}
                                                            stylesValue={{
                                                                width: 50,
                                                                height: 60,
                                                            }} />
                                                    </View>
                                                ))}
                                            </View>

                                            <View style={{
                                                ...styles.d_flex,
                                            }}>
                                                {yourDices.map((_, index) => (
                                                    <View
                                                        key={index}
                                                        style={{
                                                            borderWidth: result === true && winningDices[index] === _ ? 2 : 0,
                                                            borderColor: result === true && winningDices[index] === _ ? '#2EDC13' : 'transparent',
                                                            borderRadius: 5,
                                                        }}
                                                    >

                                                        <Craps
                                                            value={dadoIndex[index]}
                                                            isAnimate={false}
                                                            styleValue={{ width: 50, height: 60, }}
                                                        />
                                                    </View>
                                                ))}
                                            </View>

                                            <Image
                                                source={imagesMaquinas[numNumbersAvailable] || require(`../../Assets/Images/Tragaperras/Iconos-png/Maquina/Maquina_4.png`)}
                                                resizeMode="contain"
                                                style={{
                                                    flex: 1,
                                                    width: "100%",
                                                    height: 230,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    alignSelf: 'center',
                                                    position: 'absolute',
                                                    bottom: -80,
                                                }}
                                            />

                                            <View style={{
                                                top: 18,
                                                alignSelf: 'center',
                                                ...styles.d_flex,
                                                width: winningTragaPerras.length === 4 ? 156 : winningTragaPerras.length === 3 ? 118 : 76,
                                            }}
                                            >
                                                {
                                                    yourTragaPerras.map((v, index) => {
                                                        return (
                                                            <View
                                                                key={index}
                                                                style={{
                                                                    borderWidth: result === true && winningTragaPerras[index] === v ? 2 : 0,
                                                                    borderRadius: 10,
                                                                    borderColor: result === true && winningTragaPerras[index] === v ? '#2EDC13' : 'transparent',
                                                                    height: 90,
                                                                    width: 40
                                                                }}
                                                            >
                                                                <Tragaperra
                                                                    styleValue={{
                                                                        top: result === true && winningTragaPerras[index] === v ? 21 : 24,
                                                                        left: -3,
                                                                        width: 32,
                                                                        height: 44
                                                                    }}
                                                                    value={v}
                                                                />
                                                            </View>

                                                        )
                                                    })
                                                }
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </View>

                            {
                                showButton
                                    ? (
                                        <View style={styles.buttonContainer}>
                                            <Pressable onPress={() => navigation.navigate('Home')}>
                                                <LinearGradient
                                                    colors={['rgba(116, 53, 0, 1)', 'rgba(255, 246, 193, 1)', 'rgba(243, 231, 149, 1)', 'rgba(203, 105, 4, 1)', 'rgba(235, 134, 6, 1)', 'rgba(184, 93, 0, 1)', 'rgba(142, 63, 6, 1)']}
                                                    style={styles.buttonSuccess}
                                                >
                                                    <Text style={{ fontSize: moderateScale(15), color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>{translate('general.accept')}</Text>
                                                </LinearGradient>
                                            </Pressable>
                                        </View>
                                    )
                                    : null
                            }

                            <View style={styles.centeredView}>
                                <Modal
                                    animationType="slide"
                                    visible={modalVisible}
                                    transparent={true}
                                    onRequestClose={() => {
                                        Alert.alert("Modal has been closed.");
                                        setModalVisible(!modalVisible);
                                    }}
                                >

                                    <View style={{
                                        backgroundColor: 'black',
                                        flex: 1,
                                        opacity: 0.8,
                                        alignItems: 'center',
                                    }}>
                                        {
                                            winningNumbers.status !== 'losed' ? (
                                                <View style={{
                                                    position: 'absolute',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-evenly',
                                                    width: '100%',
                                                    zIndex: 9999
                                                }}
                                                    pointerEvents="none"
                                                >

                                                    {
                                                        animatedListCurrency.map((v, index) => (
                                                            <AnimatedTransformCurrency key={index}>
                                                                <AnimatedCurrency />
                                                            </AnimatedTransformCurrency>
                                                        ))

                                                    }
                                                </View>
                                            ) : null
                                        }
                                        <View style={{
                                            backgroundColor: 'white',
                                            top: '40%',
                                            width: '80%',
                                            padding: 20,
                                            borderRadius: 20,
                                            alignItems: 'center',
                                        }}>
                                            {
                                                (winningNumbers.prizeIndex !== null && winningNumbers.prizeIndex >= 0) &&
                                                <Image
                                                    source={
                                                        winningNumbers.prizeIndex === 0 && require('../../Assets/Images/Trofeos/fluent-emoji_trophy.png')
                                                        || winningNumbers.prizeIndex === 1 && require('../../Assets/Images/Trofeos/fluent-emoji_trophy-1.png')
                                                        || winningNumbers.prizeIndex === 2 && require('../../Assets/Images/Trofeos/fluent-emoji_trophy-2.png')
                                                        || winningNumbers.prizeIndex === 3 && require('../../Assets/Images/Trofeos/fluent-emoji_sports-medal.png')
                                                    }
                                                    style={{ width: 72, height: 72 }}
                                                    resizeMode="contain"
                                                />
                                            }
                                            <Text style={{ fontSize: 22, color: 'black', fontWeight: 'bold' }}>
                                                {winningNumbers.status === 'losed' ? translate('scratchCard.loseTitle') : '¡Ganaste!'}
                                            </Text>
                                            <Text style={{ fontSize: 18, color: 'black', marginBottom: 25 }}>
                                                {winningNumbers.status === 'losed' ? translate('scratchCard.loseDescription') :
                                                    `¡Felicidades, has ganado ${LocaleFormatNumber(winningNumbers.prizeWin)} €`
                                                }
                                            </Text>


                                            <Pressable onPress={() => setModalVisible(false)}>
                                                <LinearGradient
                                                    colors={['rgba(116, 53, 0, 1)', 'rgba(255, 246, 193, 1)', 'rgba(243, 231, 149, 1)', 'rgba(203, 105, 4, 1)', 'rgba(235, 134, 6, 1)', 'rgba(184, 93, 0, 1)', 'rgba(142, 63, 6, 1)']}
                                                    style={styles.buttonModal}
                                                >
                                                    <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold' }}>{
                                                        loadingAdd ? <ActivityIndicator
                                                            size="small" color="green "
                                                        /> : "VOLVER"
                                                    }</Text>
                                                </LinearGradient>
                                            </Pressable>
                                        </View>
                                    </View>
                                </Modal>

                            </View>

                        </>
                    )
                }
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gameContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(15),
    },
    marco: {
        height: 290
    },
    scratch_card: {
        width: 230,
        height: 250,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        marginTop: 14,
    },
    titleGame: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#CBCCAA',
        paddingBottom: 15,
    },
    titleElecciones: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFFFFF',
        textTransform: 'uppercase',
        paddingVertical: 15,
    },
    gamesSelections: {
        backgroundColor: 'black',
        width: 250,
        height: 265,
        borderRadius: 10,
    },
    d_flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    marcostyles: {
        position: "absolute",
        width: 232,
        height: 110,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center',
        alayItems: 'center',
        top: 76,
    },
    buttonSuccess: {
        alignItems: 'center',
        padding: 15,
        borderRadius: 20,
        width: 200,
    },
    buttonModal: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        width: 150,
    },
    buttonContainer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: Platform.OS === 'ios' ? verticalScale(25) : '1%',
        width: '100%',
    },
    tragaperrasWin: {
        width: "100%",
        height: verticalScale(190),
        position: 'absolute',
        bottom: verticalScale(-123),
    }
})

export default ScratchCardScreen

