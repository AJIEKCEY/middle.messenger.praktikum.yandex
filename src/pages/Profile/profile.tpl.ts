export default `
<div class="profile_wrapper">
  {{{ Avatar }}}
  {{#switch currentView}}
    {{#case 'view'}}
    <div class="profile__data">
      {{#with userData}}
      <p><strong>Почта</strong><span>{{email}}</span></p>
      <p><strong>Логин</strong><span>{{login}}</span></p>
      <p><strong>Имя</strong><span>{{first_name}}</span></p>
      <p><strong>Фамилия</strong><span>{{second_name}}</span></p>
      <p><strong>Имя в чате</strong><span>{{display_name}}</span></p>
      <p><strong>Телефон</strong><span>{{phone}}</span></p>
      {{/with}}
    </div>
    <p class="profile__link color-blue">{{{EditData}}}</p>
    <p class="profile__link color-blue">{{{ChangePassword}}}</p>
    <p class="profile__link color-blue">{{{GoBack}}}</p>
    {{/case}}
    {{#case 'edit'}}
    <form class="profile__data">
      {{#with userData}}
      <p><strong>Почта</strong><input type="text" name="email" placeholder="{{ email }}"></p>
      <p><strong>Логин</strong><input type="text" name="login" placeholder="{{ login }}"></p>
      <p><strong>Имя</strong><input type="text" name="first_name" placeholder="{{ first_name }}"></p>
      <p><strong>Фамилия</strong><input type="text" name="second_name" placeholder="{{ second_name }}"></p>
      <p><strong>Имя в чате</strong><input type="text" name="display_name" placeholder="{{ display_name }}"></p>
      <p><strong>Телефон</strong><input type="text" name="phone" placeholder="{{ phone }}"></p>
      {{{SaveButton}}}
      {{/with}}
    </form>
    {{/case}}
    {{#case 'password'}}
    <form class="profile__data">
      <p><strong>Старый пароль</strong><input type="password" name="password"></p>
      <p><strong>Новый пароль</strong><input type="password" name="passwordNew1"></p>
      <p><strong>Повторите новый пароль</strong><input type="password" name="passwordNew2"></p>
      {{{SaveButton}}}
    </form>
    {{/case}}
  {{/switch}}

  <div class="go_back">
  {{{BackButton}}}
  </div>

</div>
`
