export default `
<div class="discussion__wrapper">
  <div class="discussion__header">
    {{{ avatar }}}
    <h2>{{chatName}}</h2>
    <div class="header__menu">O</div>
  </div>
  <div class="discussion__messages">
    {{#each messages}}
      {{{this}}}
    {{/each}}
  </div>
  <div class="discussion__input">
    <div class="discussion__input__buttons"></div>
    <input type="text" name="message">
    <button> > </button>
  </div>
</div>
`
