import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

function Landing(_: Props) {
  return (
    <div className={styles.landing}>
      Landing page, describe the app <Link to={`login`}>login</Link>
    </div>
  );
}

export { Landing };
