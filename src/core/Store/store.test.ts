import { expect } from 'chai';
import sinon from 'sinon';
import Store from './store.ts';
import PubSub from "./PubSub.ts";
import { State } from "./types.ts";

const mockActions = {
  testAction: (store:Store, payload: unknown) => {
    store.commit('testMutation', payload);
  },
};

const mockMutations = {
  testMutation: (state: State, payload: unknown) => {
    state.value = payload;
  },
};

describe('Store', () => {
  let store: Store;

  beforeEach(() => {
    Store.resetInstance();
    store = new Store({ actions: mockActions, mutations: mockMutations, state: { value: 0 } });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should be a singleton', function () {
    const newStore = new Store({ actions: {}, mutations: {}, state: {} });
    expect(newStore).to.equal(store);
  });

  it('should initialize store with given state', () => {
    expect(store?.state.value).to.equal(0);
  });

  it('should dispatch an action and commit a mutation', () => {
    store?.dispatch('testAction', 42);
    expect(store?.state.value).to.equal(42);
  });

  it('should throw an error if dispatching an undefined action', () => {
    expect(() => store?.dispatch('undefinedAction', 42)).to.throw(Error, 'Action "undefinedAction" is undefined or not a valid function.');
  });

  it('should throw an error if committing an undefined mutation', () => {
    expect(() => store?.commit('undefinedMutation', 42)).to.throw(Error, 'Mutation "undefinedMutation" is undefined.');
  });

  it('should emit event when state is updated', () => {
    const events = store?.events as PubSub;
    const eventSpy = sinon.spy(events, 'emit');
    store?.commit('testMutation', 100);
    expect(eventSpy.calledWith('value', 100)).to.be.true;
  });
});
