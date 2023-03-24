import React from 'react';
import { Image, View, TouchableOpacity, Text, Pressable } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../Themes/Colors';

import styles from './Styles/HeaderStyles'
import translate from '../../I18n';

const CustomHeader = (props) => {
    const { backTitle, showUserLink, showRankingLink, showAppIcon } = props
    const navigation = useNavigation();

    return (
        <Header
            {...props}
            backgroundColor={Colors.green}
            leftComponent={
                backTitle &&
	            <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
		            <Icon color='white' name='chevron-back-outline' type='ionicon' />
		            <Text style={styles.backTitle}>{backTitle}</Text>
	            </TouchableOpacity>
            }
            centerComponent={showAppIcon && <Image style={styles.logo} source={require('../../Assets/Icons/QuickAppIcon.png')} />}
            rightComponent={
                <View style={styles.iconContainer}>
                    {showRankingLink &&
                        <TouchableOpacity onPress={() => { navigation.navigate('TopPlayers') }}>
                            <Image style={styles.icon} source={require('../../Assets/Icons/ranking.png')} />
                        </TouchableOpacity>
                    }
                    {showUserLink &&
                        <TouchableOpacity style={styles.userLinkContainer} onPress={() => { navigation.navigate('Profile') }}>
                            <Image style={styles.icon} source={require('../../Assets/Icons/User.png')} />
                            <Text style={styles.myProfileText}>{translate('profile.myProfile')}</Text>
                        </TouchableOpacity>
                    }
                </View>
            }
        />
    )
}

export default CustomHeader;