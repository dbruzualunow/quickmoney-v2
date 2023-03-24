import I18n from "i18n-js"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { ScrollView, Text, View } from "react-native"
import Header from "../../Components/CustomUI/Header"
import HelpQuestionRow from "../../Components/Profile/HelpQuestionRow"
import translate from "../../I18n"
import ApiService from "../../Services/ApiService"

import styles from './Styles/HelpScreenStyles'

const HelpScreen = () => {

    const [faqs, setFaqs] = useState(undefined)
    useEffect(() => {
        ApiService.getFaqs()
            .then(response => {
                if (response.data?.data) {
                    setFaqs(response.data.data)
                }

            })
    }, [])

    return (
        <View>
            <Header backTitle={translate('profile.profile')} />
            <ScrollView>
                <View style={styles.mainContainer}>
                    <Text style={styles.faqTitle}>
                        FAQs
                    </Text>
                    {faqs?.map(({ attributes }, key) => {
                        return (
                            <HelpQuestionRow
                                key={key}
                                title={I18n.locale === 'en' ? attributes.questionEn : attributes.questionEs}
                                explanation={I18n.locale === 'en' ? attributes.answerEn : attributes.answerEs}
                            />
                        )
                    })}
                </View>
            </ScrollView>

        </View>
    )
}
export default HelpScreen