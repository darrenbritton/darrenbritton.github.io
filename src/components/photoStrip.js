import React, { useEffect, useState } from "react";

// Pulls a few frames from the existing Flickr portfolio set and lays them out
// in the design's 3-up strip. SSR renders the striped placeholders; the client
// swaps in real photos once Flickr responds (and keeps the placeholders on any
// failure, so the layout is always intact).
const API_KEY = "1b4e5b0203fab0d5731afe68f0a543e1";
const USER_ID = "117024847@N06";
const PHOTOSET_ID = "72157720102448368";
const COUNT = 3;

const PhotoStrip = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    let live = true;
    const url =
      `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos` +
      `&api_key=${API_KEY}&photoset_id=${PHOTOSET_ID}&user_id=${USER_ID}` +
      `&per_page=${COUNT}&extras=url_z,url_n&format=json&nojsoncallback=1`;
    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (!live || !data || !data.photoset || !data.photoset.photo) return;
        const frames = data.photoset.photo
          .slice(0, COUNT)
          .map((p) => ({ id: p.id, src: p.url_z || p.url_n, title: p.title }))
          .filter((p) => p.src);
        setPhotos(frames);
      })
      .catch(() => {
        /* keep placeholders */
      });
    return () => {
      live = false;
    };
  }, []);

  return (
    <div className="strip">
      {Array.from({ length: COUNT }).map((_, i) => {
        const photo = photos[i];
        return photo ? (
          <img
            key={photo.id}
            className="frame-img"
            src={photo.src}
            alt={photo.title || "Photograph by Darren Britton"}
            loading="lazy"
          />
        ) : (
          <div key={`ph-${i}`} className="frame" aria-hidden="true" />
        );
      })}
    </div>
  );
};

export default PhotoStrip;
