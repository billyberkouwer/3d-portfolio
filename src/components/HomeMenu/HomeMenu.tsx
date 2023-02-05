import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import styles from './HomeMenu.module.scss'
import gsap from 'gsap';

type Props = {
  setImage: Dispatch<SetStateAction<string | null>>,
  setIsVideo: Dispatch<SetStateAction<boolean | null>>,
  setMime: Dispatch<SetStateAction<string | undefined>>,
  imageCollection: any[],
  images: string[],
  videoCollection: any[],
  videos: string[],
}

export default function HomeMenu({
  setImage, 
  setIsVideo,
  setMime,
  imageCollection, 
  videoCollection, 
  images, 
  videos
}: Props) {
  
  const [isActive, setIsActive] = useState<object>({image: undefined, video: undefined});
  const imageRef = useRef<Array<HTMLDivElement>>([]);
  const videoRef = useRef<Array<HTMLDivElement>>([]);

  useEffect(() => {
    if (isActive && imageCollection && images.length) {
      imageRef.current.forEach((el, i) => {
        if ('image ' + (i + 1) === isActive.image) {
          gsap.fromTo(el, {left: 0, opacity: 0.5}, {left: 50, duration: 0.4, opacity: 1});
        } else {
          gsap.to(el, {left: 0, duration: 0.4, opacity: 0.5});
        }
      })
    };
  }, [isActive, imageCollection, images]);

  useEffect(() => {
    if (isActive && videoCollection && videos.length) {
      videoRef.current.forEach((el, i) => {
        if ('video ' + (i + 1) === isActive.video) {
          gsap.fromTo(el, {left: 0, opacity: 0.5}, {left: 50, duration: 0.4, opacity: 1});
        } else {
          gsap.to(el, {left: 0, duration: 0.4, opacity: 0.5});
        }
      })
    };
  }, [isActive, videoCollection, videos]);

  return (
    <div className={styles.menuContainer}>
      {imageCollection.map((item, i) => (
        <div 
          ref={el => el !== null && imageRef.current.splice (i, 1, el)} 
          key={'menu item image ' + i} 
          className={styles.menuItem} 
          onMouseEnter={() => {
            setImage(images[i]); 
            setIsVideo(false);
            setIsActive(prev => 
                  ({
                    image: 'image ' + (i + 1),
                    video: undefined,
                  })
              )
          }}
        >
          <h1>
            {item['visual-content'].title}
          </h1>
        </div>
      ))}
      {videoCollection.map((item, i) => (
        <div 
          ref={el => el !== null && videoRef.current.splice (i, 1, el)} 
          key={'menu item video ' + i} 
          className={styles.menuItem} 
          onMouseEnter={() => {
            setImage(videos[i]);
            setIsVideo(true);
            setMime(item['Video'].mime)
            setIsActive(prev => 
                ({
                  image: undefined,
                  video: 'video ' + (1 + i),
                })
              );
            }
          }
        >
          <h1>
            {item['Video'].title}
          </h1>
        </div>
      ))}
    </div>
  )
}