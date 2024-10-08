import "./searchBar.css"
import Component from "../../../core/Component/component.ts";
import template from "./searchBar.tpl.ts";

class SearchBar extends Component{
  render() {
    this.compile(template, this._props);
  }
}

export default SearchBar
