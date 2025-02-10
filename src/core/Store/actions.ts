import Store from './store'

export default {
  setUserId(context:Store, payload:any) {
    context.commit('setUserId', payload);
  },

  setChatId(context:Store, payload:any) {
    context.commit('setChatId', payload);
  },

  setChatName(context:Store, payload:any) {
    context.commit('setChatName', payload);
  },

  setUserProfile(context:Store, payload:any) {
    context.commit('setUserProfile', payload);
  },

  setNewPassword(context:Store, payload:any) {
    context.commit('setNewPassword', payload);
  }
};
