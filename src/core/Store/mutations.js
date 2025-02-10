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

  setUserProfile(state, payload) {
    state.userProfile = payload;
    return state;
  },

  setNewPassword(state, payload) {
    state.newPassword = payload;
    return state;
  }

};
