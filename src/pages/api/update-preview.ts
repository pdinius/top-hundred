import { DATA_PATH } from "@/constants";
import { GameData } from "@/types/game-types";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  data?: GameData;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const queryId = req.query.id;
  if (typeof queryId !== "string") {
    res.status(400).json({ message: "F" });
    return;
  }
  const cache = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

  if (queryId in cache) {
    res.status(200).json({
      message: "A",
      data: cache[queryId],
    });
  } else {
    const thingData = await fetch(
      `https://boardgamegeek.com/xmlapi2/thing?id=${queryId}`
    );
    const thingText = await thingData.text();
    const image = thingText.match(/(?<=<thumbnail>)[^<]+/) || [];
    const name = thingText.match(/(?<=primary".+?value=").+?(?=" \/)/) || [];
    const data = {
      name: name[0] || "",
      id: queryId,
      image: image[0],
    };

    fs.writeFileSync(DATA_PATH, JSON.stringify(data));
    res.status(200).json({
      message: "A",
      data,
    });
  }
}
