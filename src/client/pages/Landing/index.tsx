import { useCheckApi } from "@todo-list/view-models";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import { Title } from "./title";
import { Routes } from "./routes";

function Landing(_: Props) {
  const {
    checkApi,
    isRequestFailure,
    isRequestPending,
    isRequestSuccess,
    routes,
  } = useCheckApi();

  useEffect(() => {
    checkApi();
  }, []);
  return (
    <div className={styles.landing}>
      <Title />
      <div className={styles.body}>
        {isRequestPending && <p>loading...</p>}
        {isRequestFailure.status && <p>{isRequestFailure.message}</p>}
        {isRequestSuccess && <Routes routes={routes} />}
      </div>
    </div>
  );
}

export { Landing };
