import React from "react"
import { Text, Button, View, Image } from "react-native"
import translate from "../../I18n"
import { AnimatedFirework } from "../AnimatedFirework/AnimatedFirework"
import CustomButton from "../CustomUI/Button"
import Modal from "../CustomUI/Modal"


const AddSuccessModal = ({ isVisible, onDismiss }) => {
    return (
        <Modal isVisible={isVisible} onDismiss={onDismiss}>
            <View
                style={{
                    position: 'absolute',
                    top:3,
                }}>
                <AnimatedFirework />
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 20 }}>
                {translate('general.congrats')}
            </Text>
            <Text style={{ paddingHorizontal: 50, textAlign: 'center', marginBottom: 20 }}>
                {translate('game.youWin')}
                <Text style={{ fontWeight: 'bold', }}>
                    {` 1 ticket`}
                </Text>
            </Text>
            <Image 
                style={{height: '20%', marginBottom: 10}}
                source={require('../../Assets/Images/ticket_dorado.png')} 
                resizeMode='contain'
            />
            <CustomButton title={translate('general.accept')} onPress={onDismiss} />
        </Modal>
    )
}
export default AddSuccessModal