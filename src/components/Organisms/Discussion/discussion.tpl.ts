export default `
<div class="discussion__wrapper">
  <div class="discussion__header">
    {{{ Avatar }}}
    <h2>{{chatName}}</h2>
    <div class="header__menu">O</div>
  </div>
  <div class="discussion__messages">
    {{{Conversation}}}
  </div>
  <div class="discussion__input">
    <div class="discussion__input__buttons"></div>
    {{{DiscussionInput}}}
    {{{DiscussionSendButton}}}
  </div>
</div>
`
