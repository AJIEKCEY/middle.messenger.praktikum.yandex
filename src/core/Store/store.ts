import EventBus from '../EventBus.ts';
import {StoreParams, ActionMap, Mutation, State} from "./types.ts";

class PubSub extends EventBus {
  emit(event: string, ...args: unknown[]): void {
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

export default class Store {
  static instance: Store;

  protected actions: ActionMap = {};
  protected mutations: Record<string, Mutation> = {};
  public state: State = {};
  public events: PubSub | undefined;
  private status: StatusEnum = StatusEnum.Resting;

  private static readonly ACTION_UNDEFINED_ERROR = (key: string) =>
    `Action "${key}" is undefined or not a valid function. Make sure it is properly defined in your actions map.`;
  private static readonly MUTATION_UNDEFINED_ERROR = (key: string) =>
    `Mutation "${key}" is undefined. Ensure it is correctly registered in your mutations map.`;
  private static readonly MUTATION_WARNING = (key: string) =>
    `Warning: Use a mutation to modify "${key}".`;

  constructor(params: StoreParams) {
    if (Store.instance) {
      return Store.instance;
    }

    Store.instance = this as unknown as Store;
    this.actions = params.actions;
    this.mutations = params.mutations;
    this.state = params.state;
    this.events = new PubSub();
    this.state = this.initializeStateProxy(this.state);
  }

  private initializeStateProxy(state: State): State {
    return new Proxy(state, this.stateProxyHandler());
  }

  private stateProxyHandler() {
    return {
      set: (state: State, key: string, value: unknown): boolean => {
        state[key] = value;
        console.log(`State updated: ${key} = ${value}`);
        this.events?.emit(key.toString(), value);

        if (this.status !== StatusEnum.Mutation) {
          console.warn(Store.MUTATION_WARNING(key));
        }

        this.status = StatusEnum.Resting;
        return true;
      },
    };
  }

  private isActionValid(actionKey: string): boolean {
    return this.actions && typeof this.actions[actionKey] === 'function';
  }

  private validateAction(actionKey: string): void {
    if (!this.isActionValid(actionKey)) {
      throw new Error(Store.ACTION_UNDEFINED_ERROR(actionKey));
    }
  }

  private isMutationValid(mutationKey: string): boolean {
    return typeof this.mutations[mutationKey] === 'function';
  }

  private validateMutation(mutationKey: string): void {
    if (!this.isMutationValid(mutationKey)) {
      throw new Error(Store.MUTATION_UNDEFINED_ERROR(mutationKey));
    }
  }

  public dispatch(actionKey: string, payload: unknown): boolean {
    this.validateAction(actionKey);
    console.info(`Dispatching action: "${actionKey}"`);
    this.status = StatusEnum.Action;
    this.actions[actionKey](this, payload);
    return true;
  }

  public commit(mutationKey: string, payload: State): void {
    this.validateMutation(mutationKey);
    console.info(`Committing mutation: "${mutationKey}"`);
    this.status = StatusEnum.Mutation;
    this.mutations[mutationKey](this.state, payload);
  }
}
