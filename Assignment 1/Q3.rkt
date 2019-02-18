#lang racket
;-----------------------------------------------------------------------------
; Signature: count-syllables (lst)
; Type: [List(char) -> number]
; Purpose: count syllables of lst
; Pre-conditions: true
; Tests:  (count-syllables '(s o a r i n g)) => 2

(define (count-syllables lst)
  (cond
    ((null? lst) 0)
    ((member (car lst) '(a e i o u))
     (+ 1 (skip-vowels (cdr lst))))
    (else
     (count-syllables (cdr lst)))))

(define (skip-vowels lst)
  (cond
    ((null? lst)
     (count-syllables '()))
    ((member (car lst) '(a e i o u))
     (skip-vowels (cdr lst)))
    (else
     (count-syllables lst))))
;-----------------------------------------------------------------------------
; Signature: sorted? (lst, comp)
; Type: [List(number){>,<} -> boolean]
; Purpose: check if lst is sorted by comp order
; Pre-conditions: true
; Tests:  (sorted? '(9 8 7 5 6) < ) => #f
(define (sorted? lst comp)
   (cond ((null? lst) #t)
         ((eq? (length lst) 1) #t)
         ((eq? comp >)(big lst))
         ((eq? comp <)(small lst))
      (else #f)))

(define (small lst)
  (if (< (car lst) (car (cdr lst)))
      (sorted? (cdr lst) <)
      #f
     ))

(define (big lst)
  (if (> (car lst) (car (cdr lst)))
      (sorted? (cdr lst) >)
      #f
     ))

;-----------------------------------------------------------------------------
; Signature: merge (lst1 lst2)
; Type: [List(number) X List(number)-> List(number)]
; Purpose: merge lst1 with lst2
; Pre-conditions: lst1 i sorted && lst2 is sorted
; Tests:  (merge '(1 2 3 6) '(4 5 6 7 8) ) => '(1 2 3 4 5 6 7 8)
(define (merge lst1 lst2)
  (cond ((null? lst1) lst2)
        ((null? lst2) lst1)
        ((>= (car lst1) (car lst2))
         (cons (car lst2) (merge lst1 (cdr lst2))))
        (else
         (cons (car lst1) (merge (cdr lst1) lst2)))))
;-----------------------------------------------------------------------------
; Signature: remove-adjacent-duplicates (lst)
; Type: [List(number) -> List(number)]
; Purpose: remove adjacent duplicates from lst
; Pre-conditions: true
; Tests:  (remove-adjacent-duplicates '(1 2 2 3 3 4 1)) => '(1 2 3 4)
(define (remove-adjacent-duplicates lst)
  (cond ((null? lst)
         '())
        ((member (car lst) (cdr lst))
         (remove-adjacent-duplicates (cdr lst)))
        (else
         (cons (car lst) (remove-adjacent-duplicates (cdr lst))))))
;-----------------------------------------------------------------------------
;-------------------------------------EXAMPLES--------------------------------
;-----------------------------------------------------------------------------

;-----------------------------------------------------------------------------
(count-syllables '(s a g i v))
(count-syllables '(s a u g i v))
(count-syllables '(s a u g i o v o))
(count-syllables '(s a u g i o v o u i))
(count-syllables '( a u i o o u i))
;-----------------------------------------------------------------------------

;-----------------------------------------------------------------------------
(sorted? '(9 8 7 5 4) < )
(sorted? '(9 8 7 5 4) > )

(sorted? '(1 3 5 6 7 8) > )
(sorted? '(1 3 5 6 7 8) > )

(sorted? '(1 3 5 6 7 8 3) > )
(sorted? '(1 3 5 6 7 8 3) < )

(sorted? '() < )
(sorted? '(1) < )
;-----------------------------------------------------------------------------

;-----------------------------------------------------------------------------
(remove-adjacent-duplicates '(1 2 2 3 4 5 3))
(remove-adjacent-duplicates '(3 3 3 3 3))
(remove-adjacent-duplicates '(1 2 3 1 2 3))
(remove-adjacent-duplicates '(1))
(remove-adjacent-duplicates '())
(remove-adjacent-duplicates(merge '(1 2 3 6) '(4 5 6 7 8) ))
;-----------------------------------------------------------------------------

;-----------------------------------------------------------------------------
;-----------------------------------------------------------------------------
