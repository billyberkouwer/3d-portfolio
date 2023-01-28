import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { content } from '@/resources/content'
import styles from './HomeMenu.module.scss'
import gsap from 'gsap';

type Props = {
  setImage: Dispatch<SetStateAction<string | null>>,
}

export default function HomeMenu({setImage}: Props) {
  const [isActive, setIsActive] = useState<number | undefined>(undefined);
  const ref = useRef<Array<HTMLDivElement>>([])

  useEffect(() => {
    if (isActive) {
      ref.current.forEach((el, i) => {
        if (i + 1 === isActive) {
          gsap.fromTo(el, {left: 0, opacity: 0.5}, {left: 50, duration: 0.4, opacity: 1});
        } else {
          gsap.to(el, {left: 0, duration: 0.4, opacity: 0.5});
        }
      })
    }
  }, [isActive])

  return (
    <div className={styles.menuContainer}>
      {content.map((item, i) =>
          <div ref={el => el !== null && ref.current.splice (i, 1, el)} key={'menu-item' + i} className={styles.menuItem} onMouseOver={() => {setImage(item.src); setIsActive(i + 1);}} onTouchStart={() => {setImage(item.src); setIsActive(i + 1);}}>
            <h1>
              {item.title}
            </h1>
          </div>
        )
      }
    </div>
  )
}