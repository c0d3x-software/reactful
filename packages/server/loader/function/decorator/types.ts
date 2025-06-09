export interface DecoratorCode {
   full: string;
   name: string;
   args: string;
   call: string;
}

export interface Check {
   check: string | null
   found: string | null
   match: RegExpMatchArray | null;
   catch: Record<string, DecoratorCode[]>;
}