// L5-typecheck
import * as assert from "assert";
import { makeDefineExp, makeNumExp, makeProcExp, makeVarDecl, makeVarRef, parse } from './L5-ast';
import { typeofExp, L5typeof } from './L5-typecheck';
import { makeEmptyTEnv, makeExtendTEnv } from './TEnv';
import { makeBoolTExp, makeNumTExp, makeProcTExp, makeTVar, makeVoidTExp, parseTE, unparseTExp } from './TExp';


// Pair
import {parseTExp} from "./TExp"
import {infer} from "./L5-type-equations"

assert.deepEqual(infer(`(lambda (x) (= x 0))`), '(number -> boolean)');
assert.deepEqual(infer(`(lambda ((x : number) (y : boolean)) (cons x y))`), '(number * boolean -> (Pair number boolean))');
assert.deepEqual(infer(`(cons x y)`), '(Pair T1 T2)');
assert.deepEqual(infer(`(lambda ((pair : (Pair boolean number))) (car pair))`), '((Pair boolean number) -> boolean)');
assert.deepEqual(infer(`(lambda ((pair : (Pair boolean number))) (cdr pair))`), '((Pair boolean number) -> number)');
assert.deepEqual(infer('(car (cons 1 #t))'), 'number');
assert.deepEqual(infer('(cdr (cons 1 #t))'), 'boolean');
assert.deepEqual(infer(`(cons (car (cons 1 2)) (cdr (cons 1 2)))`), '(Pair number number)');
assert.deepEqual(infer(`(lambda ((pair1 : (Pair boolean number)) (pair2 : (Pair number boolean)))
                            pair1)`), '((Pair boolean number) * (Pair number boolean) -> (Pair boolean number))');
assert.deepEqual(infer(`(lambda ((pair1 : (Pair boolean number)) (pair2 : (Pair number boolean)))
                          pair2)`), '((Pair boolean number) * (Pair number boolean) -> (Pair number boolean))');