export default `
{{#if isMyMessage}}
<div class="message__item message__item_right" >
{{else}}
<div class="message__item message__item_left" >
{{/if}}
  <div class="message_content">
    <p>{{ content }}</p>
  </div>
  <div class="message_time">
    {{ time }}
  </div>
</div>
`
