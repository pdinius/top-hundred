import { GameData } from "@/types/game-types";
import { FC, useState } from "react";
import styles from "@/styles/GamePreview.module.scss";

interface GamePreviewProps {
  updateInput: React.ChangeEventHandler;
  updateGameData: React.KeyboardEventHandler;
}

export const GamePreview: FC<GameData & GamePreviewProps> = ({
  name,
  id,
  image,
  updateInput,
  updateGameData,
}) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.imageContainer} ${!image ? styles.empty : ""}`}>
        {image ? (
          <img src={image} title={name}/>
        ) : (
          <>
            {name}
            <span className={styles.grey}>game not found</span>
          </>
        )}
      </div>
      <input className={styles.gameId} value={id} onChange={updateInput} onKeyUp={updateGameData} />
    </div>
  );
};
