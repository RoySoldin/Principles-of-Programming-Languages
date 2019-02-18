/*
 * From Mozilla Developer Network:
 * The Promise.race(promises) method returns a promise that resolves or rejects
 * as soon as one of the promises in the array resolves or rejects,
 * with the value or reason from that promise.
 */

function race(promises) {
    let resolve, reject;    //resolve and reject are functions!
    let restart = () => {
        reject = Function.prototype;       //clean reject and resolve 
        resolve = Function.prototype;
    }

  const output = new Promise(function(res, rej) {
    resolve = res;      
    reject = rej;
  });

  promises.forEach(function(promise) {
    promise.then(function(res) {
      resolve(res);
      restart();
    });

    promise.catch(function(err) {
      reject(err);
      restart();
    });
  });
  return output;
}

    //          TEST

// const promise1 = new Promise(function(resolve, reject) {
//     setTimeout(resolve, 120, 'one');
// });
 
// const promise2 = new Promise(function(resolve, reject) {
//     setTimeout(resolve, 110, 'two');
// });

// const promise3 = new Promise(function(resolve, reject) {
//     setTimeout(resolve, 99, 'three');
// });
 
// race([promise1, promise2,promise3]).then(function(value) {
//   console.log(value);
  // Both resolve, but promise3 is faster
// });

/*
 * Write a function that takes an arbitrarily
 * nested array and generates the sequence
 * of values from the array.
 * Example: [...flatten([1, [2, [3]], 4, [[5, 6], 7, [[[8]]]]])] => [1, 2, 3, 4, 5, 6, 7, 8]
 */
function* flatten(array) {
    for (let element of array)
        if(isArrayCheck(element))   // if the elemnt is array we call flatten again and deligate who yields
            yield* flatten(element);
        else yield element;
}

let isArrayCheck = (object) => {return Array.isArray(object);}

        //      TEST
//console.log([...flatten([1, [2, [3]], 4, [[5, 6], 7, [[[8]]]]])]); 
/*
 * Given two generators, write a function
 * that generates the interleaved sequence
 * of elements of both generators.
 * Example: given generators for even and odd
 * numbers, take(interleave(evens(), odds()), 8) => [0, 1, 2, 3, 4, 5, 6, 7]
 */
function* interleave(g1, g2) {
    let g1Iter = g1.next();
    let g2Iter = g2.next();
    while(1){
        if(!g1Iter.done){
            yield g1Iter.value;
        }
        if(!g2Iter.done){
            yield g2Iter.value;
        }
        g1Iter=g1.next();
        g2Iter=g2.next();
    }
}

/*
 * Write a function that continuously generates
 * elements of a given array in a cyclic manner.
 * Example: take(cycle([1, 2, 3]), 8) => [1, 2, 3, 1, 2, 3, 1, 2]
 */
function* cycle(array) {
    let loop = array.length;
    for(let i=0;;i++){
        if(i == loop)
            i = 0;
        yield array[i];  
    }  
}

        //      TEST
// console.log(take(cycle([1, 2, 3]), 8));        

/*
 * Write a function that returns
 * all elements from the first array,
 * then all elements from the next array, etc.
 * This function lets us to treat an array of arrays
 * as a single collection.
 * Example: [...chain([['A', 'B'], ['C', 'D']])] => ['A', 'B', 'C', 'D']
 */
function* chain(arrays) {
    for (let array of arrays)
        for (let element of array)
            yield element;
}

        //      TEST
//console.log( [...chain([['A', 'B','E',[1,2,3]], ['C', 'D']])]);

/*
 * In order to make testing your generators easier,
 * the function take takes a generator g and a natural number n
 * and returns an array of the first n elements of g.
 * If g is exhausted before reaching n elements,
 * less than n elements are returned. 
 */
function take(g, n) {
    const result = [];
    for (let i = 0; i < n; i++) {
        const { value, done } = g.next();
        if (done) {
            break;
        }
        result.push(value);
    }
    return result;
}
