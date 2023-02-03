import gsap from 'gsap';
import Image from 'next/image'
import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import styles from './ImageComponent.module.scss';
import ReactLoading from 'react-loading'
import isImageFile from '@/services/isImageFile';
import Video from '../Video/Video';

type Props = {
    image: string | null;
}

export default function ImageComponent({image}: Props) {
    const ref = useRef<HTMLDivElement | null>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (ref.current) {
            gsap.fromTo(ref.current, {
                opacity: 0,
                top: (Math.random() - 0.5) * 200,
            }, {
                opacity: 1,
                top: 0,
                duration: 0.2,
            })
        }
        setIsLoading(true);
    }, [image])

    if (image === null) {
        return (
            <></>
        )
    }

    return (
        <div className={styles.imageContainer} ref={el => ref.current = el}>
            {isLoading && 
                <div style={{ position: 'absolute' }}>
                    <ReactLoading type={'spinningBubbles'} color={'#c2c2c2'} height={50} width={50}/>
                </div>
            }
            {isImageFile(image) &&
                <Image src={image} style={{objectFit: 'contain'}} alt={'3D scene' + image} fill onLoad={() => setIsLoading(false)}/>
            }
            {!isImageFile(image) &&
                <Video image={image} setIsLoading={setIsLoading} />
            }
        </div>
    )
}