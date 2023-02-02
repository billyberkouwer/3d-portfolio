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

  async function fetchCockpit() {
    const data = await fetch('http://localhost:8080/api/collections/get/New?token=e1db7ce1a87b0ec6291162e4fca107', {
      method: 'GET'
    })
    .then(response => response.json())
    return data;
  }

  async function fetchFromAPI() {
    fetch('http://localhost:3000/api/cockpit/')
    .then(response => response.json())
    .then(result => console.log(result));
  }

  useEffect(() => {
    fetchFromAPI();
  }, [image]);
  
  return (
    <div ref={el => pageRef.current = el}>
      <HomeMenu setImage={setImage} />
      <div className={styles.contentContainer}>
        <ImageComponent image={image} />
      </div>
    </div>
  );
}
