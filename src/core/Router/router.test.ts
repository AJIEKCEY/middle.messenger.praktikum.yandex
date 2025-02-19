import {expect, use} from "chai";
import sinonChai from "sinon-chai";
import sinon from "sinon";
import Router from "./Router.ts";

describe('Router', () => {
  use(sinonChai)
  const sandbox = sinon.createSandbox();

  let router: Router;
  let historyStub: sinon.SinonStubbedInstance<History>;

  beforeEach(function () {
    router = new Router();
    historyStub = sandbox.stub(window.history);
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('should be a singleton', function () {
    const secondRouterInstance = new Router();
    expect(router).to.equal(secondRouterInstance);
  });

  it('should call pushState when go() is called', function () {
    router.go('/test');
    expect(historyStub.pushState.calledOnce).to.be.true;
  });

  it('should call history.back() when back() is called', function () {
    router.back();
    expect(historyStub.back.calledOnce).to.be.true;
  });

  it('should call history.forward() when forward() is called', function () {
    router.forward();
    expect(historyStub.forward.calledOnce).to.be.true;
  });

  it('should correctly parse pathname with query params', function () {
    const result = router.parsePathName('/test?param=value');
    expect(result).to.deep.equal({ path: '/test', params: '?param=value' });
  });
});
