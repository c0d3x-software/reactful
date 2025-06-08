import { HTML } from "../typings/form";
import { SubmitEvent } from "../typings/form";
import { Props } from "./form[data]";
type SubmitReturn = Promise<{
    errors: Invalid[];
    inputs: HTMLInputElement[];
}>;
/** form[data] for reactive rendering after submit the form  */
export declare function onValidation(props: Props, e: SubmitEvent): SubmitReturn;
export declare function getInvalidInputs(props: Props, inputs: HTML[]): Promise<Invalid<any>[]>;
export {};
