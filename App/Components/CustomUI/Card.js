import React from 'react';
import { Card } from 'react-native-elements';

import styles from './Styles/CardStyles.js'

const CustomCard = (props) => (
    <Card
        containerStyle={styles.containerStyle}
        {...props}
    />
)

export default CustomCard;