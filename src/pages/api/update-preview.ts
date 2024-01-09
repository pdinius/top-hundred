import { GameData } from "@/types/game-types";
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

  const thingData = await fetch(
    `https://boardgamegeek.com/xmlapi2/thing?id=${queryId}`
  );
  const thingText = await thingData.text();
  console.log(thingText);
  const image = thingText.match(/(?<=<thumbnail>)[^<]+/) || [];
  const name = thingText.match(/(?<=primary".+?value=").+?(?=" \/)/) || [];

  res.status(200).json({
    message: "A",
    data: {
      name: name[0] || "",
      id: queryId,
      image: image[0],
    },
  });
}
