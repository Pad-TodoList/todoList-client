import { useTranslation } from "react-i18next";

import { Props } from "./type.ts";
import styles from "./styles.module.scss";
import { useDeleteUser } from "@todo-list/view-models";
import React from "react";
import { getAccessToken } from "@todo-list/utils/getAccessToken.ts";

function DeleteUser(props: Props) {
  const { t } = useTranslation();
  const { deleteUser, isRequestPending, isRequestSuccess } = useDeleteUser();
  const accessToken = getAccessToken();

  React.useEffect(() => {
    if (isRequestSuccess) {
      removeAccessToken();
      window.location.reload();
    }
  }, [isRequestSuccess]);
  return (
    <div className={styles.deleteUser}>
      {isRequestPending ? (
        <div>loading...</div>
      ) : (
        <div>
          <h1>{t("deleteUser.title")}</h1>
          <p>{t("deleteUser.warning")}</p>
          <button onClick={props.close}>{t("deleteUser.cancel")}</button>
          <button onClick={() => deleteUser(accessToken)}>
            {t("deleteUser.confirm")}
          </button>
        </div>
      )}
    </div>
  );
}

export { DeleteUser };
