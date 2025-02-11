export default `
  <input
    type="{{ type }}"
    id="{{ id }}"
    name="{{ name }}"
    class="{{#if hasError}}warning{{/if}}"
    value="{{value}}"
  >
`
