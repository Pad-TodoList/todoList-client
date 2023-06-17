enum CtaType {
  submit,
  cancel,
  delete,
}

interface Props {
  type?: CtaType;
  placeholder: string;
  className?: string;
  onAction(): void;
}

export { Props, CtaType };
