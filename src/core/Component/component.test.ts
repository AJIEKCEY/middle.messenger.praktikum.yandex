import { expect } from 'chai';
import sinon from 'sinon';
import Component from './component.ts';

describe('Component', function () {
  let component: Component<any>;

  beforeEach(function () {
    component = new Component({});
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('Initialization', function () {
    it('should initialize with default values', function () {
      expect(component).to.be.instanceOf(Component);
      expect(component.getId()).to.be.a('string');
      expect(component.getContent()).to.be.instanceOf(HTMLElement);
    });
  });

  describe('Lifecycle Methods', function () {
    it('should call componentDidMount on FLOW_CDM event', function () {
      const componentDidMountSpy = sinon.spy(component, 'componentDidMount');
      component.dispatchComponentDidMount();
      expect(componentDidMountSpy.calledOnce).to.be.true;
    });

    it('should call componentDidUpdate on FLOW_CDU event', function () {
      const componentDidUpdateSpy = sinon.spy(component, 'componentDidUpdate');
      const prevProps = { key: 'oldValue' };
      const nextProps = { key: 'newValue' };
      component.dispatchComponentDidUpdate(prevProps, nextProps);
      expect(componentDidUpdateSpy.calledWith(prevProps, nextProps)).to.be.true;
    });
  });

  describe('Props Management', function () {
    it('should update props and trigger render', function () {
      const renderSpy = sinon.spy(component, 'render');
      const newProps = { key: 'value' };
      component.setProps(newProps);
      expect(component['_props']).to.deep.include(newProps);
      expect(renderSpy.calledOnce).to.be.true;
    });

  });

  describe('Rendering', function () {
    it('should render the component', function () {
      const template = '<div>Test</div>';
      const props = { key: 'value' };
      component.compile(template, props);
      expect(component.getContent().tagName).to.equal('DIV');
    });

    it('should clear the element on render', function () {
      component.getContent().innerHTML = '<div>Test</div>';
      component.render();
      expect(component.getContent().innerHTML).to.be.empty;
    });
  });

  describe('Event Handling', function () {
    it('should add event listeners', function () {
      const eventHandler = sinon.spy();
      component.setProps({ events: { click: eventHandler } });
      component['_addEvents']();
      component.getContent().click();
      expect(eventHandler.calledOnce).to.be.true;
    });


    //TODO
    it.skip('should remove event listeners', function () {
      const eventHandler = sinon.spy();
      component.setProps({ events: { click: eventHandler } });
      component['_addEvents']();
      component['_removeEvents']();
      component.getContent().click();
      expect(eventHandler.called).to.be.false;
    });
  });

  describe('Visibility Management', function () {
    it('should show the component', function () {
      component.hide();
      component.show();
      expect(component.getContent().style.display).to.equal('block');
    });

    it('should hide the component', function () {
      component.show();
      component.hide();
      expect(component.getContent().style.display).to.equal('none');
    });
  });
});
