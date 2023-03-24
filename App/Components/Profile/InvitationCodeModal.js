import React, { useState } from "react"
import { Text, View } from "react-native"

import Button from "../CustomUI/Button"
import Modal from "../CustomUI/Modal"

import translate from "../../I18n"
import { Input } from "react-native-elements"
import ApiService from "../../Services/ApiService"


const InvitationCodeModal = ({ isVisible, onDismiss }) => {

    const [chainCode, setChainCode] = useState('')
    const linkChainCode = async () => {
        try {
            const response = await ApiService.linkChain(chainCode)
            onDismiss()

        } catch (error) {
            console.log('ERROR: ', {error});
        }
    }

    return (
        <Modal isVisible={isVisible} onDismiss={onDismiss}>
            <Text style={{ fontSize: 22, textAlign: 'center' }}>{translate('profile.haveInvitationCode')}</Text>
            <Input
                keyboardType='number-pad'
                textAlign='center'
                inputContainerStyle={{
                    borderRadius: 5,
                    borderWidth: 2,
                    paddingHorizontal: 15,
                    width: '60%',
                    alignSelf: 'center'
                }}
                onChangeText={setChainCode}
                value={chainCode}
            />
            <View style={{ width: '100%' }}>
                <Button title={translate('general.validate')} onPress={linkChainCode} />
            </View>
        </Modal>
    )
}
export default InvitationCodeModal;