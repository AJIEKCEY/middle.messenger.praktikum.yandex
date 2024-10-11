import Component from './Component/component.ts';

declare global {
  interface Window {
    app:Component;
  }
}

export interface Methods {
  [key: string]: (event?: Event) => void
}

export interface ComponentDataType {
  [key: string]: unknown,
  methods?: Methods
}

export interface ComponentProps {
  [key: string]: unknown
}

// export interface ButtonProps {
//   text?: string;
//   class?: string;
//   onClick?: (e: Event) => void;
// }

export type ChildComponents = Component[];
