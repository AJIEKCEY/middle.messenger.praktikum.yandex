import PubSub from './PubSub.ts';
import { StoreParams, ActionMap, Mutation, State } from "./types.ts";

enum StatusEnum {
  Resting = 'resting',
  Action = 'action',
  Mutation = 'mutation',
}

export default class Store {
  // Статическое поле для хранения единственного экземпляра Store
  static instance: Store;

  // Защищенные поля для хранения действий, мутаций и состояния
  protected actions: ActionMap = {};
  protected mutations: Record<string, Mutation> = {};
  public state: State = {};
  public events: PubSub = new PubSub();
  private status: StatusEnum = StatusEnum.Resting;

  // Сообщения об ошибках и предупреждения
  private static readonly ACTION_UNDEFINED_ERROR = (key: string) =>
    `Action "${key}" is undefined or not a valid function. Make sure it is properly defined in your actions map.`;
  private static readonly MUTATION_UNDEFINED_ERROR = (key: string) =>
    `Mutation "${key}" is undefined. Ensure it is correctly registered in your mutations map.`;
  private static readonly MUTATION_WARNING = (key: string) =>
    `Warning: Use a mutation to modify "${key}".`;

  constructor(params: StoreParams) {
    // Реализация паттерна Singleton
    if (Store.instance) {
      return Store.instance;
    }

    Store.instance = this as Store;
    this.actions = params.actions;
    this.mutations = params.mutations;
    this.state = this.initializeStateProxy(params.state);
  }

  // Метод для сброса инстанса (только для тестов)
  static resetInstance(): void {
    Store.instance = null as unknown as Store;
  }

  /**
   * Инициализирует прокси для состояния, чтобы отслеживать изменения.
   * @param state - Исходное состояние.
   * @returns Проксированное состояние.
   */
  private initializeStateProxy(state: State): State {
    return new Proxy(state, {
      set: (state: State, key: string, value: unknown): boolean => {
        state[key] = value;
        console.log(`State updated: ${key} = ${value}`);
        this.events.emit(key.toString(), value);

        if (this.status !== StatusEnum.Mutation) {
          console.warn(Store.MUTATION_WARNING(key));
        }

        this.status = StatusEnum.Resting;
        return true;
      },
    });
  }

  /**
   * Проверяет, существует ли действие и является ли оно функцией.
   * @param actionKey - Ключ действия.
   * @returns true, если действие валидно, иначе false.
   */
  private isActionValid(actionKey: string): boolean {
    return !!this.actions && typeof this.actions[actionKey] === 'function';
  }

  /**
   * Проверяет, существует ли мутация и является ли она функцией.
   * @param mutationKey - Ключ мутации.
   * @returns true, если мутация валидна, иначе false.
   */
  private isMutationValid(mutationKey: string): boolean {
    return typeof this.mutations[mutationKey] === 'function';
  }

  /**
   * Валидирует действие. Если действие невалидно, выбрасывает ошибку.
   * @param actionKey - Ключ действия.
   */
  private validateAction(actionKey: string): void {
    if (!this.isActionValid(actionKey)) {
      throw new Error(Store.ACTION_UNDEFINED_ERROR(actionKey));
    }
  }

  /**
   * Валидирует мутацию. Если мутация невалидна, выбрасывает ошибку.
   * @param mutationKey - Ключ мутации.
   */
  private validateMutation(mutationKey: string): void {
    if (!this.isMutationValid(mutationKey)) {
      throw new Error(Store.MUTATION_UNDEFINED_ERROR(mutationKey));
    }
  }

  /**
   * Вызывает действие по ключу.
   * @param actionKey - Ключ действия.
   * @param payload - Данные для действия.
   * @returns true, если действие выполнено успешно.
   */
  public dispatch(actionKey: string, payload: unknown): boolean {
    this.validateAction(actionKey);
    console.info(`Dispatching action: "${actionKey}"`);
    this.status = StatusEnum.Action;
    this.actions[actionKey](this, payload);
    return true;
  }

  /**
   * Вызывает мутацию по ключу.
   * @param mutationKey - Ключ мутации.
   * @param payload - Данные для мутации.
   */
  public commit(mutationKey: string, payload: unknown): void {
    this.validateMutation(mutationKey);
    console.info(`Committing mutation: "${mutationKey}"`);
    this.status = StatusEnum.Mutation;
    this.mutations[mutationKey](this.state, payload);
  }
}
