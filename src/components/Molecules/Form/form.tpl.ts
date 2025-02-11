export default `
<form
  action="{{action}}"
>
  {{#each controls}}
    {{{this}}}
  {{/each}}
</form>
`
