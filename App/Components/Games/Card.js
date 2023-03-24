import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import corazones from '../../Components/Modal/corazones/index'
import treboles from '../../Components/Modal/treboles/index'
import diamantes from '../../Components/Modal/diamantes/index'
import picas from '../../Components/Modal/picas/index'

export const Card = ({ type, card, stylesValue}) => {
    
    const cartas = {
        corazones,
        treboles,
        diamantes,
        picas
    }

    const _default = require('../../Assets/Images/Cartas/mazo.png')
    const [cardImage, setCardImage] = useState(_default)

    useEffect(() => {
        const fetchImage = () => {
            const _default = '../../Assets/Images/Cartas/mazo.png'
            const cardPath = card ? cartas[type][card - 1]: require(_default);
            return cardPath
        }

        setCardImage(fetchImage())
    }, [card])
    return (

        <Image source={cardImage}
            style={{ width: 68, height: 100, ...stylesValue }}
            resizeMode="contain"
        />
    )
}
