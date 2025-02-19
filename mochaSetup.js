import {JSDOM} from 'jsdom';

const jsdom = new JSDOM(``, {
  url: "https://example.org/",
  contentType: "text/html",
  includeNodeLocations: true,
  storageQuota: 10000000
});

globalThis.window = jsdom.window;
globalThis.document = jsdom.window.document;
globalThis.FormData = jsdom.window.FormData;
globalThis.XMLHttpRequest = jsdom.window.XMLHttpRequest;
globalThis.HTMLElement = jsdom.window.HTMLElement;
globalThis.NodeList = jsdom.window.NodeList;
