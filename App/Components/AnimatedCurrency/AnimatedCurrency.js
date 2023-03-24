import React, {useRef, useEffect} from 'react'
import { Text, View } from 'react-native'
import SpriteSheet from './../SpriteSheet/SpriteSheet';

export const AnimatedCurrency = ({onFinish}) => {

    const currency = useRef(null);

    const play = () => {
        currency.current.play({
            type: "walk",
            fps: 24,
            loop: true,
            resetAfterFinish: false,
            onFinish: () => {
                if (typeof onFinish === "function") {
                    onFinish()
                }
            }
        });
    };

    useEffect(() => {
        if (currency.current) {
            play()
        }
    }, [currency])

    return (
        <SpriteSheet
            ref={currency}
            source={require('./../../Assets/Images/animations/currency.png')}
            columns={22}
            rows={1}
            height={30}
            width={30}
            imageStyle={{}}
            animations={{
                walk: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
            }}
        />

    )
}
