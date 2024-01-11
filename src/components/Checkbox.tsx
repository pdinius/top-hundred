import { FC } from "react";
import { v4 } from "uuid";
import styles from "@/styles/Checkbox.module.scss";

interface CheckboxProps {
  label: string;
  val: boolean;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Checkbox: FC<CheckboxProps> = ({ label, val, setter }) => {
  const id = v4();

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        id={id}
        className={styles.check}
        checked={val}
        onChange={(e) => setter(e.target.checked)}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};
