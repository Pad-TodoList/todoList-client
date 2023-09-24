import { useState } from "react";

import { Props } from "./types.ts";
import styles from "./styles.module.scss";

function ErrorBanner({ message }: Props) {
  const [displayBanner, setDisplayBanner] = useState(true);
  return displayBanner ? (
    <div className={styles.errorBanner} onClick={() => setDisplayBanner(false)}>
      <p className={styles.description}>{message}</p>
      <div className={styles.timeLine} />
    </div>
  ) : (
    <div />
  );
}

export { ErrorBanner };
