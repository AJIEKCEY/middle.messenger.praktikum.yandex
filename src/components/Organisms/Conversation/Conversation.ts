import Component from "../../../core/Component/component.ts";
import { ComponentProps } from '../../../core/types.ts';
import template from "./conversation.tpl.ts";

export default class Conversation extends Component{
  constructor(data?: ComponentProps) {
    super(data);
  }

  override render(): void{
    this.compile(template, this._props);
  }
};
