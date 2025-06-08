import '../extensions';
/** client-side component
* @param {boolean} stateful true for stateful client component */
export declare function client(stateful: boolean): Decorator<RFC>;
/** client-side component with modular states
* @param {boolean} stateful true for stateful client component
* @param {object} record modular stateful object */
export declare function client(stateful: true, ...stores: Store[]): Decorator<RFC>;
export interface ClientDecoratorInfo extends DecoratorInfo {
    stateless: boolean;
}
