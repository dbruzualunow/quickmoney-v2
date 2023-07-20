
import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import CustomButton from '../../Components/CustomUI/Button'
import Header from '../../Components/CustomUI/Header'

import translate, { getCurrentLanguage } from '../../I18n'
import ApiService from '../../Services/ApiService'

import styles from './Styles/PlayGameScreenStyles'
import LocaleFormatNumber from "../../helpers/LocaleFormatNumber";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';


const PlayGameScreen = ({ navigation }) => {


    const [avaliablePrizes, setAvaliablePrizes] = useState([{ index: 1, quantity: 2000 }, { index: 2, quantity: 1000 }, { index: 3, quantity: 500 }])
    const [gameDescription, setGameDescription] = useState('')
    const [maxGamesPerDay, setMaxGamesPerDay] = useState(0)
    const [numbersPlaysToday, setNumbersPlaysToday] = useState(0)
    const isFocused = useIsFocused()


    useEffect(() => {
        ApiService.getAvaliablePrizes()
            .then(response => {
                if (response?.data?.data[0]?.attributes?.item) {
                    setAvaliablePrizes(response.data.data[0].attributes.item)
                    setGameDescription(response.data.data[0].attributes.description)
                }
            })
    }, [])

    useEffect(() => {
        Promise.all([ApiService.getCanTestYourLuckInfo()])
            .then(response => {
                if (response?.[0]?.data) {
                    setMaxGamesPerDay(response[0].data.maxGamesPerDay)
                    setNumbersPlaysToday(response[0].data.numbersPlaysToday)
                }
            })
    }, [isFocused])


    const getPriceLabel = (index) => {
        switch (index) {
            case 1:
                return translate('game.fistPrize');
            case 2:
                return translate('game.secondPrize');
            case 3:
                return translate('game.thirdPrize');
            case 4:
                return translate('game.forthPrize');
            default:
                break;
        }
    }

    const ticketsAvailable = (maxGamesPerDay - numbersPlaysToday) < 0 ? 0 : maxGamesPerDay - numbersPlaysToday

    return (
        <View>
            <Header backTitle={translate('general.play')}/>
            <ScrollView
                showsVerticalScrollIndicator={false} 
            >
                <View style={styles.mainContainer}>
                    <Image 
                        style={{width: '35%'}}
                        source={require('../../Assets/Images/gameImage.png')} 
                        resizeMode='center'
                    />
                    <View style={styles.titleRow}>
                        {/* <Text style={styles.title}>{translate('game.game')}</Text> */}
                        <Text style={styles.title}>{translate('game.availablePlays')}</Text>

                        <Text style={styles.tickets}>{` ${ticketsAvailable} `}</Text>

                        {/* <Text style={styles.tickets}>-1 ticket</Text> */}
                    </View>
                    <View style={{ width: '90%', paddingBottom: 30}}>
                        <CustomButton
                            title={translate('general.play')}
                            onPress={() => {
                                navigation.navigate('Game')
                            }}
                        />
                    </View>
                    <Text style={styles.description}>
                        {translate('general.description')}
                    </Text>
                    <Text style={styles.gameExplanation}>
                        {translate('game.description')}
                    </Text>
                    <View style={styles.priceCard}>
                        { avaliablePrizes.map(
                            (
                                {
                                    index,
                                    quantity,
                                    numEqualCards,
                                    numEqualDice,
                                    numEqualNumber,
                                    GameDescriptionEs,
                                    GameDescriptionEn
                                },
                                key
                            ) => (
                                <View key={key}>
                                    <View style={styles.priceCardRow}>
                                        <Text style={{ fontWeight: 'bold' }}>{getPriceLabel(index)}</Text>
                                        <Text>{LocaleFormatNumber(quantity)}€</Text>
                                    </View>
                                    <Text>
                                        { getCurrentLanguage() === 'es' ? GameDescriptionEs : GameDescriptionEn }
                                    </Text>
                                </View>
                            )
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>)

}
export default PlayGameScreen   