import I18n from "i18n-js"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, ScrollView, Text, View } from "react-native"
import { CheckBox } from "react-native-elements"

import translate from "../../I18n"
import ApiService from "../../Services/ApiService"

import styles from './Styles/DataPrivacyTextStyles'

const DataPrivacityText = ({ route, onTermsAccepted }) => {

    const showPrivacy = route?.params ? route?.params.showPrivacy : true
    const showTermsAndConditions = route?.params ? route?.params.showTermsAndConditions : true

    const [isCheckedOver18, setIsCheckedOver18] = useState(false)
    const [isCheckedPolicy, setIsCheckedPolicy] = useState(false)
    const [legalText, setLegalText] = useState(null)

    useEffect(() => {
        ApiService.getLegal()
            .then(response => {
                if (response?.data?.data?.attributes) {
                    const responseData = response.data.data.attributes
                    const data = I18n.locale === 'en' 
                    ? 
                    {termsAndConditions: responseData.termsAndConditionsEn, privacy: responseData.privacyEn}
                    : 
                    {termsAndConditions: responseData.termsAndConditionsEs, privacy: responseData.privacyEs};
                    setLegalText(data)
                }
            })
    }, [])

    useEffect(() => {
        if (isCheckedPolicy && setIsCheckedOver18) {
            onTermsAccepted()
        }
    }, [isCheckedOver18, isCheckedPolicy])


    return (
        <ScrollView horizontal={false}>
            <View style={styles.mainContainer}>

                {/* <Text style={styles.title}>
                    {translate('profile.privacyDataPolicy')}
                </Text> */}
                {showPrivacy && <Text>
                    {legalText?.privacy
                        ? legalText?.privacy
                        : <ActivityIndicator style={styles.activityIndicator} />}
                </Text>}
                {/* {showTermsAndConditions && <Text style={styles.title}>
                    {translate('profile.termsAndConditions')}
                </Text>} */}
                {showTermsAndConditions && <Text>
                    {legalText?.termsAndConditions
                        ? legalText?.termsAndConditions
                        : route?.params && <ActivityIndicator style={styles.activityIndicator} />}
                </Text>}
                {!route?.params && legalText
                    && <>
                        <CheckBox
                            title={translate('profile.iAmOver18')}
                            checked={isCheckedOver18}
                            onPress={() => setIsCheckedOver18(!isCheckedOver18)}
                            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                        />
                        <CheckBox
                            title={translate('profile.acceptPolicy')}
                            checked={isCheckedPolicy}
                            onPress={() => setIsCheckedPolicy(!isCheckedPolicy)}
                            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                        />
                    </>}

            </View>
        </ScrollView>
    )
}
export default DataPrivacityText