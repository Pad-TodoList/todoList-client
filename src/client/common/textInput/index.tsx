import { Props } from "./types.ts";
import styles from "./styles.module.scss";
import classNames from "classnames";

function TextInput({
  value,
  setValue,
  className,
  placeholder,
  blur,
  type,
  focus,
}: Props) {
  return (
    <input
      className={classNames(styles.textInput, className)}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
      onBlur={blur}
      onFocus={focus}
    />
  );
}

export { TextInput };
