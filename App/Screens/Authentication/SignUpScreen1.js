import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import CountryCodes from '../../Config/CountryCodes.json'
import CustomButton from '../../Components/CustomUI/Button'
import CustomInput from '../../Components/CustomUI/Input'
import Modal from '../../Components/CustomUI/Modal'
import DataPrivacityText from '../../Components/Profile/DataPrivacityText'
import translate from '../../I18n'
import styles from './Styles/AuthenticationScreensStyles'
import { AuthenticationContext } from "../../Context/AuthenticationContextProvider";

const SignUpScreen1 = (props) => {
    const { navigation } = props

    const { signUp } = useContext(AuthenticationContext)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)
    const [repeatPassword, setRepeatPassword] = useState(null)
    const [sharingCode, setSharingCode] = useState(props.route?.params?.sharingCode ?? null)
    const [country, setCountry] = useState(null)

    const [showPrivacyModal, setShowPrivacyModal] = useState(false)

    const ref_input2 = useRef(null);
    const ref_input3 = useRef(null);
    const ref_input4 = useRef(null);
    const ref_input5 = useRef(null);


    const filledSignup = name && username && email && country && password && password === repeatPassword

    const signUp1 = () => {
        setShowPrivacyModal(true)
    }

    const countryItems = CountryCodes.map(({ name, code }) => ({ label: name, value: code }))

    const onTermsAccepted = async () => {
        try {

            setShowPrivacyModal(false)
            setLoading(true)
            const result = await signUp({ email: email.trim(), password, name, country: country.value, sharingCode, username })
            if (!result.success) {
                setError(result.errorMsg);
                crashlytics().recordError(result);

            }
            setLoading(false);
        } catch (error) {
            crashlytics().recordError(error);
console.log({ error })
        }

    }

    return (
        <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <Image style={styles.logo} source={require('../../Assets/Icons/QuickAppIcon.png')} />
                    <View style={{ paddingVertical: 10 }} />

                    <Text style={styles.whiteText}>{translate('authentication.createAccount')} </Text>
                    <View style={{ paddingVertical: 10 }} />
                    <CustomInput
                        placeholder={translate('authentication.completeName')}
                        onChangeText={name => setName(name)}
                        returnKeyType='next'
                        onSubmitEditing={() => ref_input2.current.focus()}
                        blurOnSubmit={false}
                    />
                    <View style={{ paddingVertical: 10 }} />
                    <CustomInput
                        placeholder={translate('authentication.username')}
                        onChangeText={
                            username => {
                                username.length <= 15 ? setUsername(username) : setError(translate('authentication.usernameLengthErrorMax'))
                            }}
                        returnKeyType='next'
                        blurOnSubmit={false}
                        autoCapitalize='none'
                        autoCorrect={false}
                        maxLength={15}
                    />
                    <View style={{ paddingVertical: 10 }} />
                    <CustomInput
                        inputRef={ref_input2}
                        placeholder={translate('authentication.email')}
                        onChangeText={email => setEmail(email)}
                        keyboardType='email-address'
                        returnKeyType='next'
                        onSubmitEditing={() => ref_input3.current.focus()}
                        blurOnSubmit={false}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <View style={{ paddingVertical: 10 }} />
                    <CustomInput
                        inputRef={ref_input3}
                        placeholder={translate('authentication.password')}
                        secureTextEntry={true}
                        onChangeText={password => setPassword(password)}
                        returnKeyType='next'
                        onSubmitEditing={() => ref_input4.current.focus()}
                        blurOnSubmit={false}
                        autoCorrect={false}
                    />
                    <View style={{ paddingVertical: 10 }} />
                    <CustomInput
                        inputRef={ref_input4}
                        placeholder={translate('authentication.repeatPassword')}
                        secureTextEntry={true}
                        onChangeText={repeatPassword => setRepeatPassword(repeatPassword)}
                        returnKeyType='next'
                        autoCorrect={false}
                        onSubmitEditing={() => ref_input5.current.focus()}
                        blurOnSubmit={false}
                    />
                    <View style={{ paddingVertical: 10 }} />
                    <CustomInput
                        inputRef={ref_input5}
                        defaultValue={sharingCode}
                        placeholder={translate('authentication.sharingCode')}
                        onChangeText={sharingCode => setSharingCode(sharingCode)}
                        returnKeyType='next'
                        autoCorrect={false}
                    />
                    <View style={{ paddingVertical: 10 }} />
                    <RNPickerSelect
                        placeholder={{ label: translate('authentication.chooseACountry'), value: null }}
                        onValueChange={(value, index) => { setCountry(countryItems[index - 1] ?? null) }}
                        items={countryItems}
                    >
                        <CustomInput
                            containerStyle={{ minWidth: '100%' }}
                            placeholder={translate('authentication.country')}
                            value={country?.label}
                        />
                    </RNPickerSelect>
                    {error && <Text style={styles.errorText}>{error}</Text>}
                    {!!(password && password !== repeatPassword) && <Text style={styles.errorText}>{translate('authentication.passwordsDoNotMatch')}</Text>}
                    <View style={{ paddingVertical: 10 }} />
                    <CustomButton loading={loading} title={translate('authentication.create')} inverse disabled={!filledSignup} onPress={signUp1} />
                    <View style={{ paddingVertical: 10 }} />
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.whiteText}>
                            {translate('authentication.alreadyAccount')}
                            <Text style={{ fontWeight: 'bold' }}>{' ' + translate('authentication.login')}</Text>
                        </Text>
                    </TouchableOpacity>
                    <Modal overlayStyle={{ height: '90%', padding: 5 }} isVisible={showPrivacyModal} onDismiss={() => setShowPrivacyModal(false)}>
                        <DataPrivacityText onTermsAccepted={onTermsAccepted} />
                    </Modal>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}

export default SignUpScreen1