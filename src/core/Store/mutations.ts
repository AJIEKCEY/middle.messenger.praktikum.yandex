import {State} from "./types.ts";

export default {
  setUserId(state: State, payload: any) {
    state.userId = payload;
    return state;
  },

  setChatId(state: State, payload: any) {
    state.chatId = payload;
    return state;
  },

  setChatName(state: State, payload: any) {
    state.chatName = payload;
    return state;
  },

  setUserProfile(state: State, payload: any) {
    state.userProfile = payload;
    return state;
  },

  setNewPassword(state: State, payload: any) {
    state.newPassword = payload;
    return state;
  }
};
