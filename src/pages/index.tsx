import HomeMenu from "../components/HomeMenu/HomeMenu";
import { useEffect, useRef, useState } from "react";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import styles from "../styles/index.module.scss";

export default function Home({ 
  imageCollection, 
  images, 
  videoCollection,
  videos
}: any) {
  const pageRef = useRef<HTMLDivElement | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [mime, setMime] = useState<string | undefined>(undefined);
  const [isVideo, setIsVideo] = useState<boolean | null>(null);

  useEffect(() => {
    console.log(image)
  }, [image])

  return (
    <div ref={(el) => (pageRef.current = el)}>
      <HomeMenu 
        setImage={setImage}
        setIsVideo={setIsVideo} 
        setMime={setMime}
        imageCollection={imageCollection} 
        images={images} 
        videoCollection={videoCollection}
        videos={videos} 
      />
      <div className={styles.contentContainer}>
        <ImageComponent image={image} isVideo={isVideo} mime={mime} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const imgCollectionUrl =
    "https://17e622c9569e3fa85e0e3247f346ce6d-17523.sites.k-hosting.co.uk/cockpit-core/api/content/items/Images";

  const imgCollectionResponse = await fetch(imgCollectionUrl, {
    method: "GET",
    headers: {
      "api-key": `${process.env.API_KEY}`,
    },
  });

  const imgCollectionJson = await imgCollectionResponse.json();

  const imageRequestUrls = imgCollectionJson.map(
    (asset: any) =>
      `https://17e622c9569e3fa85e0e3247f346ce6d-17523.sites.k-hosting.co.uk/cockpit-core/api/assets/image/${asset["visual-content"]["_id"]}?m=thumbnail&h=1000&q=500&o=0`
  );

  const imageResults = imageRequestUrls.map((url: string) => {
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

  const imageUrls = await Promise.all(imageResults);

  const vidCollectionUrl =
    "https://17e622c9569e3fa85e0e3247f346ce6d-17523.sites.k-hosting.co.uk/cockpit-core/api/content/items/Videos";

  const vidCollectionResponse = await fetch(vidCollectionUrl, {
    method: "GET",
    headers: {
      "api-key": `${process.env.API_KEY}`,
    },
  });

  const vidCollectionJson = await vidCollectionResponse.json();

  const videoUrls = vidCollectionJson.map(
    (asset: any) =>
      `https://17e622c9569e3fa85e0e3247f346ce6d-17523.sites.k-hosting.co.uk/cockpit-core/storage/uploads${asset["Video"].path}`
  );

  return {
    props: {
      imageCollection: imgCollectionJson,
      images: imageUrls,
      videoCollection: vidCollectionJson,
      videos: videoUrls,
    },
  };
};