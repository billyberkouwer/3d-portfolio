import HomeMenu from "../components/HomeMenu/HomeMenu";
import { useEffect, useRef, useState } from "react";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import styles from "../styles/index.module.scss";

export default function Home({ content, assets }: any) {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [image, setImage] = useState<string | null>(null);

  return (
    <div ref={(el) => (pageRef.current = el)}>
      <HomeMenu setImage={setImage} content={content} assets={assets} />
      <div className={styles.contentContainer}>
        <ImageComponent image={image} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const collectionUrl =
    "https://17e622c9569e3fa85e0e3247f346ce6d-17523.sites.k-hosting.co.uk/cockpit-core/api/content/items/Images";

  const collectionResponse = await fetch(collectionUrl, {
    method: "GET",
    headers: {
      "api-key": `${process.env.API_KEY}`,
    },
  });

  const collectionJson = await collectionResponse.json();

  const assetRequestUrls = collectionJson.map(
    (asset: any) =>
      `https://17e622c9569e3fa85e0e3247f346ce6d-17523.sites.k-hosting.co.uk/cockpit-core/api/assets/image/${asset["visual-content"]["_id"]}?m=thumbnail&h=500&q=500&o=0`
  );

  const assetResults = assetRequestUrls.map((url: string) => {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "GET",
        headers: {
          "api-key": `${process.env.API_KEY}`,
        },
      }).then((response) => {
        resolve(response.text());
      }).catch((err) => 
        reject(err));
    });
  });

  const assetUrls = await Promise.all(assetResults);

  return {
    props: {
      content: collectionJson,
      assets: assetUrls,
    },
  };
};