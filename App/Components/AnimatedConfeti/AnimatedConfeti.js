import React, {useRef, useEffect} from 'react'
import { Text, View } from 'react-native'
import SpriteSheet from './../SpriteSheet/SpriteSheet';

export const AnimatedConfeti = ({onFinish}) => {

    const confeti = useRef(null);
    
    const play = () => {
        confeti.current.play({
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
        if (confeti.current) {
            play()
        }
    }, [confeti])

    return (
        <SpriteSheet
            ref={confeti}
            source={require('./../../Assets/Images/animations/confeti.png')}
            columns={30}
            rows={1}
            height={400}
            width={400}
            imageStyle={{}}
            animations={{
                walk: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
            }}
        />

    )
}
