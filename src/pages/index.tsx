import HomeMenu from "../components/HomeMenu/HomeMenu";
import { useEffect, useRef, useState } from "react";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import styles from '../styles/index.module.scss';



export default function Home({content, assets}: any) {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    console.log(assets)
  }, [assets])

  return (
    <div ref={el => pageRef.current = el}>
      <HomeMenu setImage={setImage} content={content} />
      <div className={styles.contentContainer}>
        <ImageComponent image={image} />
      </div>
    </div>
  );
};


export async function getStaticProps() {
  const contentUrl = 'https://17e622c9569e3fa85e0e3247f346ce6d-17523.sites.k-hosting.co.uk/cockpit-core/api/content/items/Images';

  const contentResponse = await fetch(contentUrl, {
    method: 'GET',
    headers: {
      'api-key' :`${process.env.API_KEY}`,
    }
  });

  const contentJson = await contentResponse.json();

  const assetUrls = contentJson.map((asset: any) => (
    `https://17e622c9569e3fa85e0e3247f346ce6d-17523.sites.k-hosting.co.uk/cockpit-core/api/assets/image/${asset['visual-content']['_id']}`
  ));
  
  const assetsResponse = assetUrls.map(async (assetUrl: string) => {
    const res = await fetch(assetUrl, {
      method: 'GET',
      headers: {
        'api-key' :`${process.env.API_KEY}`,
      }
    });
    return res;
  })

  const assetsJson = assetsResponse.map(res => res.json());

  console.log(assets);

  return {
    props: {
      content: contentJson,
      assets: assetsJson,
    }
  }
}