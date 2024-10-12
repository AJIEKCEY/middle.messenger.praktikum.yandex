export default `
<div class="form-control">
  {{#switch tag}}
    {{#case 'input'}}
      <div>
        <label for="{{id}}">{{label}}</label>
        {{{FormElement}}}
      </div>
      <span class="validationMessage">{{validationMessage}}</span>
    {{/case}}
    {{#case 'button'}}
      {{{FormElement}}}
    {{/case}}
  {{/switch}}
</div>
`
