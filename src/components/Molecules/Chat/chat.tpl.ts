export default `
<li
  class="chat__item"
  data-chat-id="{{id}}"
  events="{'click': 'onClick'}"
>
  {{{ avatar }}}
  <div class="chat__content">
    <div class="chat__info">
       <h4>{{ name }}</h4>
       <span class="chat__when">{{ when }}</span>
    </div>
    <div class="chat__message">
       <p>{{ lastMessage.message }}</p>
       {{#if unreadCount}}
       <div class="chat__unread-count"><span>{{ unreadCount }}</span></div>
       {{/if}}
    </div>
  </div>
</li>
`
