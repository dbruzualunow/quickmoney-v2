import React, {useRef, useEffect} from 'react'
import { Text, View } from 'react-native'
import SpriteSheet from '../SpriteSheet/SpriteSheet';

export const AnimatedFirework = ({onFinish}) => {

    const confeti = useRef(null);
    
    const play = () => {
        confeti.current.play({
            type: "walk",
            fps: 10,
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
        if (confeti.current) {
            play()
        }
    }, [confeti])

    return (
        <SpriteSheet
            ref={confeti}
            source={require('./../../Assets/Images/animations/firework.png')}
            columns={14}
            rows={1}
            height={150}
            imageStyle={{}}
            animations={{
                walk: [0,1,2,3,4,5,6,7,8,9,10,11,12,13],
            }}
        />
    )
}
