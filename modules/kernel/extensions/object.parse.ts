export class ParseObject<T extends object = any> {
   private readonly entries: [keyof T, any][]

   constructor(that: T) { this.entries = Object.entries(that) as [keyof T, any][] }

   public map(fn: (value: [keyof T, any], index: number) => [keyof T, any]): [keyof T, any][] {
      return this.entries.map(fn)
   }

   public filter(fn: (value: [keyof T, any], index: number) => boolean): [keyof T, any][] {
      return this.entries.filter(fn)
   }

   public toObject() { return Object.fromEntries(this.entries) }

   public toArray = () => this.entries
} 