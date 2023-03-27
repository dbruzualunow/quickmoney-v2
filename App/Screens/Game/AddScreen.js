import React, { useContext, useEffect, useState } from 'react'
import { Text, View, Image, ScrollView, Alert } from 'react-native'

import CustomButton from '../../Components/CustomUI/Button'
import Header from '../../Components/CustomUI/Header'
import AddSuccessModal from '../../Components/Game/AddSuccessModal'
import Config from '../../Config';

import translate from '../../I18n'

import styles from './Styles/AddScreenStyles'
import ApiService from '../../Services/ApiService';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { AuthenticationContext } from "../../Context/AuthenticationContextProvider";
import Modal from "../../Components/CustomUI/Modal"
import Colors from '../../Themes/Colors';

const adUnitId = Config.ADMOB_ID;


const AddScreen = ({ navigation }) => {

    const [isVisibleSuccessModal, setIsVisibleSuccessModal] = useState(false)
    const [isLoadingAdd, setIsLoadingAdd] = useState(false)
    const [maxGamesPerDay, setMaxGamesPerDay] = useState(0)
    const [numbersPlaysToday, setNumbersPlaysToday] = useState(0)
    const { user, refreshUser } = useContext(AuthenticationContext)
    const isFocused = useIsFocused()

    useEffect(() => {
        Promise.all([ApiService.getCanTestYourLuckInfo(), refreshUser()])
            .then(response => {
                if (response?.[0]?.data) {
                    setMaxGamesPerDay(response[0].data.maxGamesPerDay)
                    setNumbersPlaysToday(response[0].data.numbersPlaysToday)
                }
            })
    }, [isFocused, isVisibleSuccessModal])

    const showRewarded = () => {
        setIsLoadingAdd(true)
        /* const rewarded = RewardedAd.createForAdRequest(adUnitId);

        // only for testing
        // const rewarded = RewardedAd.createForAdRequest('ca-app-pub-3940256099942544/5224354917');

        rewarded.onAdEvent((type, error, reward) => {
            if (type === RewardedAdEventType.LOADED) {
                rewarded.show();
            }
            if (type === RewardedAdEventType.EARNED_REWARD) {
                onReward(reward)
            }
            //validar si hay mas de 20 tickets
            if (type === RewardedAdEventType.FAILED_TO_LOAD) {
                setIsLoadingAdd(false)
                Alert.alert('Error', translate('general.error'))
                return null;
            }
            ``
            // The reward should be null if user skiped the ad
            if (error) {
                setIsLoadingAdd(false)
                Alert.alert('Error', translate('general.error'))
                return null;
            }
            return null;
        });
        rewarded.load(); */
    }

    const onReward = (reward) => {
       /*  ApiService.postAdVisualization()
        setIsVisibleSuccessModal(true)
        refreshUser() */
        setIsLoadingAdd(false)
    }

    const canTestMyLuck = () => {
        return maxGamesPerDay > numbersPlaysToday && user.pendingShoots > 0
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Header backTitle={translate('game.optForBoats')} />
                <View style={styles.mainContainer}>
                    <Image style={{ width: '35%' }} source={require('../../Assets/Images/gameImage.png')} resizeMode='center' />

                    <Text style={{...styles.addExplanation, paddingHorizontal: 13}}>{translate('game.textTickets')}</Text>
                    <Text style={styles.addExplanation}>
                        {translate('game.addExplanation', { maxGamesPerDay })}
                    </Text>
                    <View style={{ ...styles.titleRow, paddingBottom: 15 }}>
                        <Text style={styles.title}>{translate('game.ticketsAvalaible')}</Text>
                        <Text style={styles.tickets}>{` ${user?.pendingShoots ?? 0} ${translate('general.tickets')}`}</Text>
                    </View>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{translate('game.availablePlays')}</Text>
                        <Text style={styles.tickets}>{` ${maxGamesPerDay - numbersPlaysToday} `}</Text>
                    </View>
                    <View style={{ width: '80%' }}>
                        <CustomButton
                            containerStyle={{ paddingBottom: 20 }}
                            title={translate('game.playAdd')}
                            onPress={showRewarded}
                            loading={isLoadingAdd}
                            loadingProps={{
                                color: 'white'
                            }}
                            buttonStyle={{ backgroundColor: Colors.winGreen, borderColor: Colors.winGreen }}
                        />
                        <CustomButton
                            title={translate('game.optForBoats')}
                            disabled={!canTestMyLuck()}
                            onPress={() => navigation.navigate('PlayGame')}
                        />
                    </View>
                </View>
            </ScrollView>
            <AddSuccessModal
                isVisible={isVisibleSuccessModal}
                onDismiss={() => {
                    setIsVisibleSuccessModal(false)
                    refreshUser()
                }} />
        </View>

    )
}

export default AddScreen