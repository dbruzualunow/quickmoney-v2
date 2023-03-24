import React from 'react';
import { Input } from 'react-native-elements';


const CustomInput = ({ inputRef, containerStyle, ...restProps}) => (
    <Input
        ref={inputRef}
        {...restProps}
        errorStyle={{ height: 0 }}
        placeholderTextColor='#FFFFFF80'
        inputStyle={{ color: 'white' }}
        containerStyle={{ ...containerStyle, paddingHorizontal: 0 }}
        inputContainerStyle={{
            borderRadius: 100,
            borderColor: 'white',
            borderWidth: 2,
            color: 'red',
            paddingHorizontal: 15
        }}
    />
)

export default CustomInput;