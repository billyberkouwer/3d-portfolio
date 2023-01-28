import React, { Dispatch, SetStateAction } from 'react'
import { content } from '@/resources/content'
import styles from './HomeMenu.module.scss'

type Props = {
  setImage: Dispatch<SetStateAction<string | null>>,
}

export default function HomeMenu({setImage}: Props) {
  return (
    <div className={styles.menuContainer}>
      {content.map((item, i) =>
          <div className={styles.menuItem} onMouseOver={() => setImage(item.src)} onTouchStart={() => setImage(item.src)}>
            <h1>
              {item.title}
            </h1>
          </div>
        )
      }
    </div>
  )
}