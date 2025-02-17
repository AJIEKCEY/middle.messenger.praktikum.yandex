export default `
<li
  class="chat__item"
  data-chat-id="{{id}}"
  events="{'click': 'onClick'}"
>
  {{{ avatar }}}
  <div class="chat__content">
    <div class="chat__info">
       <h4>{{ title }}</h4>
<!--       <span class="chat__when">{{ when }}</span>-->
    </div>
    <div class="chat__message">
       <p>{{ last_message.content }}</p>
       {{#if unread_count}}
       <div class="chat__unread-count"><span>{{ unread_count }}</span></div>
       {{/if}}
    </div>
  </div>
</li>
`
