import React, { useRef, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';

export const AnimatedTransformCurrency = (props) => {
  const transformAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        transformAnim,
        {
          toValue: Math.floor(Dimensions.get('window').height),
          duration: Math.floor(Math.random() * 1000) + 3000,
          useNativeDriver: true
        }
      )
    ).start();

    return () => {
      Animated.stop()
    }

  }, [transformAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        transform: [{
          translateY: transformAnim
        }],
        zIndex: 1000     // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

