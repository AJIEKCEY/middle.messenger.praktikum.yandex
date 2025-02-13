import Store from './store'
import {State} from "./types.ts";

export default {
  setUserId(context:Store, payload:State) {
    context.commit('setUserId', payload);
  },

  setChatId(context:Store, payload:State) {
    context.commit('setChatId', payload);
  },

  setChatName(context:Store, payload:State) {
    context.commit('setChatName', payload);
  },

  setUserProfile(context:Store, payload:State) {
    context.commit('setUserProfile', payload);
  },

  setNewPassword(context:Store, payload:State) {
    context.commit('setNewPassword', payload);
  },

  setIsAuthenticated(context:Store, payload:State) {
    context.commit('setIsAuthenticated', payload);
  }
};
