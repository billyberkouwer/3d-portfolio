import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    image: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export default function Video({image, setIsLoading}: Props) {
  return (
        <video key={Math.random()} muted autoPlay playsInline loop style={{pointerEvents: 'none', width: 'inherit', height: 'inherit'}} onCanPlay={() => setIsLoading(false)}>
            <source src={image} type={`video/${image.split('.')[1]}`} />
        </video>
    )
}