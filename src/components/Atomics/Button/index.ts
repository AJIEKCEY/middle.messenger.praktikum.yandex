import Button from "./Button.ts";
import { ComponentProps } from '../../../core/types.ts';

export default (props: ComponentProps = {}) => {

  const { events, ...restProps } : { [key: string]: any } = props;


  const component = new Button({
    ...restProps,
  })

  if (typeof events === "object") {
    for (const handler in events){
      if (typeof events[handler] === 'function'){
        events[handler] = events[handler].bind(component);
      }
    }
  }

  component.setProps({events});

  return component;
};
