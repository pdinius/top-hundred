import { GameData } from "@/types/game-types";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { CACHE_PATH, DATA_PATH } from "@/constants";
import { parseString } from "xml2js";

type Data = {
  message: string;
  data?: Array<GameData>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const fetchCache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
  const gamedataCache = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  const games = req.body;
  const gamedata: Array<GameData> = [];
  const ids: Array<string> = [];

  for (const g of games) {
    if (/^\d+$/.test(g)) {
      ids.push(g);
      continue;
    }
    const searchUrl = `https://boardgamegeek.com/xmlapi2/search?query=${encodeURI(
      g
    )}&exact=1`;
    console.log(searchUrl);

    let text: string;
    if (fetchCache[searchUrl] && !/Rate limit exceeded/.test(fetchCache[searchUrl])) {
      text = fetchCache[searchUrl];
    } else {
      await new Promise((res) => setTimeout(res, 500));
      const data = await fetch(searchUrl);
      text = await data.text();
      fetchCache[searchUrl] = text;
    }

    const reId = text.match(/(?<=id=")\d+/g) || [];
    reId.sort((a, b) => +b - +a);
    const id = reId[0];

    if (id) ids.push(id);
  }

  for (let i = 0; i < ids.length; i += 40) {
    const slice = ids.slice(i, i + 40);
    const thingUrl = `https://boardgamegeek.com/xmlapi2/thing?id=${slice.join(
      ","
    )}`;

    let thingText: string;
    if (fetchCache[thingUrl] && !/Rate limit exceeded/.test(fetchCache[thingUrl])) {
      thingText = fetchCache[thingUrl];
    } else {
      await new Promise((res) => setTimeout(res, 500));
      const thingData = await fetch(thingUrl);
      thingText = await thingData.text();
      fetchCache[thingUrl] = thingText;
    }

    parseString(thingText, (err, result) => {
      const items = result.items.item;
      for (const item of items) {
        const id = item.$.id;
        const image = item.thumbnail ? item.thumbnail[0] : "";
        const fullSize = item.image ? item.image[0] : "";
        const name = item.name.find((n: any) => n.$.type === "primary")?.$
          ?.value;
        const game = {
          name,
          id,
          image,
          fullSize,
        };
        gamedataCache[id] = game;
        gamedata.push(game);
      }
    });
  }

  fs.writeFileSync(CACHE_PATH, JSON.stringify(fetchCache));
  fs.writeFileSync(DATA_PATH, JSON.stringify(gamedataCache));

  res.status(200).json({ message: "A", data: gamedata });
}
