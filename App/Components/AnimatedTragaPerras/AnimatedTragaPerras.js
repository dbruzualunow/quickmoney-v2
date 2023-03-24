import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    View,
    KeyboardAvoidingView
} from 'react-native';
import SpriteSheet from './../SpriteSheet/SpriteSheet';

const imagesDatos = {
    'siete_icon': require('./../../Assets/Images/animations/7.jpg'),
    'naranja_icon': require('./../../Assets/Images/animations/naranja.jpg'),
    'patilla_icon': require('./../../Assets/Images/animations/patilla.jpg'),
    'bar1_icon': require('./../../Assets/Images/animations/bar-1.jpg'),
    'bar2_icon': require('./../../Assets/Images/animations/bar-2.jpg'),
    'bar3_icon': require('./../../Assets/Images/animations/bar-3.jpg'),
    'kiwi_icon': require('./../../Assets/Images/animations/kiwi.jpg'),
    'cereza_icon': require('./../../Assets/Images/animations/cereza.jpg'),
    'herradura_icon': require('./../../Assets/Images/animations/herramienta.jpg'),
    'jackpot': require('./../../Assets/Images/animations/herramienta.jpg'),
}

const AnimatedTragaPerras = ({ indexDado = 'jackpot', onFinish }) => {
    const dado = useRef(null);
    const play = () => {
        dado.current.play({
            type: "walk",
            fps: 15,
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

    const source = imagesDatos[indexDado]

    return (
        source ?
            <View style={{
                backgroundColor: 'white',
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                height: 65,
                width: 45,
                borderWidth: 2,
                marginHorizontal: 4,
                borderColor: 'transparent',
            }}>
                <SpriteSheet
                    ref={dado}
                    source={source}
                    columns={1}
                    rows={9}
                    height={65}
                    width={44}
                    imageStyle={{
                        height: 65,
                        width: 45,
                    }}
                    animations={{
                        walk: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                    }}
                />
            </View>
            : <></>
    )
}

export default AnimatedTragaPerras
