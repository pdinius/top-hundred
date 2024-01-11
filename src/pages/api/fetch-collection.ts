import { CACHE_PATH } from "@/constants";
import { GameData } from "@/types/game-types";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  data?: Array<GameData>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const username = req.query.name;
  const played = req.query.played;
  if (typeof username !== "string") {
    res.status(400).json({ message: "F" });
    return;
  }
  const cache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
  let url = `https://boardgamegeek.com/xmlapi2/collection?username=${username}`;
  if (played) url += "&played=1";
  let text: string;

  try {
    if (url in cache) {
      text = cache[url];
    } else {
      let collectionData = await fetch(url);
      while (collectionData.status === 202) {
        await new Promise((res) => setTimeout(res, 5000));
        collectionData = await fetch(url);
      }
      text = await collectionData.text();
      cache[url] = text;
      fs.writeFileSync(CACHE_PATH, JSON.stringify(cache));
    }
  } catch (e) {
    res.status(400).json({ message: "F" });
    return;
  }

  const ids = text.match(/(?<=objectid=")\d+/g);
  const names = text.match(/[^>]+(?=<\/name>)/g);
  const thumbnails = text.match(/[^>]+(?=<\/thumbnail>)/g);
  const images = text.match(/[^>]+(?=<\/image>)/g);

  if (!ids || !names || !thumbnails || !images) {
    res.status(500).json({ message: "C" });
    return;
  }

  const data: Array<GameData> = [];
  for (let i = 0; i < ids.length; ++i) {
    data.push({
      id: ids[i],
      name: names[i],
      image: thumbnails[i],
      fullSize: images[i]
    });
  }

  res.status(200).json({ message: "A", data });
}
