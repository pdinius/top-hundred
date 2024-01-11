import { GameData } from "@/types/game-types";
import { FC } from "react";
import styles from "@/styles/Status.module.scss";

interface StatusProps {
  index: number;
  completed: Array<Array<GameData> | GameData>;
}

export const Status: FC<StatusProps> = ({ index, completed }) => {
  return (
    <div className={styles.container}>
      {/* COMPLETED WORSE */}
      {Array.from({ length: completed.length }, (_, i) => (
        <Bars key={i} item={completed[i]} isCurrent={i === index} />
      ))}
    </div>
  );
};

interface BarsProps {
  item: GameData | Array<GameData>;
  isCurrent: boolean;
}

const Bars: FC<BarsProps> = ({ item, isCurrent }) => {
  if (Array.isArray(item)) {
    return (
      <div className={styles.barsContainer}>
        {Array.from({ length: item.length }, (_, i) => {
          return (
            <div
              key={i}
              className={`${styles.bar} ${isCurrent ? styles.current : ""}`}
              title={item[i].name}
            />
          );
        })}
      </div>
    );
  } else {
    return <div className={styles.bar} title={item.name} />;
  }
};
