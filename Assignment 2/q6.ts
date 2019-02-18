import { CExp, Exp, PrimOp, Program, DefineExp } from "./L1-ast";
import { hasError, isAppExp, isBoolExp, isCExp, isDefineExp, isError, isNumExp, isPrimOp,
         isProgram, isVarRef, isVarDecl } from "./L1-ast";
import { parseL1 } from "./L1-ast";
import { first, isEmpty, rest } from "./L1-ast";
import * as assert from "assert";
import { filter, map, reduce } from "ramda";

export const unparse = (x: Program | DefineExp | CExp) : string | Error => {
  return  isDefineExp(x)? 
      ("(define "+ x.var.var + " " + unparse(x.val)+")") :    
  isProgram(x)? 
      ("(L1 " + map(unparse, x.exps).join(" ")+ ")") :       
  isCExp(x)?
      unparseL3CExp(x) :
  isError(x)?
      Error("Unexpected input:" + x) :
  x

}

const unparseL3CExp = (x:CExp):string | Error => {
  return  isBoolExp(x)? 
              x.val ? "#t": "#f" :
          isNumExp(x) ? x.val.toString() :
          isPrimOp(x) ? x.op :
          isVarRef(x) ? x.var :
          isVarDecl(x) ? x.var :
          isAppExp(x) ? 
          ("("+(unparse(x.rator) + " " + map(unparse, x.rands).join(" "))+")") :
          isError(x) ? Error("Unexpected input:" + x):
  x
}
