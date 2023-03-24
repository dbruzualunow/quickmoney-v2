import React, { useContext } from "react"
import { Text, View } from "react-native"

import Button from "../CustomUI/Button"
import Modal from "../CustomUI/Modal"

import translate from "../../I18n"
import { AuthenticationContext } from "../../Context/AuthenticationContextProvider";
import { moderateScale } from "../../../Metrics"

const LogoutModal = ({ isVisible, onDismiss }) => {

    const { signOut } = useContext(AuthenticationContext)

    return (
        <Modal isVisible={isVisible} onDismiss={onDismiss}>
            <Text style={{ fontSize: moderateScale(22), textAlign: 'center' }}>{translate('profile.sureCloseSession')}</Text>
            <View style={{ width: '100%' }}>
                <Button title={translate('profile.closeSession')} containerStyle={{ marginBottom: 5 }} onPress={signOut} />
                <Button inverse title={translate('general.goBack')} onPress={onDismiss} />
            </View>
        </Modal>
    )
}
export default LogoutModal;