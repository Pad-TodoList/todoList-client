import { Props } from "./types.ts";
import styles from "./styles.module.scss";
import { useState } from "react";
import { useUpdateUser } from "@todo-list/view-models";
import { useTranslation } from "react-i18next";

function ProfileForm(props: Props) {
  const { t } = useTranslation();
  const [updatedUser, setUpdatedUser] = useState(props.user);
  const { updateUser, isRequestFailure, isRequestPending } = useUpdateUser();
  return (
    <div className={styles.profileForm}>
      <div>
        {t("profilePage.profileForm.input_one")}
        <input
          defaultValue={updatedUser.nickName}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, nickName: e.target.value })
          }
        />
      </div>
      <div>
        {t("profilePage.profileForm.input_two")}
        <input
          defaultValue={updatedUser.firstName}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, firstName: e.target.value })
          }
        />
      </div>
      <div>
        {t("profilePage.profileForm.input_three")}
        <input
          defaultValue={updatedUser.lastName}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, lastName: e.target.value })
          }
        />
      </div>
      <div>
        {t("profilePage.profileForm.input_four")}
        <input
          type={"email"}
          defaultValue={updatedUser.email}
          onChange={(e) =>
            setUpdatedUser({ ...updatedUser, email: e.target.value })
          }
        />
      </div>
      <button
        onClick={() =>
          !isRequestPending &&
          updateUser(updatedUser, {
            accessToken: localStorage.getItem("pad-todolist-accessToken") ?? "",
            id: localStorage.getItem("pad-todolist-userId") ?? "",
          })
        }
      >
        {t("profilePage.profileForm.update")}
      </button>
      {isRequestFailure && <div>{isRequestFailure.message}</div>}
    </div>
  );
}

export { ProfileForm };
