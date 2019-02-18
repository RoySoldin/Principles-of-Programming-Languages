#lang racket
(provide (all-defined-out))
; Signature: shift-left(ls)
; Type: [List(T) -> List(T)]
; Purpose: takes a list as an argument and evaluates the list that is its' shift-left by one place.
; Pre-conditions: ls is a list i.e (list? ls) ==> #t
(define shift-left
  (lambda (ls)
    (append (cdr ls) (cons(car ls) '())
           )))

; Signature: shift-k-left(ls)
; Type: [List(T) -> List(T)]
; Purpose: takes a list and a number k >= 0 and evaluates the list that is the given list's shift-left k times.
; Pre-conditions: ls is a list and k is non negative i.e (and (list? ls) (>= k 0)) ==> #t
(define shift-k-left
  (lambda (ls k)
    (if (= k 0)
        ls
    (shift-k-left (shift-left ls) (- k 1))
    )))

; Signature: shift-right(ls)
; Type: [List(T) -> List(T)]
; Purpose: takes a list and evaluates the list that is the given list's shift-right one time.
; Pre-conditions: ls is a list i.e (list? ls) ==> #t
(define shift-right
  (lambda (ls)
    (append
     (cons(last ls) '())
     (take ls (- (length ls) 1)))
           ))

; Signature: combine(ls1, ls2)
; Type: [List(T)*List -> List(T)]
; Purpose: takes two lists and combines them in an alternating manner starting from the first list.
;          If one of the lists is empty, then the result of combine is the other list.
; Pre-conditions: ls1 and ls2 are lists i.e (and (list? ls1)(list? ls2)) ==> #t
(define combine
  (lambda (ls1 ls2)
   (combine-helper ls1 ls2 '())
    ))

(define combine-helper
  (lambda (ls1 ls2 res)
    (if (= (length ls1) 0)
        (append res ls2)
        (combine-helper ls2 (cdr ls1) (append res (cons (car ls1) '())))
        )
    ))
; Signature: sum-tree(tree)
; Type: [List(List | Boolean | Number) -> Number]
; Purpose: receives a tree whose nodes' data values are all numbers >= 0 and returns the sum of numbers present in all tree nodes.
; Pre-conditions: tree is a list i.e (list? tree) ==> #t
(define sum-tree
  (lambda (tree)
    (if(list? tree)
       (if(empty? tree)
          0
       (+ (sum-tree(car tree)) (sum-tree(cdr tree))))
       tree
       )
    )
 )
; Signature: inverse-tree(tree)
; Type: [List(List | Boolean | Number) -> List(List | Boolean | Number)]
; Purpose: receives a tree whose nodes data values are numbers and booleans and returns the equivalent
;          tree whose nodes satisfy the following:
;               *If the equivalent node of the original tree is a number, then the resulting
;                tree's node is -1· that node value
;               *If the equivalent node of the original tree is a boolean, then the resulting
;                tree’s node is the logical not of that node value
; Pre-conditions: tree is a list i.e (list? tree) ==> #t
(define inverse-tree
  (lambda (tree)
    (if (list? tree)
        (if (empty? tree)
            tree
            (map (lambda(subtree)(inverse-tree subtree)) tree))
        (if (boolean? tree)
            (not tree)
            (* -1 tree))
        )))

    
   