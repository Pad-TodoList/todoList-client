import { Props } from "./types.ts";
import styles from "./styles.module.scss";
import classNames from "classnames";

function Route(props: Props) {
  return (
    <div className={classNames(styles.route, styles[props.route.status.state])}>
      <p>{props.route.description}</p>
      <div className={styles.status}>
        <p>{props.route.status.path}</p>
        <p>{props.route.status.state}</p>
      </div>
    </div>
  );
}

export { Route };
