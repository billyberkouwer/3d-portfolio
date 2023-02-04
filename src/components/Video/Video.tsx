import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    image: string,
    mime: string | undefined,
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export default function Video({image, setIsLoading, mime}: Props) {
    console.log(image)
  return (
        <video key={Math.random()} muted autoPlay playsInline loop style={{pointerEvents: 'none', width: 'inherit', height: 'inherit'}} onCanPlay={() => setIsLoading(false)}>
            <source src={image} type={mime} />
        </video>
    )
}