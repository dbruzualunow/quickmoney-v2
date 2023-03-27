import React, { useContext, useState } from "react"
import { Text, View, Image, ScrollView } from "react-native"

import Button from "../CustomUI/Button"
import Modal from "../CustomUI/Modal"

import translate from "../../I18n"
import ApiService from "../../Services/ApiService"
import { useNavigation } from "@react-navigation/native"
import { AuthenticationContext } from "../../Context/AuthenticationContextProvider";

const PlayModal = ({ isVisible, onDismiss, bet }) => {

    const [hasLossed, setHasLossed] = useState(false)
    const [hasWinned, setHasWinned] = useState(false)
    const [hasMaxGamesPerDay, setHasMaxGamesPerDay] = useState(false)

    const [winningBet, setWinningBet] = useState(bet)
    const { refreshUser } = useContext(AuthenticationContext)

    const navigation = useNavigation();

    const playGame = async () => {
        try {
            const response = await ApiService.playGame(bet)

            if (response.data.status === 'win') {
                setHasWinned(true)
            } else {
                if (response?.data) {
                    setWinningBet(response.data)
                }
                setHasLossed(true)
            }
        } catch (error) {
            if (error?.request?.status === 400) {
                setHasMaxGamesPerDay(true)
            } else {
                setHasLossed(true)
            }
        }
    }


    const onDismissModal = () => {
        if (hasWinned || hasLossed || hasMaxGamesPerDay) {
            refreshUser()
            onDismiss()
            navigation.navigate('Home')
        }
    }


    const renderPlayContent = ({ bet, title, showPlayButton = false }) => (
        <>
            <Text style={{ textAlign: 'center', marginBottom: 50, fontWeight: 'bold' }}>
                {title}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems: 'center', marginVertical: 10 }}>
                <Image resizeMode='contain' style={{ height: 70, width: 70 }} source={require('../../Assets/Images/cards.png')} />
                <Text >
                    {`${bet.cardNumber}${bet?.cardNumber2 !== undefined ? ' | ' + bet?.cardNumber2 : ''} ${bet?.cardNumber3 !== undefined ? '| ' + bet?.cardNumber3 : ''} ${bet?.cardNumber4 !== undefined ? '| ' + bet?.cardNumber4 : ''}`}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems: 'center', marginVertical: 10 }}>
                <Image resizeMode='contain' style={{ height: 70, width: 70 }} source={require('../../Assets/Images/dices.png')} />
                <Text >
                    {`${bet.diceNumber}${bet?.diceNumber2 !== undefined ? ' | ' + bet?.diceNumber2 : ''} ${bet?.diceNumber3 !== undefined ? '| ' + bet?.diceNumber3 : ''} ${bet?.diceNumber4 !== undefined ? '| ' + bet?.diceNumber4 : ''}`}
                </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', alignItems: 'center', marginVertical: 10 }}>
                <Image resizeMode='contain' style={{ height: 70, width: 70 }} source={require('../../Assets/Images/number.png')} />
                <Text >
                    {`${bet.numberNumber}${bet?.numberNumber2 !== undefined ? ' | ' + bet?.numberNumber2 : ''}${bet?.numberNumber3 !== undefined ? ' | ' + bet?.numberNumber3 : ''}${bet?.numberNumber4 !== undefined ? ' | ' + bet?.numberNumber4 : ''}`}
                </Text>
            </View>
            {showPlayButton && <View style={{ width: '100%', marginTop: 30 }}>
                <Button
                    title={translate('general.accept')}
                    onPress={playGame} />
                <View style={{ marginTop: 25 }} />
                <Button
                    title={translate('general.change')}
                    onPress={onDismiss}
                    inverse
                />
            </View>}
        </>
    )

    const renderLossedContent = () => (
        <ScrollView>
            <View style={{ flex: 1, maxWidth: '100%' }}>
                <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 30, fontWeight: 'bold', paddingBottom: 50 }}>
                    {translate('game.youLossed')}
                </Text>
                {renderPlayContent({ bet, title: translate('game.yourNumbers') })}
                <View style={{ marginTop: 50 }} />
                {renderPlayContent({ bet: winningBet, title: translate('game.winningNumbers') })}
            </View>
            <View style={{ marginTop: 50 }} />
            <Button
                title={translate('game.backHome')}
                onPress={onDismissModal} />
        </ScrollView>
    )

    const renderWinnedContent = () => (
        <>
            <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 30, fontWeight: 'bold', paddingBottom: 50 }}>
                {translate('game.youWinned', { winnedAmmount: '300€' })}
            </Text>
            {renderPlayContent({ bet: winningBet, title: translate('game.winningNumbers') })}
            <View style={{ marginTop: 50 }} />
            <Button
                title={translate('game.backHome')}
                onPress={onDismissModal} />
        </>
    )

    const renderMaxGamesPerDay = () => (
        <>
            <Text style={{ textAlign: 'center', alignSelf: 'center', fontSize: 30, fontWeight: 'bold', paddingBottom: 50 }}>
                {translate('game.hasMaxGamesPerDay')}
            </Text>
            <Button
                title={translate('game.backHome')}
                onPress={onDismissModal} />
        </>
    )

    return (
        <Modal isVisible={isVisible} onDismiss={onDismissModal}>
            { }
            {hasWinned
                ? renderWinnedContent()
                : hasLossed
                    ? renderLossedContent()
                    : hasMaxGamesPerDay
                        ? renderMaxGamesPerDay()
                        : renderPlayContent({
                            bet, title: translate('game.yourNumbers'),
                            showPlayButton: true
                        })
            }
        </Modal>
    )
}
export default PlayModal;