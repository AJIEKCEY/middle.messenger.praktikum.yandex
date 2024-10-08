import Avatar from "./Avatar.ts";
import './avatar.css'

export default (props = {}) => {
  return new Avatar(
    {
      ...props,
      attr:{
        class:'avatar'
      }
    }
  )
}
