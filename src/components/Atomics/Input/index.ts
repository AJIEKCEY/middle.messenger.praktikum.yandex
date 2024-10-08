import Input from "./Input.ts";
import { ComponentProps } from '../../../core/types.ts';



export default (props: ComponentProps = {}) => {

  const { events, ...restProps } = props;

  const component = new Input({
    ...restProps,
  })

  if (typeof events === "object") {
    for (let handler in events){
      // @ts-ignore
      if (typeof events[handler] === 'function'){
        // @ts-ignore
        events[handler] = events[handler].bind(component);
      }
    }
  }

  component.setProps({events});

  return component;
};
