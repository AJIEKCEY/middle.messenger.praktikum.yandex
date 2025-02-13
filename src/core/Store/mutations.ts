import {State} from "./types.ts";

export default {
  setUserId(state: State, payload: number) {
    state.userId = payload;
    return state;
  },

  setChatId(state: State, payload: number) {
    state.chatId = payload;
    return state;
  },

  setChatName(state: State, payload: string) {
    state.chatName = payload;
    return state;
  },

  setUserProfile(state: State, payload: object) {
    state.userProfile = payload;
    return state;
  },

  setNewPassword(state: State, payload: object) {
    state.newPassword = payload;
    return state;
  },

  setIsAuthenticated(state: State, payload: object) {
    state.isAuthenticated = payload;
    return state;
  }
};
