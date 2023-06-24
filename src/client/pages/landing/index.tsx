import { useEffect } from "react";

import { useCheckApi } from "@todo-list/view-models";
import { Loader } from "@common/loader";
import { ErrorServer } from "./errorServer";
import { Title } from "./title";
import { SelectLanguage } from "./selectLanguage";
import { Routes } from "./routes";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { useUserRetrieval } from "../../../newCore/src/viewModels/retrieveUser.ts";

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

  const {
    retrieveUser,
    user,
    isRequestSuccess: success,
    isRequestPending: pending,
    isRequestFailure: failure,
  } = useUserRetrieval({
    id: "18",
    accessToken:
      "979894a299b635ca212fdab7d421e8a168760e91f2ecbde3c51c18d878cc81dac9b6d1262ca68dea272a61a1dc330681325d",
  });

  const runNewCore = () => {
    retrieveUser({
      id: "18",
      accessToken:
        "979894a299b635ca212fdab7d421e8a168760e91f2ecbde3c51c18d878cc81dac9b6d1262ca68dea272a61a1dc330681325d",
    });
  };

  return (
    <div className={styles.landing}>
      <Title />
      <div>
        <button onClick={runNewCore}>test new core</button>
        {pending && <div>pending</div>}
        {success && (
          <div>
            success<p>{user.firstName}</p>
          </div>
        )}
        {failure && <div>failure</div>}
      </div>
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
