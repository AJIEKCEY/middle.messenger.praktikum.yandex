import Button from "./Button.ts";

export default (prop = {}) => {
  return new Button({
    ...prop,
  })
};
