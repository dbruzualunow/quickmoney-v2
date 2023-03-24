import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import AnimatedTragaPerras from './../AnimatedTragaPerras/AnimatedTragaPerras';

const simbolos =
{
  'jackpot': require('../../Assets/Images/logo.png'),
  'siete_icon': require('../../Assets/Images/Tragaperras/Iconos-fondo/siete.jpg'),
  'naranja_icon': require('../../Assets/Images/Tragaperras/Iconos-fondo/naranja.jpg'),
  'patilla_icon': require('../../Assets/Images/Tragaperras/Iconos-fondo/patilla.jpg'),
  'bar1_icon': require('../../Assets/Images/Tragaperras/Iconos-fondo/bar-1.jpg'),
  'bar2_icon': require('../../Assets/Images/Tragaperras/Iconos-fondo/bar-2.jpg'),
  'bar3_icon': require('../../Assets/Images/Tragaperras/Iconos-fondo/bar-3.jpg'),
  'kiwi_icon': require('../../Assets/Images/Tragaperras/Iconos-fondo/kiwi.jpg'),
  'cereza_icon': require('../../Assets/Images/Tragaperras/Iconos-fondo/cereza.jpg'),
  'herradura_icon': require('../../Assets/Images/Tragaperras/Iconos-fondo/herradura.jpg'),
}
export const Tragaperra = ({ value = 'jackpot', animationValue = null, isAnimate, styleValue = { width: 70, height: 80, backgroundColor, }, resizeModeValue = 'cover', disable = false, inGame = false, valueIndex = 'jackpot' }) => {

  const [cardImage, setCardImage] = useState(simbolos[value] || simbolos[value]);
  const [throwDice, setThrowDice] = useState(null)

  useEffect(() => {
    if (!isAnimate) {
      setCardImage(simbolos[value])
    }

  }, [value])

  useEffect(() => {
    if (animationValue === null && isAnimate) return
    setCardImage(simbolos[animationValue] || simbolos[value])
    setThrowDice(animationValue)
  }, [animationValue, isAnimate])


  const styleInGame = inGame ? {
    opacity: disable ? 0.7 : 1,
    borderWidth: disable ? 2 : 2,
    borderColor: 'rgba(0, 133, 255, 1)',
    marginHorizontal: 4
  } : {
    opacity: 1,
    borderWidth: 2,
    borderColor: 'transparent',
    marginHorizontal: 5.5
  }

  const source = inGame ? simbolos[valueIndex] || simbolos[value] : cardImage || simbolos[value];

  return (
    <View>
      {disable && <Image
        source={source}
        style={{
          ...styleValue,
          opacity: 1,
          borderWidth: 2,
          borderColor: 'transparent',
        }}
        resizeMode={resizeModeValue}
      />}

      {!disable && <>
        {throwDice === null ? (
          <View>
            <Image
              source={source}
              style={{ ...styleValue, ...styleInGame }}
              resizeMode={resizeModeValue}
            />
          </View>
        ) : <>
          <AnimatedTragaPerras indexDado={throwDice} onFinish={() => {
            setThrowDice(null)
          }} />
        </>}
      </>}
    </View>
  )
}
