import {expect, use} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import HTTPTransport from './HTTPTransport.ts'; // Замените на актуальный путь
import Router from "../Router/Router.ts";

describe('HTTPTransport', function () {
  use(sinonChai)
  let http: HTTPTransport;
  let xhr: sinon.SinonFakeXMLHttpRequestStatic;
  let requests: sinon.SinonFakeXMLHttpRequest[] = [];
  let router: Router;

  beforeEach(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = (req) => {
      requests.push(req);
    }
    http = new HTTPTransport();
    router = new Router();
  });

  afterEach(function () {
    xhr.restore();
  });

  describe('#GET', function () {
    it('should be in instance', function () {
      expect(http).to.respondTo("get");
    });

    it('should return a Promise', function () {
      expect(http.get('test.ru')).to.be.a('promise');
    });
  })

  describe('#POST', function () {
    it('should be in instance', function () {
      expect(http).to.respondTo("post");
    });

    it('should return a Promise', function () {
      expect(http.get('test.ru')).to.be.a('promise');
    });
  })

  describe('#PUT', function () {
    it('should be in instance', function () {
      expect(http).to.respondTo("put");
    });

    it('should return a Promise', function () {
      expect(http.get('test.ru')).to.be.a('promise');
    });
  })


  describe('#PATCH', function () {
    it('should be in instance', function () {
      expect(http).to.respondTo("patch");
    });

    it('should return a Promise', function () {
      expect(http.get('test.ru')).to.be.a('promise');
    });
  })


  describe('#DELETE', function () {
    it('should be in instance', function () {
      expect(http).to.respondTo("delete");
    });

    it('should return a Promise', function () {
      expect(http.get('test.ru')).to.be.a('promise');
    });
  })

  it('should set correct headers', async function () {
    const promise = http.get('/test', {headers: {'Custom-Header': 'HeaderValue'}});

    // Завершаем мокированный запрос
    requests[0].respond(200, {}, 'OK');

    // Ожидаем завершения Promise
    await promise;

    // Проверяем заголовки
    expect(requests[0].requestHeaders['Custom-Header']).to.equal('HeaderValue');
  });

  it('should handle 401 response by redirecting to sign-in', function () {
    const routerMock = sinon.mock(router);
    routerMock.expects('go').withArgs('/sign-in').once();

    http.get('/test');
    requests[0].respond(401, {}, '');

    routerMock.verify();
    routerMock.restore();
  });
});
