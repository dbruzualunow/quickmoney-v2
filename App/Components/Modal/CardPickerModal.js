import React, { useState } from 'react'
import { View, Modal, Text, StyleSheet, Image, ScrollView, Pressable, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/dist/Feather'
import corazones from './corazones/index'
import treboles from './treboles/index'
import diamantes from './diamantes/index'
import picas from './picas/index'
import translate from '../../I18n'
import { moderateScale, verticalScale } from '../../../Metrics'

export const CardPickerModal = ({ visible, tipo, onBack, onSelected }) => {

    const [cartas, setCartas] = useState({
        corazones,
        treboles,
        diamantes,
        picas
    })

    return (

        <Modal
            visible={visible}
            transparent={true}
        >
            <View style={styles.container}>
                    <View style={styles.goBack}>
                        <Pressable onPress={() => onBack() }>
                            <View style={styles.textGoBackContainer}>
                                <Icon name='chevron-left' size={moderateScale(23)} color={'#0A84FF'} />
                                <Text style={styles.textGoBack}>{translate('general.goBack')}</Text>
                            </View>
                        </Pressable>
                        <Text style={styles.textTitle}>{translate('game.cardSelected')}</Text>
                    </View>
                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', flexWrap: 'wrap' }}>
                        {cartas[tipo ?? 'picas'].map((card, key) =>
                            <Pressable key={key} onPress={() => onSelected(key + 1)}>
                                <Image
                                    source={card}
                                    resizeMode='contain'
                                    style={{ width: 120, height: 200 }}
                                />
                            </Pressable>
                        )}
                    </View>
                </ScrollView>
            </View>

        </Modal>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(29, 29, 29, 0.94)',
    },
    goBack: {
        marginTop: Platform.OS === 'ios' ? verticalScale(45) : verticalScale(15),
    },
    textGoBackContainer: {
        flexDirection: 'row',
        left: 20
    },
    textGoBack: {
        fontFamily: 'SFProDisplay-Regular',
        fontSize: moderateScale(15),
        fontWeight: 'bold',
        color: '#0A84FF',
    },
    textTitle: {
        fontFamily: 'SFProDisplay-Bold',
        fontSize: moderateScale(34),
        color: 'white',
        left: 23
    }
})