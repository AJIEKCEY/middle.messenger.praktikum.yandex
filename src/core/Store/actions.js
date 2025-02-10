export default {
  setUserId(context, payload) {
    context.commit('setUserId', payload);
  },

  setChatId(context, payload) {
    context.commit('setChatId', payload);
  },

  setChatName(context, payload) {
    context.commit('setChatName', payload);
  },

  setUserProfile(context, payload) {
    context.commit('setUserProfile', payload);
  },

  setNewPassword(context, payload) {
    context.commit('setNewPassword', payload);
  }
};
