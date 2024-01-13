import { cleanString } from "@/pages";
import styles from "@/styles/Rate.module.scss";
import { GameData } from "@/types/game-types";
import { FC } from "react";

interface GameCardProps {
  game: GameData;
}

export const GameCard: FC<GameCardProps> = ({ game }) => {
  return (
    <div className={styles.item}>
      <div className={styles.imageContainer}>
        <img src={game.image} />
      </div>
      <div className={styles.dataContainer}>
        <span className="bold-text">{cleanString(game.name)}</span>
        <div className={styles.linkContainer}>
          <a
            href={`https://boardgamegeek.com/boardgame/${game.id}`}
            style={{ lineHeight: 0 }}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 26 38"
              className={styles.bggLink}
              fill="#ff5100"
            >
              <path d="M1.388,8.684L24.644,0.272,21.3,7.818l3.464-.433L23.345,19.817l2.041,1.608L20.624,32.373,6.522,38-0.035,21.178,2.687,19.26,1.2,11.344Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
