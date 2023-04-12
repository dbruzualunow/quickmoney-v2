import React from "react"
import { Text, View } from "react-native"
import { Avatar, Card } from "react-native-elements"

import translate from "../../I18n"
import UserAvatar from "../Avatar/UserAvatar"

import styles from './Styles/PlayerRankingCardStyles.js'
import LocaleFormatNumber from "../../helpers/LocaleFormatNumber";

const PlayerRankingCard = ({ ranking, name, timeAgo, totalPrizes, acumulated, avatar, username_ }) => {
	const prize = totalPrizes ?? acumulated;

    return (
        <Card containerStyle={styles.mainContainer}>
            <View style={styles.greenRowContainer}>
                <Text style={styles.rankingText}>TOP {ranking}</Text>
            </View>
            <View style={styles.innerContainer}>
                <View style={styles.avatarRow}>
                    <UserAvatar size={30} url={avatar?.url || ''} title={ username_?.charAt(0) } />
                    <Text style={styles.username}>
                        {translate('general.user')} {username_}
                    </Text>
                    <Text style={styles.timeAgo}>{timeAgo}</Text>
                </View>
                <Text style={styles.hasWinAmmount}>{translate('ranking.hasWinAmmount')}
                    <Text style={{ fontWeight: 'bold' }}>{` ${LocaleFormatNumber(prize)}€`}</Text>
                </Text>
            </View>
        </Card>
    )
}
export default PlayerRankingCard