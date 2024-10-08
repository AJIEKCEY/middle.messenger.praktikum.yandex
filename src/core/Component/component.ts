import Handlebars from "handlebars";
import {v4 as makeUUID} from "uuid"
import EventBus from "../EventBus.ts";
import {
  ComponentProps, Methods, ChildComponents, ComponentDataType,
} from '../types.ts';
import PropsManager from '../PropsManager.ts';

export default class Component <ComponentData extends ComponentDataType = {}> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  protected _id: string;
  protected _element: HTMLElement | null = null;
  protected _props: ComponentProps;
  protected _children: ChildComponents;
  protected _methods: Methods;
  protected _eventBus;

  //protected _setUpdate = false;

  constructor(data?: ComponentData) {

    const eventBus: EventBus = new EventBus();
    const componentDescriptor = new PropsManager(data || {});

    this._id = makeUUID();
    this._props = this._makePropsProxy(componentDescriptor._props);
    this._children = componentDescriptor._children;
    this._methods = componentDescriptor._methods;

    this._eventBus = () => eventBus;
    this._registerEvents(eventBus);
    this._eventBus().emit(Component.EVENTS.INIT);
  }

  // private _getChildren(propsAndChildren: ComponentProps) : {
  //   children: Record<string, Component>,
  //   props: ComponentProps,
  //   lists: Record<string, any[]>
  // } {
  //   const children: Record<string, Component> = {};
  //   const props: ComponentProps = {};
  //   const lists: Record<string, any[]> = {};
  //
  //   Object.entries(propsAndChildren).forEach( ([key, value]) => {
  //     if (value instanceof Component) {
  //       children[key] = value;
  //     } else if (Array.isArray(value)) {
  //       lists[key] = value;
  //     } else {
  //       props[key] = value;
  //     }
  //   });
  //
  //   return {children, props, lists}
  // }


  private _registerEvents(eventBus: EventBus) : void {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this.render.bind(this));
  }

  private _makePropsProxy(baseProps: ComponentProps): ComponentProps {
    return new Proxy(baseProps, {
      get: (target: ComponentProps, property: string): unknown => target[property],
      set: (target: ComponentProps, property: string, value: unknown): boolean => {
        target[property] = value;

        this.render();

        return true;
      },
      deleteProperty: (_target: ComponentProps, property: string): boolean => {
        throw new Error(`Нельзя удалить свойство ${property}`);
      },
    });
  }

  private _createResources():void {
    this._element = Component.createElement('div');
    this._element.setAttribute('data-id', this._id);
  }

  protected init(): void {
    this._createResources();
    this._eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  componentDidMount():void {}

  private _componentDidMount():void {
    this.componentDidMount();
    console.log('Component did mount: ', this.constructor.name);
  }

  dispatchComponentDidMount():void {
    this._eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  componentDidUpdate(_prevProps?: ComponentProps | unknown, _nextProps?: ComponentProps | unknown) { }

  private _componentDidUpdate(prevProps: ComponentProps | unknown, nextProps: ComponentProps | unknown):void {
    this.componentDidUpdate(prevProps, nextProps);
  }

  dispatchComponentDidUpdate(prevProps: ComponentProps, nextProps: ComponentProps):void {
    this._eventBus().emit(Component.EVENTS.FLOW_CDU, prevProps, nextProps);
  }

  private _removeEvents():void {
    const nodes: NodeList | undefined = this._element?.querySelectorAll('[events]');

    if (nodes instanceof NodeList) {
      [...Array.from(nodes), this._element].forEach((item: Node | null):void => {
        const eventsString: string = (item as HTMLElement).getAttribute('events') as string;

        const eventsObject: {[key: string]: string} = JSON.parse(eventsString
          ? eventsString?.replaceAll('\'', '"') : '{}');
        const eventsKeys: string[] = Object.keys(eventsObject);

        if (eventsKeys.length > 0) {
          eventsKeys.forEach((eventName: string): void => {
            const handlerName: string = eventsObject[eventName];

            if (this._methods instanceof Object) {
              (item as HTMLElement).removeEventListener(eventName, this._methods[handlerName]);
            }
          });
        }

        (item as HTMLElement).removeAttribute('events');
      });
    }
  }

  protected addAttributes(): void {
    const { attr = {} } = this._props;
    if (attr){
      Object.entries(attr).forEach(([key, value]) => {
        if (this._element) {
          this._element.setAttribute(key, value as string);
        }
      });
    }
  }

  protected setAttributes(attr: string): void {
    if (attr){
      Object.entries(attr).forEach(([key, value]) => {
        if (this._element) {
          this._element.setAttribute(key, value as string);
        }
      });
    }
  }

  private _addEvents(): void {
    //const events: {[key: string]: any} = {}
    const { events = {} } = this._props;
    if (events){
      Object.keys(events).forEach(eventName => {
        if (this._element) {
          // @ts-ignore
          this._element.addEventListener(eventName, events[eventName]);
        }
      });
    }
  }

  // private _addEvents():void {
  //   const nodes: NodeList | undefined = this._element?.querySelectorAll('[events]');
  //
  //   if (nodes instanceof NodeList) {
  //     [...Array.from(nodes), this._element].forEach((item: Node | null):void => {
  //       const eventsString: string = (item as HTMLElement).getAttribute('events') as string;
  //
  //       const eventsObject: {[key: string]: string} = JSON.parse(eventsString
  //         ? eventsString?.replaceAll('\'', '"') : '{}');
  //       const eventsKeys: string[] = Object.keys(eventsObject);
  //
  //       if (eventsKeys.length > 0) {
  //         eventsKeys.forEach((eventName: string): void => {
  //           const handlerName: string = eventsObject[eventName];
  //
  //           if (this._methods instanceof Object) {
  //             (item as HTMLElement).addEventListener(eventName, this._methods[handlerName]);
  //           }
  //         });
  //       }
  //
  //       (item as HTMLElement).removeAttribute('events');
  //     });
  //   }
  // }

  public compile(template: string, props: ComponentProps):void {
    if (this._element instanceof HTMLElement) {
      const templateNode:HTMLTemplateElement = document.createElement('template');
      const templateData: ComponentProps = { ...props };
      let rootElement:HTMLElement | null = null;

      templateNode.innerHTML = Handlebars.compile(template)(templateData);
      rootElement = templateNode.content.children[0] as HTMLElement;

      this._removeEvents();

      setTimeout(() => {
        if (this._element) {
          this._element.parentNode?.replaceChild(rootElement, this._element);
          this._element.remove();
          this._element = rootElement;
          if (this._id){
            this._element.setAttribute('data-id', this._id);
          }

          for ( let childName in this._children){
            const child = this._children[childName]
            const stub = this._element?.querySelector(`[data-id="${child._id}"]`);

            stub?.replaceWith(child.getContent());
            child.dispatchComponentDidMount();
          }
          this._addEvents();
          this.addAttributes();
        }
      }, 0);
    }
  }

  render():void {
    if (this._element instanceof HTMLElement) this._element.innerHTML = '';
  }

  public setProps = (nextProps: ComponentProps):void => {
    if (!nextProps) {
      return;
    }

    const prevProps = { ...this._props };
    const props = new PropsManager(nextProps);

    Object.assign(this._props, props._props);
    this._children = [...this._children, ...props._children];

    this.dispatchComponentDidUpdate(prevProps, this._props);
  };

  public getId(): string{
      return this._id ? this._id : ''
  }

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Element is not created');
    }
    return this._element as HTMLElement;
  }

  public show() {
    if (this._element instanceof HTMLElement) {
      this.getContent().style.display = "block";
    }
  }

  public hide() {
    if (this._element instanceof HTMLElement) {
      this.getContent().style.display = "none";
    }
  }

  static createElement(tag: string): HTMLElement {
    return document.createElement(tag);
  }
}
