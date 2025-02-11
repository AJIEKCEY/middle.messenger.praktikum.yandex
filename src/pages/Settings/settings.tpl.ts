export default `
<nav class="settings__wrapper">
  <ul>
  {{#each links}}
    <li>
      {{{this}}}
    </li>
  {{/each}}
  </ul>
</nav>
`

// <li><a href="" onclick="customEventListenersRenderProfile(event)">Профиль</a></li>
// <li><a href="" onclick="customEventListenersRenderProfileEdit(event)">Профиль Редактирование</a></li>
// <li><a href="" onclick="customEventListenersRenderRegistration(event)">Регистрация</a></li>
// <li><a href="" onclick="customEventListenersRenderAuthorization(event)">Авторизация</a></li>
// <li><a href="" onclick="customEventListenersRemove(event)">Назад к сообщениям</a></li>
