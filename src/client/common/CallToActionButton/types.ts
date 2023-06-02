enum CtaType {
  submit,
  cancel,
}

interface Props {
  type?: CtaType;
  placeholder: string;
  className?: string;
  onAction(): void;
}

export { Props, CtaType };
