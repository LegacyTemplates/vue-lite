declare class InputEvent {
    target:HTMLInputElement
}

interface Vue {
    readonly $el: Element;
    readonly $options: any;
    readonly $parent: Vue;
    readonly $root: Vue;
    readonly $children: Vue[];
    readonly $refs: { [key: string]: Vue | Element | Vue[] | Element[] };
    readonly $slots: { [key: string]: any[] | undefined };
    readonly $scopedSlots: { [key: string]: any | undefined };
    readonly $isServer: boolean;
    readonly $data: Record<string, any>;
    readonly $props: Record<string, any>;
    readonly $ssrContext: any;
    readonly $vnode: any;
    readonly $attrs: Record<string, string>;
    readonly $listeners: Record<string, Function | Function[]>;
  
    $mount(elementOrSelector?: Element | string, hydrating?: boolean): this;
    $forceUpdate(): void;
    $destroy(): void;
    $set<T>(object: object, key: string | number, value: T): T;
    $set<T>(array: T[], key: number, value: T): T;
    $delete(object: object, key: string | number): void;
    $delete<T>(array: T[], key: number): void;
    $watch(
      expOrFn: string,
      callback: (this: this, n: any, o: any) => void,
      options?: any
    ): (() => void);
    $watch<T>(
      expOrFn: (this: this) => T,
      callback: (this: this, n: T, o: T) => void,
      options?: any
    ): (() => void);
    $on(event: string | string[], callback: Function): this;
    $once(event: string | string[], callback: Function): this;
    $off(event?: string | string[], callback?: Function): this;
    $emit(event: string, ...args: any[]): this;
    $nextTick(callback: (this: this) => void): void;
    $nextTick(): Promise<void>;
    $createElement: Function;
}
interface VueConstructor<V extends Vue = Vue> {
    new (options?: any): Vue;
    extend(options?: any): Vue;
    nextTick<T>(callback: (this: T) => void, context?: T): void;
    nextTick(): Promise<void>
    set<T>(object: object, key: string | number, value: T): T;
    set<T>(array: T[], key: number, value: T): T;
    delete(object: object, key: string | number): void;
    delete<T>(array: T[], key: number): void;

    component(id: string): VueConstructor;
    component(id: string, definition?: any): any;
}

declare module 'vue' {
    export const Vue:VueConstructor;
    export default Vue;
}

declare module 'vue-router' {
    var VueRouter:any;
    export default VueRouter;
}

declare module 'vue-class-component' {
    var Component:any;
    export default Component;
}

declare module 'vue-property-decorator' {
    export const Vue:VueConstructor;
    export var Component:Function;
    export var Inject:Function;
    export var Provide:Function;
    export var Model:Function;
    export var Prop:Function;
    export var Watch:Function;
    export var Emit:Function;
}
