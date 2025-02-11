import Store from "./store.ts";

export interface State {
  [key: string]: unknown;
}

export type Action = (store: Store, payload: unknown) => void;
export type Mutation = (state: State, payload: unknown) => void;


export interface StoreParams {
  actions: ActionMap;
  mutations: Record<string, Mutation>;
  state: State;
}

export interface ActionMap {
  [key: string]: Action;
}

export interface MutationMap {
  [key: string]: Mutation;
}
