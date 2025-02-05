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

  setIsAuthorised(context, payload) {
    context.commit('setIsAuthorised', payload);
  }
};
