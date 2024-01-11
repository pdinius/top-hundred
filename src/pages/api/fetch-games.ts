import { GameData } from "@/types/game-types";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { CACHE_PATH, DATA_PATH } from "@/constants";

type Data = {
  message: string;
  data?: Array<GameData>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const fetchCache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf-8"));
  const gamedataCache = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  const queryGames = req.query.games;
  if (typeof queryGames !== "string") {
    res.status(400).json({ message: "F" });
    return;
  }
  const games = queryGames.split(",");
  const gamedata: Array<GameData> = [];

  for (const g of games) {
    const searchUrl = `https://boardgamegeek.com/xmlapi2/search?query=${encodeURI(
      g
    )}&exact=1`;

    let text: string;
    if (fetchCache[searchUrl]) {
      text = fetchCache[searchUrl];
    } else {
      await new Promise((res) => setTimeout(res, 500));
      const data = await fetch(searchUrl);
      text = await data.text();
      fetchCache[searchUrl] = text;
    }

    const nameRe = text.match(/(?<=primary".+?value=").+?(?="\/>)/) || [];
    const ids = text.match(/(?<=id=")\d+/g) || [];
    ids.sort((a, b) => +b - +a);
    const name = nameRe[0];
    const id = ids[0];

    if (!id || !name) {
      gamedata.push({ name: g });
    } else {
      const thingUrl = `https://boardgamegeek.com/xmlapi2/thing?id=${ids[0]}`;

      let thingText: string;
      if (fetchCache[thingUrl]) {
        thingText = fetchCache[thingUrl];
      } else {
        await new Promise((res) => setTimeout(res, 500));
        const thingData = await fetch(thingUrl);
        thingText = await thingData.text();
        fetchCache[thingUrl] = thingText;
      }

      const image = thingText.match(/(?<=<thumbnail>)[^<]+/) || [];
      const game = {
        name,
        id,
        image: image[0],
      };
      gamedataCache[id] = game;
      gamedata.push(game);
    }
  }

  fs.writeFileSync(CACHE_PATH, JSON.stringify(fetchCache));
  fs.writeFileSync(DATA_PATH, JSON.stringify(gamedataCache));

  res.status(200).json({ message: "A", data: gamedata });
}
