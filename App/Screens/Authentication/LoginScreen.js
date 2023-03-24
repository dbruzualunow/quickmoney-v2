import React, {useContext, useEffect, useRef, useState} from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import CustomButton from '../../Components/CustomUI/Button'
import CustomInput from '../../Components/CustomUI/Input'
import translate from '../../I18n'
import styles from './Styles/AuthenticationScreensStyles'
import { AuthenticationContext } from "../../Context/AuthenticationContextProvider";
import {clearStoredSharingCode, getStoredSharingCode, handleShareLink} from "../../helpers/DynamicLinks";

const LoginScreen = (props) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const {signIn} = useContext(AuthenticationContext);
    const { navigation } = props
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const ref_input2 = useRef(null);

    const filledSignup = email && password


    const login = async () => {
        setError(false)
        const success = await signIn({email, password});
        setLoading(success);
        setError(!success)
    }

	const recoverSharingCode = async () => {
		setLoading(true)
		try{
			await handleShareLink();
			const result = await getStoredSharingCode();
			if(result){
				await navigation.navigate('SignUp1', {sharingCode:result});
			}
		} catch(error) {
			console.log('Error - recoverSharingCode: ', error)
		} finally {
			await clearStoredSharingCode();
			setLoading(false)
		}
	}

	useEffect(() => {
		recoverSharingCode();
	}, [])

    return (
        <KeyboardAvoidingView behavior={(Platform.OS === 'ios') ? "padding" : null}>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <Image style={styles.logo} source={require('../../Assets/Icons/QuickAppIcon.png')} />
                    <View style={{ paddingVertical: 30 }} />
                    <CustomInput
                        placeholder={translate('authentication.email')}
                        onChangeText={email => setEmail(email)}
                        onSubmitEditing={() => ref_input2.current.focus()}
                        returnKeyType='next'
                        blurOnSubmit={false}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <View style={{ paddingVertical: 20 }} />

                    <CustomInput
                        inputRef={ref_input2}
                        placeholder={translate('authentication.password')}
                        secureTextEntry={true}
                        onChangeText={password => setPassword(password)}
                        onSubmitEditing={() => login()}
                        returnKeyType='send'
                        autoCorrect={false}
                    />
                    {error && <Text style={styles.errorText}>{translate('authentication.loginError')}</Text>}
                    <View style={{ paddingVertical: 20 }} />

                    <CustomButton loading={loading} title={translate('authentication.login')} inverse disabled={!filledSignup} onPress={login} />
                    <View style={{ paddingVertical: 20 }} />

                    <TouchableOpacity onPress={() => navigation.navigate('SignUp1')}>
                        <Text style={{...styles.whiteText, paddingVertical: 20 }}>
                            {translate('authentication.createAccount')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.whiteText}>
                            {translate('authentication.forgotPassword')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )
}

export default LoginScreen