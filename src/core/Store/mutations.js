export default {
  setUserId(state, payload) {
    state.userId = payload;
    return state;
  },

  setChatId(state, payload) {
    state.chatId = payload;
    return state;
  },

  setChatName(state, payload) {
    state.chatName = payload;
    return state;
  },

  setIsAuthorised(state, payload) {
    state.isAuthorised = payload;
    return state;
  }

};
