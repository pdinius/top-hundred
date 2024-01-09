import { GameData } from "@/types/game-types";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  data?: Array<GameData>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const queryGames = req.query.games;
  if (typeof queryGames !== "string") {
    res.status(400).json({ message: "F" });
    return;
  }
  const games = queryGames.split(",");
  const gamedata: Array<GameData> = [];

  for (const g of games) {
    const data = await fetch(
      `https://boardgamegeek.com/xmlapi2/search?query=${encodeURI(g)}&exact=1`
    );
    const text = await data.text();
    const ids = text.match(/(?<=id=")\d+/g);
    await new Promise((res) => setTimeout(res, 500));
    if (!ids) {
      gamedata.push({ name: g });
    } else {
      ids.sort((a, b) => +b - +a);
      const thingData = await fetch(
        `https://boardgamegeek.com/xmlapi2/thing?id=${ids[0]}`
      );
      const thingText = await thingData.text();
      const image = thingText.match(/(?<=<thumbnail>)[^<]+/) || [];
      gamedata.push({
        name: g,
        id: ids[0],
        image: image[0],
      });
    }
    await new Promise((res) => setTimeout(res, 500));
  }

  res.status(200).json({ message: "A", data: gamedata });
}
