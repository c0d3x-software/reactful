import { ServerActionProps } from "../typings/form";
/** experimental authentication binding using basic authentication and jwt bearer */
export declare function authenticate<T extends record = record>(props: ServerActionProps): RequestInit;
export declare function authorize(response: Response, props?: ServerActionProps): Promise<void>;
