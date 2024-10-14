import Message from "./Message.ts";

export default (props = {}) => {
  return new Message(
    {
      ...props,
    }
  )
}
