import { AuditProxy } from './audit';
/** create a modular orbital state
 * @param {object} store initial state object */
export declare function useStore<T extends Store = Store>(store: T, audit?: AuditProxy): T;
