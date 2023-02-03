import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { content } from '@/resources/content'
import styles from './HomeMenu.module.scss'
import gsap from 'gsap';

type Props = {
  setImage: Dispatch<SetStateAction<string | null>>,
  content: any,
}

export default function HomeMenu({setImage, content}: Props) {
  const [isActive, setIsActive] = useState<number | undefined>(undefined);
  const ref = useRef<Array<HTMLDivElement>>([])

  useEffect(() => {
    if (isActive && content) {
      ref.current.forEach((el, i) => {
        if (i + 1 === isActive) {
          gsap.fromTo(el, {left: 0, opacity: 0.5}, {left: 50, duration: 0.4, opacity: 1});
        } else {
          gsap.to(el, {left: 0, duration: 0.4, opacity: 0.5});
        }
      })
    }
    console.log(content)
  }, [isActive, content])

  return (
    <div className={styles.menuContainer}>
      {(content as object[]).map((item, i) => (
        <div ref={el => el !== null && ref.current.splice (i, 1, el)} key={'menu-item' + i} className={styles.menuItem} onMouseOver={() => {setImage(item['visual-content'].path); setIsActive(i + 1);}} onTouchStart={() => {setImage(item['visual-content'].path); setIsActive(i + 1);}}>
          <h1>
            {item['visual-content'].title}
          </h1>
        </div>
      ))}
    </div>
  )
}