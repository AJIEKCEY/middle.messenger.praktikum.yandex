import Component from "../core/Component/component.ts";

export default function render(query: string, component: Component): Element | null {

  const root = document.querySelector(query);

  if (root){
    root.appendChild(component.getContent());
    component.dispatchComponentDidMount();
  }

  return root;
}
