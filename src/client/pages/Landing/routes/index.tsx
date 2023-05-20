import { Props } from "./types.ts";
import styles from "./styles.module.scss";
import { Route } from "./route";

function Routes(props: Props) {
  return (
    <div className={styles.routes}>
      {props.routes.map((route, key) => (
        <Route route={route} key={key} />
      ))}
    </div>
  );
}

export { Routes };
