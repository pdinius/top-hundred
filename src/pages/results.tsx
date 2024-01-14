import { SAVED_KEY } from "@/constants";
import { GameData } from "@/types/game-types";
import styles from "@/styles/Results.module.scss";
import { GameResult } from "@/components/GameResult";
import resJSON from "@/assets/res.json";

export default function Results() {
  let results: Array<GameData> = resJSON;

  if (typeof window !== "undefined") {
    const res = localStorage.getItem(SAVED_KEY);
    if (res) results =JSON.parse(res);
  }

  return (
    <div className={styles.container}>
      {results.reverse().map((g, i) => (
        <GameResult key={i} game={g} index={i} />
      ))}
    </div>
  );
}
