import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  KeyboardAvoidingView
} from 'react-native';
import SpriteSheet from './../SpriteSheet/SpriteSheet';

const imagesDatos = {
  1: require('./../../Assets/Images/animations/dado-1-prueba.png'),
  2: require('./../../Assets/Images/animations/dado-2-prueba.png'),
  3: require('./../../Assets/Images/animations/dado-3-prueba.png'),
  4: require('./../../Assets/Images/animations/dado-4-prueba.png'),
  5: require('./../../Assets/Images/animations/dado-5-prueba.png'),
  6: require('./../../Assets/Images/animations/dado-6-prueba.png')
}

const AnimatedCraps = ({ indexDado = 6, onFinish }) => {
  const dado = useRef(null);
  const play = () => {
    dado.current.play({
      type: "walk",
      fps: 24,
      loop: false,
      resetAfterFinish: false,
      onFinish: () => {
        if (typeof onFinish === "function") {
          onFinish()
        }
      }
    });
  };

  useEffect(() => {
    if (dado.current) {
      play()
    }
  }, [dado])

  return (
      <SpriteSheet
        ref={dado}
        source={imagesDatos[indexDado]}
        columns={16}
        rows={1}
        height={250}
        width={250}
        imageStyle={{}}
        animations={{
          walk: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,],
        }}
      />

  )
}

export default AnimatedCraps
