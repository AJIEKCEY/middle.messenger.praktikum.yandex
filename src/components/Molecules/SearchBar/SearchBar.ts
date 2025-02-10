import "./searchBar.css"
import Component from "../../../core/Component/component.ts";
import template from "./searchBar.tpl.ts";
import Input from "../../Atomics/Input/Input.ts";
import Button from "../../Atomics/Button/Button.ts";

const searchInput = new Input({
  events: {
    input: (e: Event) => {
      document.dispatchEvent(new CustomEvent(
        'searchInputChange',
        {detail: (<HTMLInputElement>e.target).value}))
    },
  },
  attr: {
    class: 'search_input',
  },
});

const searchButton = new Button({
  events: {
    click: (e: Event) => {
      e.preventDefault();
      console.log(e);
    },
  },
  attr: {
    class: 'search__btn',
  },
});

export default class SearchBar extends Component{
  constructor() {
    super({
      SearchInput: searchInput,
      SearchButton: searchButton,
    });
  }

  override render(): void {
    this.compile(template, this._props);
  }
}
