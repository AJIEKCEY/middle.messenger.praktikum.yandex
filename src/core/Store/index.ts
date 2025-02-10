import storeActions from './actions.ts';
import storeMutations from './mutations.ts';
import initialState from './state.ts';
import Store from './store.ts';

const storeConfig = {
  actions: storeActions,
  mutations: storeMutations,
  state: initialState
};

export default new Store(storeConfig);
