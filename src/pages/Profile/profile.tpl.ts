export default `
<div class="profile_wrapper">
  <label class="avatar__label" for="avatar">
    {{{ Avatar }}}
  </label>
  {{{ InputFile }}}
  <div class="profile__data">
  {{#switch currentView}}
    {{#case 'view'}}
      {{#with userData}}
      <p><strong>Почта</strong><span>{{email}}</span></p>
      <p><strong>Логин</strong><span>{{login}}</span></p>
      <p><strong>Имя</strong><span>{{first_name}}</span></p>
      <p><strong>Фамилия</strong><span>{{second_name}}</span></p>
      <p><strong>Имя в чате</strong><span>{{display_name}}</span></p>
      <p><strong>Телефон</strong><span>{{phone}}</span></p>
      {{/with}}
      <div class="profile__data__links">
      {{{EditData}}}
      {{{ChangePassword}}}
      {{{GoBack}}}
      </div>
    {{/case}}
    {{#case 'edit'}}
      {{{Form}}}
    {{/case}}
    {{#case 'password'}}
      {{{Form}}}
    {{/case}}
  {{/switch}}
  </div>
  <div class="go_back">
  {{{GoBack}}}
  </div>

</div>
`
