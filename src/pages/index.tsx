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
    const data = await fetch('https://17e622c9569e3fa85e0e3247f346ce6d-17523.sites.k-hosting.co.uk/cockpit-core/api/content/item/Images', {
      method: 'GET',
      headers: {
        "api-key": "API-c1377005fdccca4d56cf6d42176dbb5fba698e7f"
      }
    })
    .then(response => response.json())
    .then(result => console.log(result))
  }

  async function fetchFromAPI() {
    fetch('http://localhost:3000/api/cockpit/')
    .then(response => response.json())
    .then(result => console.log(result));
  }

  useEffect(() => {
    // fetchFromAPI();
    fetchCockpit();
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
