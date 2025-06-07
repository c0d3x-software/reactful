/** SEO decorator for title + charset */
export declare function seo(title: string, charset: "UTF-8" | "UTF-16"): Decorator<RFC>;
/** SEO decorator for title + description */
export declare function seo(title: string, metadata: MetaTag): Decorator<RFC>;
export declare function seo(title: string, description: string): Decorator<RFC>;
export interface SeoDecoratorInfo extends DecoratorInfo, MetaTag {
    tag: string;
    route: string;
}
