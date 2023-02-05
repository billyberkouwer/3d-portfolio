import gsap from 'gsap';
import Image from 'next/image'
import React, { useState, useRef } from 'react'
import { useEffect } from 'react';
import styles from './AssetComponent.module.scss';
import ReactLoading from 'react-loading'
import Video from '../Video/Video';
import { visualAsset } from '@/types/customTypes';

type Props = {
    visualAsset: visualAsset | null,
}

export default function AssetComponent({visualAsset}: Props) {
    const ref = useRef<HTMLDivElement | null>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
    }, [visualAsset])

    useEffect(() => {
        if (!isLoading && ref.current) {
            gsap.fromTo(ref.current, {
                opacity: 0,
                top: (Math.random() - 0.5) * 200,
            }, {
                opacity: 1,
                top: 0,
                duration: 0.2,
            })
        }
    }, [isLoading])

    if (visualAsset === null) {
        return (
            <></>
        )
    }

    return (
        <div className={styles.imageContainer} ref={el => ref.current = el}>
            {visualAsset.asset.type === 'image' &&
                <Image src={visualAsset.fullPath} style={{objectFit: 'contain'}} alt={'3D scene' + visualAsset} fill onLoadingComplete={() => setIsLoading(false)} />
            }
            {visualAsset.asset.type === 'video' &&
                <Video visualAsset={visualAsset} setIsLoading={setIsLoading} />
            }
            {isLoading && 
                <div style={{ position: 'absolute', backgroundColor: '#1c1c1c', height: 'inherit', width: 'inherit', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <ReactLoading type={'spinningBubbles'} color={'#c2c2c2'} height={50} width={50}/>
                </div>
            }
        </div>
    )
}