export default `
<div class="avatar" data-avatar-src="">
  {{#if avatar}}
    <img src="{{ baseUrl }}/resources/{{ avatar }}" alt="Аватар">
  {{/if}}

</div>
`
