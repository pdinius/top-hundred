import { GameData } from "@/types/game-types";
import { FC } from "react";
import styles from "@/styles/Status.module.scss";

interface StatusProps {
  index: number;
  pivot?: GameData;
  sorted: Array<Array<GameData>>;
  completed: Array<Array<GameData> | GameData>;
  remaining: Array<GameData>;
}

export const Status: FC<StatusProps> = ({ index, pivot, sorted, completed, remaining }) => {
  const better = Math.ceil(remaining.length / 2);
  const worse = Math.floor(remaining.length / 2);
  const sortedWorse = sorted[0].length;
  const sortedBetter = sorted[1].length;

  return <div className={styles.container}>
    <div className={styles.bar} title={pivot?.name} />
  </div>;
};
