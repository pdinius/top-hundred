import { SAVED_KEY } from "@/constants";
import { GameData } from "@/types/game-types";
import { useEffect, useState } from "react";
import styles from "@/styles/Results.module.scss";
import { GameResult } from "@/components/GameResult";

export default function Results() {
  const [results, setResults] = useState<Array<GameData>>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const res = localStorage.getItem(SAVED_KEY);
      if (res) setResults(JSON.parse(res).reverse());
    }
  }, []);

  return (
    <div className={styles.container}>
      {results.map((g, i) => (
        <GameResult key={i} game={g} index={i} />
      ))}
    </div>
  );
}
