import { filter, map, reduce, zip } from "ramda";
import { first, isArray, isBoolean, isEmpty, isNumber, isString, rest, second, makeLetExp, makeLetStarExp, LetStarExp, LetExp, makeProgram, makeDefineExp, isVarDecl, makeBinding, isBinding, isAtomicExp, Binding } from "./L3-ast";
import { AppExp, AtomicExp, BoolExp, CompoundExp, CExp, DefineExp, Exp, IfExp, LitExp, NumExp,
         Parsed, PrimOp, ProcExp, Program, StrExp, VarDecl, VarRef } from "./L3-ast";
import { allT, getErrorMessages, hasNoError, isError }  from "./L3-ast";
import { isAppExp, isBoolExp, isCExp, isDefineExp, isExp, isIfExp, isLetExp, isLetStarExp, isLitExp, isNumExp,
             isPrimOp, isProcExp, isProgram, isStrExp, isVarRef } from "./L3-ast";
import { makeAppExp, makeBoolExp, makeIfExp, makeLitExp, makeNumExp, makeProcExp, makeStrExp,
         makeVarDecl, makeVarRef } from "./L3-ast";
import { parseL3 } from "./L3-ast";
import { isClosure, isCompoundSExp, isEmptySExp, isSymbolSExp, isSExp,
         makeClosure, makeCompoundSExp, makeEmptySExp, makeSymbolSExp,
         Closure, CompoundSExp, SExp, Value } from "./value";

export const rewriteLetStar = (cexp: Parsed | Error) : LetExp  | Error => 
{
    return  isError(cexp)? cexp:
            isLetStarExp(cexp)?  rewriteLetStar_helper(cexp.bindings, cexp.body) :
            Error("Invalid let* expression"); 
}

/**
 * Auxilliry method for rewriteLetStar
 */
const rewriteLetStar_helper = (bindings: Binding [], body: CExp[]): LetExp | Error =>
    safeMakeLetExp( 
    [first(bindings)],               // current LetExp's bindings
    isEmpty(rest(bindings))?  body:  // current LetExp's body
                              [rewriteLetStar_helper(rest(bindings), body)]);

export const rewriteAllLetStar = (cexp: Parsed | Binding | Error) : Parsed | Binding | Error =>
{
    return  isError(cexp)       ? cexp : 
            isProgram(cexp)     ? makeProgram(map(rewriteAllLetStar, cexp.exps)) :
            isDefineExp(cexp)   ? safeMakeDefineExp(cexp.var, rewriteCExp(cexp.val)) :
            isBinding(cexp)     ? rewriteBinding(cexp) :
            isCExp(cexp)        ? rewriteCExp(cexp) :
            Error("Unexpected expression");
}

/**
 * Auxilliry method for rewriteAllLetStar
 * rewrites nested LetStarExps in @param cexp
 */
const rewriteBinding = (cexp: Binding) : Binding | Error =>
    safeMakeBinding(cexp.var, rewriteCExp(cexp.val));

/**
 * Auxilliry method for rewriteAllLetStar
 * rewrites nested LetStarExps in @param cexp
 */
const rewriteCExp = (cexp: CExp|Error) : CExp | Error=>
    isAtomicExp(cexp)? cexp :
    isAppExp(cexp) ? safeMakeAppExp(
        rewriteCExp(cexp.rator),
        map(rewriteCExp, cexp.rands)) : 
    isIfExp(cexp) ? safeMakeIfExp(
        rewriteCExp(cexp.test), 
        rewriteCExp(cexp.then), 
        rewriteCExp(cexp.alt)) : 
    isProcExp(cexp) ? makeProcExp(
        cexp.args,
        map(rewriteCExp, cexp.body)) : 
    isLetExp(cexp) ? makeLetExp(
        map(rewriteBinding,cexp.bindings),
        map(rewriteCExp, cexp.body)) :
    isLitExp(cexp) ? cexp :            
    isLetStarExp(cexp) ? rewriteCExp(rewriteLetStar(cexp)) :    //applying rewriteCExp on result for handling nested LetStatExp
    cexp; // isError(cexp)    


/*
 * Additional "safe" constructors
 * used for rewriteCExp
 */
const safeMakeLetExp = (bindings: Binding[] | Error, body: Array<CExp | Error>) =>
        isError(bindings) ? bindings :
        hasNoError(body) ? makeLetExp(bindings, body) :
        Error(getErrorMessages(body));

const safeMakeAppExp = (rator: CExp | Error, rands: (CExp|Error)[]): AppExp |Error=>
        isError(rator) ? rator :
        hasNoError(rands) ? makeAppExp(rator, rands) :
        Error(getErrorMessages(rands));
        
const safeMakeIfExp =(test: CExp | Error, then: CExp | Error, alt: CExp | Error): IfExp | Error =>
        isError(test) || isError(then) ||isError(alt) ? Error(getErrorMessages([test, then, alt])) :
        makeIfExp(test, then, alt);

const safeMakeBinding =(v: VarDecl | Error, val: CExp |Error): Binding | Error =>
        isError(v) || isError(val) ? Error(getErrorMessages([v, val])) :
        makeBinding(v, val);

const safeMakeDefineExp = (v: VarDecl, val: CExp |Error): DefineExp | Error =>
        isError(val)? val :
        makeDefineExp(v, val);