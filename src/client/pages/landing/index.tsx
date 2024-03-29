import { useEffect } from "react";

import { useCheckApi } from "@todo-list/view-models";
import { Loader } from "@common/loader";
import { ErrorServer } from "./errorServer";
import { Title } from "./title";
import { SelectLanguage } from "./selectLanguage";
import { Routes } from "./routes";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";

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
        {isRequestPending && <Loader />}
        {isRequestFailure.status && <ErrorServer />}
        {isRequestSuccess && <Routes routes={routes} />}
      </div>
      <SelectLanguage />
    </div>
  );
}

export { Landing };
