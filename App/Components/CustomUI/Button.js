import React from 'react';
import { Button } from 'react-native-elements';
import Colors from '../../Themes/Colors';


const CustomButton = (props) => (
    <Button
        loadingProps={{
            color: Colors.green
        }}
        {...props}
        buttonStyle={{
            backgroundColor: props.inverse ? 'white' : Colors.green,
            borderRadius: 50,
            borderColor: Colors.green,
            borderWidth: 1,
            ...props.buttonStyle
        }}
        titleStyle={{
            fontWeight: 'bold',
            fontSize: 18,
            color: props.inverse ? Colors.green : 'white',
            margin: 3,
            ...props.titleStyle

        }}
        disabledStyle={{
            backgroundColor: '#CFCFCF',
            borderWidth: 0
        }}
        disabledTitleStyle={{
            color: 'white'
        }}
        containerStyle={{
            width: '100%',
            ...props.containerStyle
        }}
    />
)

export default CustomButton;