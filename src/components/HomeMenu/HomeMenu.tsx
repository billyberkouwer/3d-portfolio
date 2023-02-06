import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import styles from './HomeMenu.module.scss'
import gsap from 'gsap';
import { visualAsset } from '@/types/customTypes';

type Props = {
  setVisualAsset: Dispatch<SetStateAction<visualAsset | null>>,
  content: any,
}

export default function HomeMenu({
  setVisualAsset, 
  content,
}: Props) {
  const [isActive, setIsActive] = useState<number | undefined>(undefined);
  const assetRef = useRef<Array<HTMLDivElement>>([]);
  const menuItemPos = useRef<Array<DOMRect>>([]);
  const [touchTarget, setTouchTarget] = useState<any>({x: null, y: null});

  useEffect(() => {
    if (!menuItemPos.current.length) {
      assetRef.current.map((el, i) => {
        menuItemPos.current.push(el.getBoundingClientRect());
      })
    }
  }, [])

  useEffect(() => {
    if (isActive) {
      assetRef.current.forEach((el, i) => {
        if (i + 1 === isActive) {
          gsap.fromTo(el, {left: 0, opacity: 0.5}, {left: 50, duration: 0.4, opacity: 1});
        } else {
          gsap.to(el, {left: 0, duration: 0.4, opacity: 0.5});
        }
      })
    };
  }, [isActive]);

  useEffect(() => {
    menuItemPos.current.forEach((el, i) => {
      if (touchTarget.x >= el.left && touchTarget.x <= el.right) {
        if (touchTarget.y >= el.top && touchTarget.x <= el.bottom) {
          setIsActive(i + 1);
          setVisualAsset(content[i]); 
        }
      }
    })
  }, [touchTarget])

  useEffect(() => {
    console.log(menuItemPos.current)
  }, [])

  return (
    <div className={styles.menuContainer} onTouchMove={e => {setTouchTarget({x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY})}}>
      {content.map((asset: any, i: any) => (
        <div 
          ref={el => el !== null && assetRef.current.splice (i, 1, el)} 
          key={'Menu item ' + i} 
          className={styles.menuItem} 
          onMouseEnter={() => {
            setVisualAsset(asset); 
            setIsActive(i + 1);
          }}
        >
          <h1>
            {asset.title}
          </h1>
        </div>
      ))}
    </div>
  )
}