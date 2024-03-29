import React from "react";
import { useTranslation } from "react-i18next";

import { getAccessToken } from "@todo-list/utils/getAccessToken.ts";
import { useDeleteUser } from "@todo-list/view-models";
import { CloseIcon } from "@common/assets/closeIcon";
import { Loader } from "@common/loader";
import { CallToActionButton } from "@common/CallToActionButton";
import { CtaType } from "@common/CallToActionButton/types.ts";
import { Props } from "./type.ts";
import styles from "./styles.module.scss";

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
      <div className={styles.header}>
        <h2>{t("deleteUser.title")}</h2>
        <div className={styles.closeIconBox} onClick={props.close}>
          <CloseIcon className={styles.closeIcon} />
        </div>
      </div>
      {isRequestPending ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <div className={styles.body}>
          <p className={styles.warning}>{t("deleteUser.warning")}</p>
          <div className={styles.buttons}>
            <CallToActionButton
              type={CtaType.cancel}
              placeholder={t("deleteUser.cancel")}
              onAction={props.close}
            />
            <CallToActionButton
              type={CtaType.delete}
              placeholder={t("deleteUser.confirm")}
              onAction={() => deleteUser(accessToken)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export { DeleteUser };
