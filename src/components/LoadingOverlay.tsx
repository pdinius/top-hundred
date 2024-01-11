import { FC } from "react";
import styles from "@/styles/LoadingOverlay.module.scss";

interface LoadingOverlayProps {
  display: boolean;
}

export const LoadingOverlay: FC<LoadingOverlayProps> = ({ display }) => {
  return (
    <div
      style={{ display: display ? "" : "none" }}
      className={styles.loadingOverlay}
    >
      <div className={styles.ball} />
      <div className={`${styles.ball} ${styles.ballB}`} />
      <div className={`${styles.ball} ${styles.ballC}`} />
    </div>
  );
};
