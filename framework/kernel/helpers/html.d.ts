/** get correspondent tag name for each react component type */
export declare const getTagName: (node: RRE) => any;
/** create a HTML based in a JSX react object */
export declare function createElementFromJSX(node: RRE): HTMLElement;
export declare function clientParseCSS(cssString: string): StyleRule[];
export declare function fromKebabCaseToCamelCase(field: string): string;
