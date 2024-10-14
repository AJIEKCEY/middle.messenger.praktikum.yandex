import Link from "./Link.ts";

export default (prop = {}) => {
  return new Link({
    ...prop,
  })
};
