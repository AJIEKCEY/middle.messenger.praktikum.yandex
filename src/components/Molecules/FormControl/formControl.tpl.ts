export default `
<div class="form-control">
  {{#switch tag}}
    {{#case 'input'}}
      <label for="{{id}}">{{label}}</label>
      {{{FormElement}}}
      <span class="validationMessage">{{validationMessage}}</span>
    {{/case}}
    {{#case 'button'}}
      {{{FormElement}}}
    {{/case}}
  {{/switch}}
</div>
`
