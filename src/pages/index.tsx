import HomeMenu from "../components/HomeMenu/HomeMenu";
import { useEffect, useRef, useState } from "react";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import styles from '../styles/index.module.scss'

interface Props {
  width: number,
  height: number,
}

export default function Home({width, height}: Props) {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    console.log(image)
  }, [image])
  
  return (
    <div ref={el => pageRef.current = el}>
      <HomeMenu setImage={setImage} />
      <div className={styles.contentContainer}>
        <ImageComponent image={image} />
      </div>
    </div>
  );
}
