import React, { useContext, useRef, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import CustomButton from '../../Components/CustomUI/Button'
import CustomInput from '../../Components/CustomUI/Input'
import { AuthenticationContext } from '../../Context/AuthenticationContextProvider'
import translate from '../../I18n'
import ApiService from '../../Services/ApiService'
import styles from './Styles/AuthenticationScreensStyles'

const ForgotPasswordScreen = ({ navigation }) => {

    const [email, setEmail] = useState(null)
    const [code, setCode] = useState(null)
    const [password, setPassword] = useState(null)
    const [repeatPassword, setRepeatPassword] = useState(null)
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null)

    const [IsSendedCode, setSendedCode] = useState(false)

    const ref_input2 = useRef(null);
    const ref_input3 = useRef(null);

    const sendCode = async () => {
        setLoading(true)
        ApiService.forgotPassword(email)
            .then(response => {
                setLoading(false)
                setError(false)
                setSendedCode(true)
            })
            .catch(error => {
                console.log('ERROR: ', { error });
                setError(true)
                setLoading(false)
            })
    }

    const renderSendCodeScreen = () => (
        <ScrollView>
            <View style={[styles.mainContainer, { justifyContent: 'center' }]}>
                <Image style={styles.logo} source={require('../../Assets/Icons/QuickAppIcon.png')} />
                <Text style={styles.forgotPasswordExplanation}>
                    {translate('authentication.forgotPasswordExplanation')}
                </Text>
                <CustomInput
                    key='email'
                    placeholder={translate('authentication.email')}
                    onChangeText={email => setEmail(email)}
                    returnKeyType='send'
                    autoCapitalize='none'
                    onSubmitEditing={() => sendCode()}
                />
                <View style={{ marginTop: 20 }} />
                <CustomButton loading={loading} title={translate('general.send')} inverse disabled={!email} onPress={sendCode} />
                <View style={{ marginTop: 20 }} />
                {error && <Text style={styles.errorText}>{translate('authentication.loginError')}</Text>}
            </View>
        </ScrollView>
    )


    const filledCode = code && password && password === repeatPassword

    const renderNewPasswordScreen = () => (
        <ScrollView>
            <View style={[styles.mainContainer, { justifyContent: 'center' }]}>
                <Image style={styles.logo} source={require('../../Assets/Icons/QuickAppIcon.png')} />
                <View style={{ marginTop: 20 }} />
                <Text style={styles.forgotPasswordExplanation}>
                    {translate('authentication.forgotPasswordCheckEmail')}
                </Text>
            </View>
        </ScrollView>
    )





    return (
        <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null}>
            {IsSendedCode ? renderNewPasswordScreen() : renderSendCodeScreen()}
        </KeyboardAvoidingView>
    )
}

export default ForgotPasswordScreen