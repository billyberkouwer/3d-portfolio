import { visualAsset } from '@/types/customTypes'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    visualAsset: visualAsset,
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export default function Video({visualAsset, setIsLoading}: Props) {

    return (
        <video 
        key={Math.random()} 
        preload="metadata"
        muted 
        autoPlay 
        playsInline 
        loop 
        style={{pointerEvents: 'none', width: 'inherit', height: 'inherit'}} 
        onCanPlay={() => setIsLoading(false)}
        >
            <source src={visualAsset.fullPath + '#t=0.5'} type={visualAsset.asset.mime} />
        </video>
    )
}