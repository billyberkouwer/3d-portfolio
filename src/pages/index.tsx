import HomeMenu from "../components/HomeMenu/HomeMenu";
import { useEffect, useRef, useState } from "react";
import AssetComponent from "@/components/ImageComponent/AssetComponent";
import styles from "../styles/index.module.scss";
import { visualAsset } from "@/types/customTypes";

export default function Home({ 
  content
}: any) {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [visualAsset, setVisualAsset] = useState<visualAsset | null>(null);

  useEffect(() => {
    console.log(content)
  }), [content]

  return (
    <div ref={(el) => (pageRef.current = el)}>
      <HomeMenu content={content} setVisualAsset={setVisualAsset} />
      <div className={styles.contentContainer}>
        <AssetComponent visualAsset={visualAsset} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const visualContentUrl = `${process.env.API_ENDPOINT}/content/items/visualContent`;

  const fetchVisualContent = await fetch(visualContentUrl, {
    method: 'GET',
    headers: {
      "api-key": `${process.env.API_KEY}`,
    }
  });

  const visualContentJson = await fetchVisualContent.json();

  // return image thumbnail promise if content is image
  const promises = visualContentJson.map(
    async (contentItem: { tite: string; asset: any; isVideo: boolean }) => {
      const id = contentItem.asset["_id"];
      const fetchUrl = `https://17e622c9569e3fa85e0e3247f346ce6d-17523.sites.k-hosting.co.uk/api/assets/image/${id}?m=thumbnail&h=1000&q=500&o=0`;

      if (contentItem.asset.type === 'video') {
        const videoUrl = `https://17e622c9569e3fa85e0e3247f346ce6d-17523.sites.k-hosting.co.uk/storage/uploads${contentItem.asset.path}`;
        return videoUrl;
      }

      return new Promise((resolve, reject) => {
        fetch(fetchUrl, {
          method: "GET",
          headers: {
            "api-key" : `${process.env.API_KEY}`,
          },
        })
          .then((response) => {
            resolve(response.text());
          })
          .catch((err) => reject(err));
      });
    }
  );

  const visualContentUrls = await Promise.all(promises);

  // add key/value for full path to json
  visualContentJson.forEach((item: visualAsset, i: number) => item.fullPath = visualContentUrls[i]);

  return {
    props: {
      content: visualContentJson
    },
  };
};