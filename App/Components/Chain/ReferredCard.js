import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import translate from '../../I18n';
import {Input} from 'react-native-elements';
import styles from './Styles/ReferredCardStyles';
import Card from '../CustomUI/Card';
import LocaleFormatNumber from '../../helpers/LocaleFormatNumber';

const ReferredCard = ({setLevel, referred, setCurrentLevel, disabled, levelValue}) => {
  const toNumber = (val) => {
    let result = val ? val.toString() : '0'
    result = parseInt(result.replace(/\D/g, ''));
    return result
  }
  return (
    //<View style={[styles.card, styles.boxShadow]}></View>
    <Card containerStyle={styles.card}>
      <View style={styles.headingWrapper}>
        <Image
          style={styles.logo}
          source={require('../../Assets/Icons/QuickAppIcon.png')}
        />
        <Text style={styles.heading}>
          {translate('chains.referredLevel')} {referred}
        </Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.userAmount}>
          {translate('chains.insertUserAmount')}
        </Text>
        <Input
          defaultValue={disabled ? '1'  : ''}
          disabled={disabled}
          onChangeText={value => {
            if (value !== 0) {
              setCurrentLevel(value);
            }
            setLevel(parseInt(toNumber(value)));
          }}
          value={levelValue ? LocaleFormatNumber(levelValue, 0) : ''}
          keyboardType="number-pad"
          textAlign="center"
          inputContainerStyle={{
            borderRadius: 5,
            borderWidth: 2,
            paddingHorizontal: 15,
            width: '100%',
            alignSelf: 'center',
            marginTop: 15,
          }}
        />
      </View>
    </Card>
  );
};

export default ReferredCard;
