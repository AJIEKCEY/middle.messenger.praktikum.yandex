import Form from "./Form.ts";

export default (props = {}) => {
  return new Form(
    {
      ...props,
    }
  )
}
