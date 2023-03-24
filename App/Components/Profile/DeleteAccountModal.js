import React, { useContext } from "react"
import { Text, View } from "react-native"

import Button from "../CustomUI/Button"
import Modal from "../CustomUI/Modal"

import ApiService from "../../Services/ApiService"

import translate from "../../I18n"
import { AuthenticationContext } from "../../Context/AuthenticationContextProvider";
import { useNavigation } from "@react-navigation/native"
import { moderateScale, verticalScale } from "../../../Metrics"


const DeleteAccountModal = ({ isVisible, onDismiss }) => {

    const { user, signOut } = useContext(AuthenticationContext)
    const navigation = useNavigation();
    const deleteUser = async () => {
        try {
            const result = await ApiService.deleteUser(user.id)
            await onDismiss()
            await signOut()
            navigation.navigate('SignUp1')

        } catch (error) {
            console.log({ error })
        }

    }

    return (
        <Modal isVisible={isVisible} onDismiss={onDismiss}>
            <Text style={{ fontSize: moderateScale(22), textAlign: 'center' }}>{translate('profile.sureDeleteProfile')}</Text>
            <View style={{ width: '100%' }}>
                <Button title={translate('profile.deleteAccount')} containerStyle={{ marginBottom: verticalScale(5) }} onPress={deleteUser} />
                <Button inverse title={translate('general.goBack')} onPress={onDismiss} />
            </View>
        </Modal>
    )
}
export default DeleteAccountModal;