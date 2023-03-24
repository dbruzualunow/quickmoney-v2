import React, { useEffect, useState } from "react"
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Icon, Overlay } from "react-native-elements"

import Card from "../../Components/CustomUI/Card"
import Button from '../../Components/CustomUI/Button'

import translate from "../../I18n"
import ApiService from "../../Services/ApiService"

import styles from './Styles/GameScreenStyles'
import SelectNumberModal from "../../Components/Game/SelectNumberModal"
import PlayModal from "../../Components/Game/PlayModal"
import { random } from "lodash"
import Header from "../../Components/CustomUI/Header"

const GameScreen = ({ navigation }) => {

    const [bet, setBet] = useState({})
    const [choosedGame, setChoosedGame] = useState(undefined) // CARDS | DICES | NUMBERS
    const [showNumberSelector, setShowNumberSelector] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState(undefined)
    const [showPlayModal, setShowPlayModal] = useState(false)
    const [numCardsAvailable, setNumCardsAvailable] = useState(4)
    const [numDicesAvailable, setNumDicesAvailable] = useState(4)
    const [numNumbersAvailable, setNumNumbersAvailable] = useState(4)

    const [currentGameIndex, setCurrentGameIndex] = useState(1)

    useEffect(() => {
        ApiService.getGameConfig()
            .then(response => {
                if (response?.data?.data[0]?.attributes) {
                    const {
                        numCardsAvailable,
                        numDicesAvailable,
                        numNumbersAvailable
                    } = response?.data?.data[0]?.attributes
                    setNumCardsAvailable(numCardsAvailable)
                    setNumDicesAvailable(numDicesAvailable)
                    setNumNumbersAvailable(numNumbersAvailable)
                }
            })
            .catch(error => { console.log('ERROR: ', { error }) })
    }, [])


    useEffect(() => {

        if (bet && bet['cardNumber' + numCardsAvailable]
            && bet['diceNumber' + numDicesAvailable]
            && bet['numberNumber' + numNumbersAvailable]) {
            setShowPlayModal(true)
        }

    }, [bet, choosedGame])

    const playRandomGame = () => {

        const newBet = {
            cardNumber: random(1, 12),
            diceNumber: random(1, 6),
            numberNumber: random(1, 9),
        }
        if (numCardsAvailable >= 2) {
            newBet.cardNumber2 = random(1, 12)
        }
        if (numCardsAvailable >= 3) {
            newBet.cardNumber3 = random(1, 12)
        }
        if (numCardsAvailable >= 4) {
            newBet.cardNumber4 = random(1, 12)
        }
        if (numDicesAvailable >= 2) {
            newBet.diceNumber2 = random(1, 6)
        }
        if (numDicesAvailable >= 3) {
            newBet.diceNumber3 = random(1, 6)
        }
        if (numDicesAvailable >= 4) {
            newBet.diceNumber4 = random(1, 6)
        }
        if (numNumbersAvailable >= 2) {
            newBet.numberNumber2 = random(1, 6)
        }
        if (numNumbersAvailable >= 3) {
            newBet.numberNumber3 = random(1, 6)
        }
        if (numNumbersAvailable >= 4) {
            newBet.numberNumber4 = random(1, 6)
        }
        setBet(newBet)
    }


    const getCardIconName = () => {
        if (choosedGame !== 'CARDS') return undefined
        switch (currentGameIndex) {
            case 1:
                return 'cards-spade'
            case 2:
                return 'cards-heart'
            case 3:
                return 'cards-club'
            case 4:
                return 'cards-diamond'
            default:
                return undefined
        }
    }

    const goToNextSelection = () => {
        let newBet = { ...bet }

        let key = ''
        let numbersOfBets = 4
        switch (choosedGame) {
            case 'CARDS':
                key = 'cardNumber' + (currentGameIndex === 1 ? '' : currentGameIndex)
                numbersOfBets = numCardsAvailable
                break;
            case 'DICES':
                key = 'diceNumber' + (currentGameIndex === 1 ? '' : currentGameIndex)
                numbersOfBets = numDicesAvailable
                break;
            case 'NUMBERS':
                key = 'numberNumber' + (currentGameIndex === 1 ? '' : currentGameIndex)
                numbersOfBets = numNumbersAvailable
                break;
        }

        newBet[key] = selectedNumber
        setBet(newBet)
        setSelectedNumber(undefined)
        if (currentGameIndex < numbersOfBets) {
            setCurrentGameIndex(currentGameIndex + 1)
        } else {
            setChoosedGame(undefined)
        }
    }


    const renderSelectGameNumbers = () => {

        let imageSource = undefined
        let explanationTextKey = undefined

        let selectedNumberText = undefined

        switch (choosedGame) {
            case 'CARDS':
                imageSource = require('../../Assets/Images/cards.png')
                explanationTextKey = 'game.chooseCard' + currentGameIndex
                selectedNumberText = translate('game.choosedCard' + currentGameIndex, { number: selectedNumber })
                break;
            case 'DICES':
                imageSource = require('../../Assets/Images/dices.png')
                explanationTextKey = 'game.chooseDice' + currentGameIndex
                selectedNumberText = translate('game.choosedNumber', { number: selectedNumber })
                break;
            case 'NUMBERS':
                imageSource = require('../../Assets/Images/number.png')
                explanationTextKey = 'game.chooseNumber' + currentGameIndex
                selectedNumberText = translate('game.choosedNumber', { number: selectedNumber })
            default:
        }

        const cardIconName = getCardIconName()
        return (
            <Overlay
                isVisible={choosedGame !== undefined}
                fullScreen
                overlayStyle={styles.overlayStyle}
                animationType='slide'
            >
                <Icon
                    containerStyle={styles.iconBackContainerStyle}
                    name="chevron-left"
                    onPress={() => { setChoosedGame(undefined) }} />
                <Card>
                    <Text style={styles.partText}>{translate('game.part', { number: currentGameIndex })}</Text>
                    {explanationTextKey && <Text>{translate(explanationTextKey)}</Text>}
                    {cardIconName && <Icon containerStyle={{ paddingTop: 20 }} name={cardIconName} type="material-community" />}
                    {selectedNumber && <Text style={styles.selectedNumber}>
                        {selectedNumberText}
                    </Text>}
                    <TouchableOpacity onPress={() => { setShowNumberSelector(true) }}>
                        <Image resizeMode='contain' style={styles.modalImage} source={imageSource} />
                    </TouchableOpacity>
                    <Button
                        title={translate('general.continue')}
                        disabled={!selectedNumber}
                        onPress={goToNextSelection} />
                </Card>
                <SelectNumberModal
                    choosedGame={choosedGame}
                    isVisible={showNumberSelector}
                    onNumberSelected={(number) => { setSelectedNumber(number) }}
                    onDismiss={() => setShowNumberSelector(false)}
                />
            </Overlay>
        )
    }


    return (
        <View>
            <Header backTitle={translate('general.play')} />
            <ScrollView>
                <View style={styles.mainContainer}>
                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-end',
                        }}
                        onPress={playRandomGame}>
                        <Text style={styles.randomGameText}>{translate('game.randomGame')}</Text>
                    </TouchableOpacity>
                    <Card>
                        <Text style={styles.partText}>{translate('game.part', { number: 1 })}</Text>
                        <Text>{translate('game.cardExplanation', { number: 1 })}</Text>
                        <ImageBackground resizeMode='contain' style={styles.backgroundImage} source={require('../../Assets/Images/cards.png')}>
                            <TouchableOpacity
                                style={styles.selectButton}
                                onPress={() => {
                                    setCurrentGameIndex(1)
                                    setChoosedGame('CARDS')
                                }}
                            >
                                <Text style={styles.buttonText}>
                                    {bet?.cardNumber
                                        ? `${bet.cardNumber}${bet?.cardNumber2 ? ' | ' + bet?.cardNumber2 : ''} ${bet?.cardNumber3 ? '| ' + bet?.cardNumber3 : ''} ${bet?.cardNumber4 ? '| ' + bet?.cardNumber4 : ''}`
                                        : translate('game.chooseCards', { number: numCardsAvailable })}
                                </Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </Card>
                    <Card>
                        <Text style={styles.partText}>{translate('game.part', { number: 2 })}</Text>
                        <Text>{translate('game.diceExplanation', { number: 1 })}</Text>
                        <ImageBackground resizeMode='contain' style={styles.backgroundImage} source={require('../../Assets/Images/dices.png')}>
                            <TouchableOpacity
                                style={styles.selectButton}
                                onPress={() => {
                                    setCurrentGameIndex(1)
                                    setChoosedGame('DICES')
                                }}
                            >
                                <Text style={styles.buttonText}>
                                    {bet?.diceNumber
                                        ? `${bet.diceNumber}${bet?.diceNumber2 ? ' | ' + bet?.diceNumber2 : ''} ${bet?.diceNumber3 ? '| ' + bet?.diceNumber3 : ''} ${bet?.diceNumber4 ? '| ' + bet?.diceNumber4 : ''}`
                                        : translate('game.chooseDice', { number: numDicesAvailable })}
                                </Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </Card>
                    <Card>
                        <Text style={styles.partText}>{translate('game.part', { number: 3 })}</Text>
                        <Text>{translate('game.numberExplanation', { number: 1 })}</Text>
                        <ImageBackground resizeMode='contain' style={styles.backgroundImage} source={require('../../Assets/Images/number.png')}>
                            <TouchableOpacity
                                style={styles.selectButton}
                                onPress={() => {
                                    setCurrentGameIndex(1)
                                    setChoosedGame('NUMBERS')
                                }}
                            >
                                <Text style={styles.buttonText}>
                                    {bet?.numberNumber
                                        ? `${bet.numberNumber}${bet?.numberNumber2 ? ' | ' + bet?.numberNumber2 : ''} ${bet?.numberNumber3 ? '| ' + bet?.numberNumber3 : ''} ${bet?.numberNumber4 ? '| ' + bet?.diceNumber4 : ''}`
                                        : translate('game.chooseNumbers', { number: numNumbersAvailable })}
                                </Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </Card>
                </View>
                {renderSelectGameNumbers()}
                <PlayModal isVisible={showPlayModal} bet={bet} onDismiss={() => setShowPlayModal(false)} />
            </ScrollView>
        </View>
    )

}

export default GameScreen