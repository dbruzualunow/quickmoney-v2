import React from "react"
import { Overlay } from "react-native-elements"


const CustomModal = (props) => {
    const { isVisible, onDismiss, children, overlayStyle } = props

    return (
        <Overlay
            overlayStyle={{
                minHeight: '50%',
                maxHeight: '90%',
                width: '90%',
                alignItems: 'center',
                justifyContent: 'space-around',
                borderRadius: 10,
                padding: 30,
                ...overlayStyle
            }}
            isVisible={isVisible}
            onDismiss={onDismiss}
            onBackdropPress={onDismiss}
        >
            
            {children}
        </Overlay>
    )
}
export default CustomModal