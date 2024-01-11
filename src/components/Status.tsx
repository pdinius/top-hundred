import { GameData } from "@/types/game-types";
import { FC } from "react";
import styles from "@/styles/Status.module.scss";

interface StatusProps {
  index: number;
  sorted: Array<Array<GameData>>;
  completed: Array<Array<GameData> | GameData>;
  rLen: number;
}

export const Status: FC<StatusProps> = ({ index, sorted, completed, rLen }) => {
  const worse = completed.slice(0, index);
  const better = completed.slice(index + 1);

  return (
    <div className={styles.container}>
      {Array.from({ length: worse.length }, (_, i) => (
        <Bars key={i} item={worse[i]} />
      ))}
      <Bars item={sorted[0]} current />
      <div className={`${styles.pivot} ${styles.orange}`}>{rLen}</div>
      <Bars item={sorted[1]} current />
      {Array.from({ length: better.length }, (_, i) => (
        <Bars key={i} item={better[i]} />
      ))}
    </div>
  );
};

interface BarsProps {
  item: GameData | Array<GameData>;
  current?: boolean;
}

const Bars: FC<BarsProps> = ({ item, current }) => {
  if (Array.isArray(item)) {
    return (
      <div className={styles.barsContainer}>
        {Array.from({ length: item.length }, (_, i) => {
          return (
            <div
              key={i}
              className={`${styles.bar} ${current ? styles.orange : ""}`}
              title={item[i].name}
            />
          );
        })}
      </div>
    );
  } else {
    return <div className={`${styles.bar} ${styles.complete}`} title={item.name} />;
  }
};
