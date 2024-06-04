import styled from "@emotion/styled";
import { HTMLAttributes } from "react";

const ButtonRoot = styled("button")(() => ({
  padding: `10px 12px`,
  fontSize: 14,
  borderRadius: 8,
  border: `1px solid transparent`,
  cursor: `pointer`,
}));

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  readonly text: string;
  readonly disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const { text, ...rest } = props;
  return <ButtonRoot {...rest}>{text}</ButtonRoot>;
};

export default Button;
