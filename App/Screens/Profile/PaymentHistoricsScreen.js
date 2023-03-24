import React, { useEffect, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import Header from "../../Components/CustomUI/Header"
import translate from "../../I18n"
import ApiService from "../../Services/ApiService"
import moment from 'moment'

import styles from './Styles/PaymentHistoricsScreenStyles'

const PaymentHistoricsScreen = (props) => {

    const [payedPrizes, setPayedPrizes] = useState([])

    useEffect(() => {
        ApiService.getMyPrices()
            .then(response => {
                if (response?.data) {
                    const PayedPrizes = response.data.filter(({ status }) => status === "payed")
                    setPayedPrizes(PayedPrizes)
                }

            }).catch(error => {
                console.log('ERROR: ', { error });
            })
    }, [])

    const renderPaymentRow = ({ quantity, createdAt }, key) => (
        <View style={styles.paymentRowContainer} key={key}>
            <View style={styles.paymentRow}>
                <Text>{translate('general.withdraw')}</Text>
                <Text style={styles.ammount}>-{quantity}€</Text>
            </View>
            <View style={styles.paymentRow}>
                <Text style={styles.completedStatus}>{translate('profile.payed')}</Text>
                <Text style={styles.date}>{moment(createdAt).format('L')}</Text>
            </View>
        </View>
    )

    return (
        <View>
            <Header backTitle={translate('profile.profile')} />
            <ScrollView>
                <View style={styles.mainContainer}>

                    <Text style={styles.title}>
                        {translate('profile.yourPaymentHistorics')}
                    </Text>
                    {payedPrizes.map((payedPrice, key) => renderPaymentRow({ ...payedPrice }, key) )}
                </View>
            </ScrollView>

        </View>
    )
}
export default PaymentHistoricsScreen