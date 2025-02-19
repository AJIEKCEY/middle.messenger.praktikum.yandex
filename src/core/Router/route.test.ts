import { expect } from 'chai';
import sinon from 'sinon';
import Route from './Route.ts';

describe('Route', function () {
  let route: Route;
  //@ts-nocheck
  let blockStub: sinon.SinonStubbedInstance<any>;

  beforeEach(function () {
    route = new Route('/test', blockStub);
  });

  it('should return null if path does not match', function () {
    const result = route.get('/wrong-path', undefined);
    expect(result).to.be.null;
  });


  it('should correctly prepare params from query string', function () {
    const params = route.prepareParams('?key1=value1&key2=value2');
    expect(params).to.deep.equal({ key1: 'value1', key2: 'value2' });
  });

  it('should return empty object if no query params are provided', function () {
    const params = route.prepareParams(undefined);
    expect(params).to.deep.equal({});
  });

  it('should correctly match pathnames', function () {
    expect(route.match('/test')).to.be.true;
    expect(route.match('/wrong-path')).to.be.false;
  });

  it('should correctly compare two equal paths', function () {
    expect(route.isEqual('/test', '/test')).to.be.true;
  });

  it('should correctly compare two different paths', function () {
    expect(route.isEqual('/test', '/other')).to.be.false;
  });
});
