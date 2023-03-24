import React, { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-elements"


import styles from './Styles/HelpQuestionRowStyles'

const HelpQuestionRow = ({ title, explanation }) => {

    const [isOpen, setIsOpen] = useState(false)

    const toogleRow = () => {
        setIsOpen(isOpen => !isOpen)
    }

    return (
        <View>
            <TouchableOpacity style={styles.titleRowContainer} onPress={toogleRow}>
                <Text style={styles.title}>{title}</Text>
                <Icon name={isOpen ? 'close' : 'add'} />
            </TouchableOpacity>
            {isOpen && <View>
                <Text style={styles.explanaition}>{explanation}</Text>
            </View>}
        </View>
    )

}

export default HelpQuestionRow