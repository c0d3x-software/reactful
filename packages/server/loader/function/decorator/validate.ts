import ts from "typescript";
import { Args } from "../../shared";
import { extractFunctions } from "../extractor";
import { CodeFunction, Ignore } from "../extractor/types";
import { DECORATOR_RGX } from "./regex";
import { PREFIX_ERROR } from "../../../../kernel";

export function validate(args: Args): boolean {
   const codeFunctions = extractFunctions(args.code, Ignore.None)

   notAllowInnerDecorator(codeFunctions)

   return true
}

export function notAllowInnerDecorator(codes: CodeFunction[]) {
   const contains = codes.some(c => c.content.match(DECORATOR_RGX))
   
   if (contains) throw PREFIX_ERROR
      + `functional decorator is only allowed in top functions `
}
