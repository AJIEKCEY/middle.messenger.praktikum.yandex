import EventBus from '../EventBus.ts';
import {StoreParams, ActionMap, Mutation} from "./types.ts";

class PubSub extends EventBus {
  emit(event: string, ...args: any[]): void {
    const listeners = this._listeners[event];
    if (!listeners) return;

    listeners.forEach((listener) => listener(...args));
  }
}

enum StatusEnum {
  Resting = 'resting',
  Action = 'action',
  Mutation = 'mutation',
}

export default class Store<S = any> {
  static instance: Store<any>;

  protected actions: ActionMap<S> = {};
  protected mutations: Record<string, Mutation<S>> = {};
  public state: S = ({} as S);
  public events: PubSub | undefined;
  private status: StatusEnum = StatusEnum.Resting;

  constructor(params: StoreParams<S>) {
    if (Store.instance) return Store.instance;

    Store.instance = this;

    this.actions = params.actions;
    this.mutations = params.mutations;
    this.state = params.state;
    this.events = new PubSub();
    this.state = this.createStateProxy(this.state);
  }

  private createStateProxy(state: S): S {
    return new Proxy(state as Record<string, any>, {
        set: (state, stateKey: string, value) => {
            state[stateKey] = value;

            console.log(`State updated: ${stateKey} = ${value}`);
            this.events?.emit(stateKey.toString(), value);

            if (this.status !== StatusEnum.Mutation) {
                console.warn(`Warning: Use a mutation to modify "${stateKey}".`);
            }

            this.status = StatusEnum.Resting;
            return true;
        },
    }) as S;
  }

  private validateAction(actionKey: string): void {
    if (!this.actions || typeof this.actions[actionKey] !== 'function') {
      throw new Error(
        `Action "${actionKey}" is undefined or not a valid function. Make sure it is properly defined in your actions map.`
      );
    }
  }

  private validateMutation(mutationKey: string): void {
    if (typeof this.mutations[mutationKey] !== 'function') {
      throw new Error(
        `Mutation "${mutationKey}" is undefined. Ensure it is correctly registered in your mutations map.`
      );
    }
  }

  dispatch(actionKey: string, payload?: any): boolean {
    this.validateAction(actionKey);

    console.info(`Dispatching action: "${actionKey}"`);
    this.status = StatusEnum.Action;
    this.actions[actionKey](this, payload);

    return true;
  }

  commit(mutationKey: string, payload?: any): void {
    this.validateMutation(mutationKey);

    console.info(`Committing mutation: "${mutationKey}"`);
    this.status = StatusEnum.Mutation;
    this.mutations[mutationKey](this.state, payload);
  }
}
