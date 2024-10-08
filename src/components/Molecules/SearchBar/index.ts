import SearchBar from "./SearchBar.ts";
import Input from "../../Atomics/Input";
//import Button from "../../Atomics/Button";

export default (props = {}) => {

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

  // const searchButton = Button({
  //   events: {
  //     click: (e: Event) => {
  //       e.preventDefault();
  //       console.log(e);
  //     },
  //   },
  //   attr: {
  //     class: 'search__btn',
  //   },
  // });

  return new SearchBar({
    ...props,
    SearchInput: searchInput,
    //SearchButton: searchButton,
  })
}
