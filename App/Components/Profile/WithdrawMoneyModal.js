import React, { useEffect, useState } from "react"
import { Image, Text, View, Alert, ActivityIndicator } from "react-native"

import Button from "../CustomUI/Button"
import Modal from "../CustomUI/Modal"
import ProfileInput from '../../Components/CustomUI/ProfileInput';
import translate from "../../I18n"
import ApiService from "../../Services/ApiService"
import { Input } from "react-native-elements"
import LocaleFormatNumber from "../../helpers/LocaleFormatNumber";
import CustomButton from "../CustomUI/Button"
import { useNavigation } from "@react-navigation/native";
import { horizontalScale, moderateScale } from "../../../Metrics";


const WithdrawMoneyModal = ({ isVisible, onDismiss }) => {

    const navigation = useNavigation();

    const [isVisibleSuccessModal, setIsVisibleSuccessModal] = useState(false)
    const [winnedQuantity, setWinnedQuantity] = useState(0)
    const [withdrawAmount, setWithdrawAmount] = useState(0)
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // const [isVisiblePasswordVerificationModal, setIsVisiblePasswordVerificationModal] = useState(false)
    const [password, setPassword] = useState(null);
    const [withdrawModal, setWithdrawModal] = useState(true)

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    // const validateAmount = (amount) => {
    //     return String(amount)
    //         .match(/^[0-9]{1,2}([.][0-9]{1,2})?$/);
    // };

    // const dismissPasswordVerificationModal = () => {
    //     setPassword(null);
    //     setIsVisiblePasswordVerificationModal(false)
    // }

    // const submitWithdrawal = () => {
    //     setIsLoading(true)
    //     // dismissPasswordVerificationModal(true)
    //     ApiService.paypalWithdrawal(password, withdrawAmount, email)
    //         .then((response) => {
    //             setIsLoading(false)
    //             if (response.data.ok) {
    //                 setIsVisibleSuccessModal(true)
    //                 setWithdrawAmount(0)
    //                 setEmail('')
    //             } else {
    //                 Alert.alert(
    //                     "Error",
    //                     translate('profile.error'),
    //                     [
    //                         { text: "OK", onPress: () => console.log("OK Pressed") }
    //                     ]
    //                 );
    //             }
    //         }).catch(error => {
    //             setIsLoading(false)
    //             console.log('Withdrawal call error: ', error)
    //             Alert.alert(
    //                 "Error",
    //                 translate('profile.error'),
    //                 [
    //                     { text: "OK", onPress: () => console.log("OK Pressed") }
    //                 ]
    //             );
    //         })
    // }

    const onButtonPress = () => {
        // if (!withdrawAmount) {
        //     Alert.alert(
        //         "Error",
        //         translate('profile.amountError'),
        //         [
        //             { text: "OK", onPress: () => console.log("OK Pressed") }
        //         ]
        //     );
        //     return
        // }
        if (withdrawAmount < 10) {
            Alert.alert(
                translate('profile.errorMinWithdraw'),
                translate('profile.minWithdraw'),
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return
        }
        if (!email || !validateEmail(email)) {
            Alert.alert(
                "Error",
                translate('profile.emailError'),
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return
        }

        const data = {
            "paypalEmail": email,
            "amount": parseFloat(withdrawAmount),
        }

        ApiService.sendDataUserPp(data).then((response) => {
            if (response.data.status === "ok") {
                Alert.alert(
                    translate("profile.successRequest"),
                    translate("profile.withdrawSuccess"),
                    [{ text: "OK", onPress: () => onDismiss() }]
                )
            }
        }).catch((error) => {
            if (error?.response?.data?.error?.message === 'insufficient balance') {
                Alert.alert("Error", translate('profile.withdrawInsufficientBalance'), [{ text: "OK", onPress: () => onDismiss() }])
            }else{
                Alert.alert("Error", translate('profile.tryLaterError'))
            }
        })
    };


    useEffect(() => {
        setWithdrawAmount(0)
        ApiService.getPrizeSummary()
            .then((response) => {
                const { totalAvailable } = response.data
                setWinnedQuantity(totalAvailable)
            }).catch(error => {
                console.log('ERROR: ', { error });
            })
    }, [isVisibleSuccessModal, isVisible])


    const requestMoney = () => {
        ApiService.requestMoney(winnedQuantity)
            .then(response => {
                onDismiss()
            })
    }

    const toNumber = (val) => {
        let result = val ? val.toString() : '0'
        result = parseInt(result.replace(/\D/g, ''));
        return result.toString()
    }

    const generateNumbers = (number, quantity) => {
        let result = ''
        for (let i = 0; i < quantity; i++) {
            result += number
        }
        return result;
    }

    const formatNumber = (val) => {
        let result = val
        if (result.length < 3) {
            const quantityZero = 3 - result.length
            result = `${generateNumbers(0, quantityZero)}${result}`
        }
        result = parseFloat(`${result.slice(0, -2)}.${result.slice(-2)}`).toFixed(2)
        result = LocaleFormatNumber(result)
        return result;
    }

    const handleChange = (value) => {
        setWithdrawAmount((parseInt(toNumber(value)) / 100).toFixed(2))
    }

    const withdrawAmountFormated = (value) => {
        let result = toNumber(value)
        result = formatNumber(result)
        return result
    }

    return (
        <Modal isVisible={isVisible} onDismiss={onDismiss}>
            {
                isLoading ? <ActivityIndicator size="large" color="#517664" /> :
                    <>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                style={{ height: 25, width: 25, marginRight: horizontalScale(12) }}
                                resizeMode='contain'
                                source={require('../../Assets/Icons/coin.png')} />
                            <Text style={{ fontSize: moderateScale(22), textAlign: 'center', }}>
                                <Text style={{ fontWeight: 'bold', marginRight: horizontalScale(8) }}>
                                    {LocaleFormatNumber(winnedQuantity)}€
                                </Text>
                                {' ' + translate('profile.moneyAvalaible')}
                            </Text>
                        </View>
                        <Text style={{ fontSize: moderateScale(20), textAlign: 'center' }}>{translate('profile.chooseAmountWithdraw')}</Text>
                        <Input
                            keyboardType='number-pad'
                            textAlign='center'
                            inputContainerStyle={{
                                borderRadius: moderateScale(5),
                                borderWidth: moderateScale(1),
                                width: '60%',
                                alignSelf: 'center',
                            }}
                            onChangeText={handleChange}
                            value={withdrawAmountFormated(withdrawAmount)}
                        />
                        <Image
                            style={{ height: 30, marginRight: 15 }}
                            resizeMode='contain'
                            source={require('../../Assets/Images/paypal.png')} />
                        <ProfileInput
                            label={translate('general.email')}
                            value={email}
                            onChangeText={email => { setEmail(email) }}
                        />
                        <View style={{ width: '100%' }}>
                            <Button
                                disabled={withdrawAmount > winnedQuantity}
                                title={translate('profile.withdraw')}
                                containerStyle={{ marginBottom: 5 }}
                                onPress={onButtonPress}
                            />
                        </View>
                    </>
            }

            {/* <Modal isVisible={isVisibleSuccessModal} onDismiss={onDismiss}>
                <View
                    style={{
                        position: 'absolute',
                        top: 3,
                    }}>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 20 }}>
                    {translate('general.congrats')}
                </Text>
                <Text style={{ paddingHorizontal: 50, textAlign: 'center', marginBottom: 20 }}>
                    {translate('general.successfull-withdrawal')}
                </Text>
                <CustomButton title={translate('general.accept')} onPress={() => { setIsVisibleSuccessModal(false); onDismiss }} />
            </Modal> */}

            {/* <Modal 
                isVisible={true}
                overlayStyle={{
                    height: '5%',
                }}
            >
                <View style={{
                    backgroundColor: 'red',
                }}>
                <Text>Recibirá el pago en su cuenta en un máximo de 72h</Text>
                </View> */}
            {/* <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                    {translate('profile.enterPassword')}
                </Text>
                <Text>
                    {translate('profile.PaypalConfirmPassword')}
                </Text>
                <Input
                    keyboardType='default'
                    secureTextEntry={true}
                    placeholder="Password"
                    textAlign='center'
                    onChangeText={value => setPassword(value)}
                /> */}
            {/* <CustomButton
                    title={"Cancel"}
                    // onPress={dismissPasswordVerificationModal}
                />
                <CustomButton
                    title={"OK"}
                    disabled={!password}
                    // onPress={submitWithdrawal}
                /> */}
            {/* </Modal> */}
        </Modal>
    )
}
export default WithdrawMoneyModal;