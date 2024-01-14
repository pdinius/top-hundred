import { GameData } from "@/types/game-types";
import { FC } from "react";
import styles from "@/styles/Status.module.scss";

interface StatusProps {
  data: Array<Array<GameData> | GameData>;
  index: number;
}

export const Status: FC<StatusProps> = ({ data, index }) => {
  return (
    <div className={styles.container}>
      {Array.from({ length: data.length }, (_, i) => (
        <Bars key={i} item={data[i]} current={i === index} />
      ))}
    </div>
  );
};

interface BarsProps {
  item?: GameData | Array<GameData>;
  current?: boolean;
}

const Bars: FC<BarsProps> = ({ item, current }) => {
  if (Array.isArray(item)) {
    if (item.length === 0 || item.every((v) => v === undefined)) return null;
    return (
      <div className={`${styles.pivot} ${current ? styles.orange : ""}`}>
        {item.length}
      </div>
      // <div className={styles.barsContainer}>
      //   {Array.from({ length: item.length }, (_, i) => {
      //     return (
      //       <div
      //         key={i}
      //         className={`${styles.bar} ${current ? styles.orange : ""}`}
      //         title={item[i].name}
      //       />
      //     );
      //   })}
      // </div>
    );
  } else {
    if (item === undefined) return null;
    return (
      <div className={`${styles.bar} ${styles.complete}`} title={item.name} />
    );
  }
};
