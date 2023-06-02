import { HTMLInputTypeAttribute } from "react";

interface Props {
  className?: string;
  value: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  setValue(value: string): void;
  blur?(): void;
  focus?(): void;
}

export { Props };
