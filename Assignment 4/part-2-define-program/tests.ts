import * as assert from "assert";
import { makeDefineExp, makeNumExp, makeProcExp, makeVarDecl, makeVarRef, parse } from './L5-ast';
import { typeofExp, L5typeof } from './L5-typecheck';
import { makeEmptyTEnv, makeExtendTEnv } from './TEnv';
import { makeBoolTExp, makeNumTExp, makeProcTExp, makeTVar, makeVoidTExp, parseTE, unparseTExp } from './TExp';
import { getErrorMessages } from "./error";



console.log(L5typeof(`
(L5
  (define (x : (T1 -> (T1 -> number)))
                    (lambda ((x : T1)) : (T1 -> number)
                      (lambda((y : T1)) : number 5)))
  (if #t 3 4)  
  (if #t #f #f)
)`));
console.log(L5typeof(`
(L5
  (define (x : (boolean -> number))
                    (lambda ((x : boolean)) : number 5) )
  (x #t)
  (if #t 3 4)  
  (if #t #f #f)
)`));

// console.log(L5typeof(`
//                     (lambda ((x : T1)) : (T1 -> number)
//                       (lambda((y : T1)) : number 5))`));