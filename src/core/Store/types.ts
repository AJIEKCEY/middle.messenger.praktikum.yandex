import Store from "./store.ts";

export interface State {
  [key: string]: any;
}

export interface StoreParams<S = any> {
  actions: ActionMap<S>;
  mutations: Record<string, Mutation<S>>;
  state: S;
}
export interface ActionMap<S = any> {
  [key: string]: Action<S>;
}

export interface MutationMap<S = any> {
  [key: string]: Mutation<S>;
}

export type Action<S = any> = (store: Store<S>, payload?: any) => void;

export type Mutation<S = any> = (state: S, payload?: any) => void;
