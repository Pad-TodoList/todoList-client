import { useState } from "react";
import { useTranslation } from "react-i18next";

import { TextInput } from "@common/textInput";
import { Props } from "./types.ts";
import styles from "./styles.module.scss";
import { useUpdateUser } from "../../../../todoList-client-core/src/viewModels/updateUser.ts";
import { getAccessToken } from "../../../../todoList-client-core/src/utils/getAccessToken.ts";

function ProfileForm(props: Props) {
  const { t } = useTranslation();
  const [updatedUser, setUpdatedUser] = useState(props.user);
  const { updateUser, isRequestFailure, isRequestPending } = useUpdateUser();
  const tokens = getAccessToken();
  return (
    <div className={styles.profileForm}>
      <div className={styles.item}>
        <p>{t("profilePage.profileForm.input_one")}</p>
        <TextInput
          value={updatedUser.nickName}
          setValue={(value) =>
            setUpdatedUser({ ...updatedUser, nickName: value })
          }
        />
      </div>
      <div className={styles.item}>
        <p>{t("profilePage.profileForm.input_two")}</p>
        <TextInput
          value={updatedUser.firstName}
          setValue={(value) =>
            setUpdatedUser({ ...updatedUser, firstName: value })
          }
        />
      </div>
      <div className={styles.item}>
        <p>{t("profilePage.profileForm.input_three")}</p>
        <TextInput
          value={updatedUser.lastName}
          setValue={(value) =>
            setUpdatedUser({ ...updatedUser, lastName: value })
          }
        />
      </div>
      <div className={styles.item}>
        <p>{t("profilePage.profileForm.input_four")}</p>
        <TextInput
          value={updatedUser.email}
          setValue={(value) => setUpdatedUser({ ...updatedUser, email: value })}
        />
      </div>
      <button
        className={styles.button}
        onClick={() => !isRequestPending && updateUser(updatedUser, tokens)}
      >
        {t("profilePage.profileForm.update")}
      </button>
      {isRequestFailure && <p>{isRequestFailure.message}</p>}
    </div>
  );
}

export { ProfileForm };
