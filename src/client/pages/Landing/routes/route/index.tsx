import classNames from "classnames";

import { Props } from "./types.ts";
import styles from "./styles.module.scss";

function Route(props: Props) {
  const method = props.route.status.path.split(" ")[0];
  const route = props.route.status.path.split(" ")[1];
  return (
    <div className={classNames(styles.route, styles[method])}>
      <div className={styles.description}>
        <p className={styles.method}>{method}</p>
        <p className={styles.path}>{route}</p>
        <p>{props.route.description}</p>
      </div>
      <p>{props.route.status.state}</p>
    </div>
  );
}

export { Route };
