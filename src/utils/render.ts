import Component from "../core/Component/component.ts";
import {ComponentProps} from "../core/types.ts";

export default function render(query: string, component: Component<ComponentProps>): Element | null {

  const root = document.querySelector(query);

  if (root){
    root.appendChild(component.getContent());
    component.dispatchComponentDidMount();
  }

  return root;
}
