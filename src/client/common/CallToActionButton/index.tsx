import { CtaType, Props } from "./types.ts";
import styles from "./styles.module.scss";
import classNames from "classnames";

function CallToActionButton({
  type = CtaType.submit,
  placeholder,
  onAction,
}: Props) {
  return (
    <button
      className={classNames(styles.callToActionButton, {
        [styles.callToActionButtonSubmit]: type === CtaType.submit,
        [styles.callToActionButtonCancel]: type === CtaType.cancel,
        [styles.callToActionButtonDelete]: type === CtaType.delete,
      })}
      onClick={onAction}
      type={type === CtaType.submit ? "submit" : "button"}
    >
      {placeholder}
    </button>
  );
}

export { CallToActionButton };
