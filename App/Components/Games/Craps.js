import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import AnimatedCraps from '../AnimatedCraps/AnimatedCraps';

export const randoMminMax = (min, max) => {
  return min + Math.random() * (max - min);
};

const dados = {
  1: require('../../Assets/Images/Dados/dado_1.png'),
  2: require('../../Assets/Images/Dados/dado_2.png'),
  3: require('../../Assets/Images/Dados/dado_3.png'),
  4: require('../../Assets/Images/Dados/dado_4.png'),
  5: require('../../Assets/Images/Dados/dado_5.png'),
  6: require('../../Assets/Images/Dados/dado_6.png'),
}

export const Craps = ({value = 6, animationValue = null, isAnimate, styleValue = { width: 62, height: 95, }, resizeModeValue = 'cover' }) => {

  const _default = require('../../Assets/Images/Dados/dadoDefault.png')
  const [cardImage, setCardImage] = useState(dados[value] || _default);
  const [throwDice, setThrowDice] = useState(null)

  useEffect(() => {
    if (!isAnimate) {
      setCardImage(dados[value] || _default)
    }
  }, [value])

  useEffect(() => {
    if (animationValue === null && isAnimate) return
    setCardImage(dados[value] || _default)
    setThrowDice(animationValue)
  }, [animationValue, isAnimate])

  return (
    <View>
      {throwDice === null ?
        <Image
          source={cardImage}
          style={styleValue}
          fadeDuration={0}
          resizeMode={resizeModeValue}
        /> : 
        <AnimatedCraps
          indexDado={throwDice}
          onFinish={() => {
            setThrowDice(null)
          }} 
        />
      }
    </View>
  )
}