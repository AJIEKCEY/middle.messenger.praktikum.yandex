import "./searchBar.css"
import Component from "../../../core/Component/component.ts";
import template from "./searchBar.tpl.ts";
import Input from "../../Atomics/Input";
import Button from "../../Atomics/Button";

const searchInput = Input({
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

const searchButton = Button({
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

class SearchBar extends Component{
  constructor() {
    super({
      SearchInput: searchInput,
      SearchButton: searchButton,
    });
  }

  render() {
    this.compile(template, this._props);
  }
}

export default SearchBar
