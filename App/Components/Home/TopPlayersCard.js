
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { Text, TouchableOpacity, View } from "react-native"
import { Avatar } from "react-native-elements"
import translate from "../../I18n"
import Card from "../CustomUI/Card"

import styles from './Styles/TopPlayersCardStyles'
import ApiService from "../../Services/ApiService"
import UserAvatar from "../Avatar/UserAvatar"
import LocaleFormatNumber from "../../helpers/LocaleFormatNumber";
import Icon from 'react-native-vector-icons/dist/Feather'

const TopPlayersCard = ({ topPlayers }) => {

    const navigation = useNavigation();

    console.log('CANTIDAD DE TOP PLAYERS:', topPlayers.length)

    const renderTopPlayerRow = ({ name, avatar, totalPrizes, username_ }, key) => {
        return (
            <View style={styles.topPlayerRow} key={key}>
                <View style={styles.avatarUsernameContainer}>
                    <UserAvatar size={36} url={avatar?.url} title={username_?.charAt(0)} />
                    <Text style={{ fontSize: 16 }}>{username_}</Text>
                </View>
                <View>
                    <Text style={styles.addedAmount}>{`${LocaleFormatNumber(totalPrizes)}€`}</Text>
                </View>
            </View>
        )
    }

    return (
        <TouchableOpacity style={{ width: '100%', alignItems: 'center' }}
            onPress={() => { navigation.navigate('TopRanking', { topRanking: topPlayers, type: 'topPlayers' }) }}
        >
            <Card>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.title}>{translate('topPlayers.topPlayers')}</Text>
                    <Icon name='chevron-right' size={28} />
                </View>
                {topPlayers.map((topPlayer, key) => key < 3 && renderTopPlayerRow(topPlayer, key))}
            </Card>
        </TouchableOpacity>
    )
}

export default TopPlayersCard