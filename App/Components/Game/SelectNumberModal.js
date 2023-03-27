import React, { useEffect, useState } from "react"
import { Text, View } from "react-native"

import Button from "../CustomUI/Button"
import Modal from "../CustomUI/Modal"

import translate from "../../I18n"
import { Input } from "react-native-elements"


const SelectNumberModal = ({ isVisible, onDismiss, onNumberSelected, choosedGame }) => {

    const [number, setNumber] = useState('')
    const [error, setError] = useState(true)


    useEffect(() => {
        if (choosedGame === 'CARDS') {
            if (number > 12 || number <= 0) {
                setError(true)
            } else {
                setError(false)
            }
        } else if (choosedGame === 'DICES') {
            if (number > 6 || number <= 0) {
                setError(true)
            } else {
                setError(false)
            }
        } else if (choosedGame === 'NUMBERS') {
            if (number > 10) {
                setError(true)
            } else {
                setError(false)
            }
        }
    }, [number])

    return (
        <Modal isVisible={isVisible} onDismiss={onDismiss}>
            <Text style={{ fontSize: 22, textAlign: 'center' }}>{translate('game.selectNumber')}</Text>
            <Input
                autoFocus
                keyboardType='number-pad'
                textAlign='center'
                inputContainerStyle={{
                    borderRadius: 5,
                    borderWidth: 2,
                    paddingHorizontal: 15,
                    width: '60%',
                    alignSelf: 'center'
                }}
                onChangeText={setNumber}
                value={number}
                errorMessage={error && translate('game.selectNumberError')}
                errorStyle={{ textAlign: 'center' }}
            />
            <View style={{ width: '100%' }}>
                <Button
                    title={translate('general.accept')}
                    disabled={error}
                    onPress={() => {
                        onNumberSelected(number)
                        onDismiss()
                        setNumber()
                    }} />
            </View>
        </Modal>
    )
}
export default SelectNumberModal;