import { GameData } from "@/types/game-types";
import { FC, useState } from "react";
import styles from "@/styles/GamePreview.module.scss";
import { cleanString } from "@/pages";

interface GamePreviewProps {
  selected: boolean;
  updateInput: React.ChangeEventHandler;
  updateGameData: React.KeyboardEventHandler;
  removeGameData: React.MouseEventHandler;
  toggleSelected: React.MouseEventHandler;
}

export const GamePreview: FC<GameData & GamePreviewProps> = ({
  name,
  id,
  image,
  selected,
  updateInput,
  updateGameData,
  removeGameData,
  toggleSelected,
}) => (
  <div className={styles.container}>
    <div
      style={{ opacity: selected ? 1 : 0.3 }}
      className={`${styles.imageContainer} ${!image ? styles.empty : ""}`}
      onClick={toggleSelected}
    >
      {image ? (
        <img src={image} title={cleanString(name)} />
      ) : (
        <>
          {name}
          <span className={styles.grey}>game not found</span>
        </>
      )}
    </div>
    <div className={styles.actionsContainer}>
      <button className={styles.removeButton} onClick={removeGameData}>
        <div className={styles.stripA} />
        <div className={styles.stripB} />
      </button>
      <input
        className={styles.gameId}
        value={id}
        onChange={updateInput}
        onKeyUp={updateGameData} />
      <a
        href={`https://boardgamegeek.com/boardgame/${id}`}
        style={{ lineHeight: 0 }}
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 26 38"
          className={styles.bggLink}
          fill="#ff5100"
          stroke="#3f3a60"
          strokeWidth={2}
        >
          <path d="M1.388,8.684L24.644,0.272,21.3,7.818l3.464-.433L23.345,19.817l2.041,1.608L20.624,32.373,6.522,38-0.035,21.178,2.687,19.26,1.2,11.344Z" />
        </svg>
      </a>
    </div>
  </div>
);
