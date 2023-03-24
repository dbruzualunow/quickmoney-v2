import React from "react"
import { View } from "react-native"
import Header from "../../Components/CustomUI/Header"
import translate from "../../I18n"

import DataPrivacityText from "../../Components/Profile/DataPrivacityText"

const DataPrivacyScreen = (props) => {

    return (
        <View>
            <Header backTitle={translate('profile.profile')} />
            <DataPrivacityText {...props} />
        </View>
    )
}
export default DataPrivacyScreen