import { Link } from "react-router-dom";

import { useCheckApi } from "@todo-list/view-models";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";

function Landing(_: Props) {
  const { checkApi, isRequestFailure, isRequestPending, isRequestSuccess } =
    useCheckApi();
  return (
    <div className={styles.landing}>
      Landing page, describe the app <Link to={`login`}>login</Link>
      <p>{import.meta.env.VITE_API_URL}</p>
      <button onClick={checkApi}>check api</button>
      {isRequestPending && <p>loading...</p>}
      {isRequestFailure && <p>api failed</p>}
      {isRequestSuccess && <p>api success</p>}
    </div>
  );
}

export { Landing };
