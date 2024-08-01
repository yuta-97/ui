import styled from "@emotion/styled";
import { HTMLAttributes } from "react";
import { Variant } from "../../theme/type";
import { shouldForwardProp } from "../../theme/utils";

const ButtonRoot = styled("button", {
  shouldForwardProp: shouldForwardProp(["variant"]),
})<{ variant: Variant }>(({ theme, variant }) => {
  return {
    padding: `10px 12px`,
    fontSize: 14,
    borderRadius: 8,
    border: `1px solid transparent`,
    cursor: `pointer`,
    backgroundColor: theme.palette[variant].main,
  };
});

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  readonly backgroundColor?: React.CSSProperties["backgroundColor"];
  readonly disabled?: boolean;
  readonly variant?: Variant;
}

const Button = (props: ButtonProps) => {
  const { children, variant = "primary", ...rest } = props;

  return (
    <ButtonRoot variant={variant} {...rest}>
      {children}
    </ButtonRoot>
  );
};

export default Button;
