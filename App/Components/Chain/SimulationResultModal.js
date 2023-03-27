import React, { useContext } from 'react';
import { Text, View } from 'react-native';

import Button from '../CustomUI/Button';
import Modal from '../CustomUI/Modal';
import translate from '../../I18n';
import { useNavigation } from '@react-navigation/native';
import LocaleFormatNumber from '../../helpers/LocaleFormatNumber';

const SimulationResultModal = ({
  isVisible,
  onDismiss,
  setIsVisible,
  monthlyPrize,
  anualPrize,
totalUsers,
}) => {
  const navigation = useNavigation();
  return (
    <Modal isVisible={isVisible} onDismiss={onDismiss}>
      <Text style={{ fontWeight: 'bold', fontSize: 28, textAlign: 'center' }}>
        {translate('chains.simulationResult')}
      </Text>
      <View style={{ width: '100%' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          {translate('chains.monthlyProfit')}
          <Text style={{ fontWeight: 'normal' }}> {`${LocaleFormatNumber(Math.round(monthlyPrize * 100) / 100)}`} €</Text>
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          {translate('chains.annualProfit')}
          <Text style={{ fontWeight: 'normal' }}> {`${LocaleFormatNumber(Math.round(anualPrize * 100) / 100)}`} €</Text>
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            {translate('general.user')}/s:
          <Text style={{ fontWeight: 'normal' }}> {`${LocaleFormatNumber(totalUsers, 0)}`} </Text>
        </Text>
      </View>
      <View style={{ width: '100%' }}>
        <Button
          title={translate('chains.keepSimulating')}
          containerStyle={{ marginBottom: 5 }}
          onPress={onDismiss}
        />
        <Button
          inverse
          title={translate('chains.closeSimulator')}
          onPress={() => {
            setIsVisible(false);
            navigation.goBack();
          }}
        />
      </View>
    </Modal>
  );
};
export default SimulationResultModal;
