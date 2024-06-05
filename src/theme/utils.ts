import { Variant } from "./type";

function shouldForwardProp(
  props: PropertyKey[],
): (propName: PropertyKey) => boolean {
  return propName => {
    return !props.includes(propName);
  };
}

const VARIANT_LIST = [
  "primary",
  "secondary",
  "default",
  "error",
  "info",
  "success",
  "warning",
] satisfies Variant[];

export { shouldForwardProp, VARIANT_LIST };
