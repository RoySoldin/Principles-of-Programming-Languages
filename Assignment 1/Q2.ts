import {map} from 'ramda'
import assert = require('assert');

//====================================== Q2.1 BinTree ==================================
interface BinTree {
    root: number;
    left?: BinTree;
    right?: BinTree;
};

interface GBinTree<T> 
{
    root: T;
    left?: GBinTree<T>;
    right?: GBinTree<T>;
};
//-----------------------------------Q.2.1.1 TreePreArray-------------------------------
const TreePreArray: (t:BinTree)=>number[] = (t:BinTree) =>
{
    let array:number[] = [] 
    return TreePreArraHelper(t,array)
}

const TreePreArraHelper: (t:BinTree, array:number[])=>number[] = (t:BinTree,array:number[]) =>
{
    array.push(t.root)
    if(t.left)
        array = TreePreArraHelper(t.left,array)
    if(t.right)
         array = TreePreArraHelper(t.right,array)
    return array
}

//-----------------------------------Q.2.1.2 TreeInArray---------------------------------

const TreeInArray: (t:BinTree)=>number[] = (t:BinTree) =>
{
    let array:number[] = [] 
    return TreeInArraHelper(t,array)
}

const TreeInArraHelper: (t:BinTree, array:number[])=>number[] = (t:BinTree,array:number[]) =>
{
    if(t.left)
        array = TreeInArraHelper(t.left,array)
    array.push(t.root)
    if(t.right)
         array = TreeInArraHelper(t.right,array)
    return array
}


//-----------------------------------Q.2.1.3 TreePostArray-------------------------------

const TreePostArray: (t:BinTree)=>number[] = (t:BinTree) =>
{
    let array:number[] = [] 
    return TreePostArraHelper(t,array)
}

const TreePostArraHelper: (t:BinTree, array:number[])=>number[] = (t:BinTree,array:number[]) =>
{
    if(t.left)
        array = TreePostArraHelper(t.left,array)
    if(t.right)
        array = TreePostArraHelper(t.right,array)    
    array.push(t.root)
    
    return array
}


//-----------------------------------Q.2.1.4 GBinTreePreArray----------------------------
const GBinTreePreArray: (t:GBinTree<any>)=>any[] = (t:GBinTree<any>) =>
{
    let array:any[] = [] 
    return GTreePreArraHelper(t,array)
}

const GTreePreArraHelper: (t:GBinTree<any>, array:any[])=>any[] = (t:GBinTree<any>,array:any[]) =>
{
    array.push(t.root)
    if(t.left)
        array = GTreePreArraHelper(t.left,array)
    if(t.right)
         array = GTreePreArraHelper(t.right,array)
    return array
}


//-----------------------------------Q.2.1.5 GBinTreeInArray-----------------------------
const GBinTreeInArray: (t:GBinTree<any>)=>any[] = (t:GBinTree<any>) =>
{
    let array:any[] = [] 
    return GTreeInArrayHelper(t,array)
}

const GTreeInArrayHelper: (t:GBinTree<any>, array:any[])=>any[] = (t:GBinTree<any>,array:any[]) =>
{
    if(t.left)
        array = GTreeInArrayHelper(t.left,array)
    array.push(t.root)
    if(t.right)
         array = GTreeInArrayHelper(t.right,array)
    return array
}


//-----------------------------------Q.2.1.6 GBinTreePostArray---------------------------
const GBinTreePostArray: (t:GBinTree<any>)=>any[] = (t:GBinTree<any>) =>
{
    let array:any[] = [] 
    return GTreePostArrayHelper(t,array)
}

const GTreePostArrayHelper: (t:BinTree, array:any[])=>any[] = (t:GBinTree<any>,array:any[]) =>
{
    if(t.left)
        array = GTreePostArrayHelper(t.left,array)
    if(t.right)
        array = GTreePostArrayHelper(t.right,array)
    array.push(t.root)
    return array
}

//====================================== Q2.2 Subsets ===================================

//--------------------------------------- Test Functions ---------------------------------------

//-------------------------------------Q.2.2.1 KSubsets----------------------------------

const KSubsets: (inputSet:any[], k:number)=>any[] = (inputSet,k) =>
 {
    var result_set = [], 
        result;
    
    for(var x = 0; x < Math.pow(2, inputSet.length); x++)
    {
        result = [];
        let i:number = inputSet.length - 1; 
            do
                if( (x & (1 << i)) !== 0)
                        result.push(inputSet[i]);   
            while(i--);
        if(result.length === k)
            result_set.push(result); 
    }
    return result_set; 
}

//-------------------------------------Q.2.2.1 AllSubsets--------------------------------
const AllSubsets: (inputSet:any[])=>any[] = (inputSet) =>
 {
    var result_set = [], 
        result;
    
    for(var x = 0; x < Math.pow(2, inputSet.length); x++)
    {
        result = [];
        let i:number = inputSet.length - 1; 
            do
                if( (x & (1 << i)) !== 0)
                        result.push(inputSet[i]);   
            while(i--);
        result_set.push(result); 
    }
    return result_set; 
}

// console.log(AllSubsets([1,2,3]))
//====================================== Q2.3 Flatmap  ==================================
//-----------------------------Q.2.3.1 Flatmap Definition--------------------------------
const flatmap: ( f:(A:any) => any , originalArr:any[] )=>any[]  = (f,originalArr)=> 
{
    let res:any[] = []

    for(let i:number=0 ; i<originalArr.length ; i++)
        res = res.concat( f(originalArr[i]))

    return res
}
//-----------------------------Q.2.3.2 Using Flatmap-------------------------------------
type resultType =
{
    id:number,
    title:string,
    boxart:string
}

type bookmark =
{
    id:number,
    time:number
}

type boxart =
{
    width:number,
    height:number,
    url:string
}

type movie =
{
    id: number,
    title: string,
    boxarts:boxart[],
    url:string,
    rating: number,
    bookmark: bookmark[],
}

type movies =
{
    name:string,
    videos:movie[]
}

const getBoxarts: (movies:movies[])=>resultType[]  = (movieLists)=>
{
    let movies:movie[] = flatmap(getMovieVideos ,movieLists)

    let output:resultType[] = movies.map(movieToResult)

    return output
} 
const movieToResult: (movie:movie)=>resultType = (movie)=>
{    
    let boxarts:boxart[] = movie.boxarts.filter(movieFilter)
    let result:resultType = {id:movie.id, title:movie.title, boxart:boxarts[0].url}

    return result
}

const movieFilter: (boxarts:boxart)=>boolean = (boxart)=>
{
    return boxart.width === 150 && boxart.height === 200
}

const getMovieVideos: (movieList:movies)=>movie[] = (movieLists)=>
{
    return movieLists.videos
}

// ########################            TESTS           ##############################

//------------------------------------ BinTreeTests ---------------------------------

    //BinTree1
    let t1:BinTree =  
    {root:7, 
         left: {root:3, 
             left:{ root:1}, 
             right:{root:2}
         },
         right: {root:6,
             left:{root:4},
             right:{root:5}
         }
     }
     //BinTree2
     let t2:BinTree = 
     {root:1, 
         left: 
             {root:2, 
             left:
                 { root:4,
                 left:{root:8},
                 right:{root:9}
             }, 
             right:
                 {root:5,
                 left:
                     {root:10}
             }
         },
         right: {root:3,
             left:{root:6},
             right:{root:7}
                 }
             }
     //Bintree 3
     let t3:BinTree = 
     {root:1,
         left:{ root:2,
             left:{root:3,
                 left: {root:4,
                     left:{root:5}}
             }
         },
     right:{root:6}
     }
 
 let t1Results ={
     inOrder:[ 1, 3, 2, 7, 4, 6, 5 ],
     preOrder:[ 7, 3, 1, 2, 6, 4, 5 ],
     postOrder:[ 1, 2, 3, 4, 5, 6, 7 ]
 }
 
 let t2Results ={
     inOrder: [ 8, 4, 9, 2, 10, 5, 1, 6, 3, 7 ],
     preOrder:[ 1, 2, 4, 8, 9, 5, 10, 3, 6, 7 ],
     postOrder: [ 8, 9, 4, 10, 5, 2, 6, 7, 3, 1 ]
 }
 
 let t3Results ={
     inOrder: [ 5, 4, 3, 2, 1, 6 ],
     preOrder:[ 1, 2, 3, 4, 5, 6 ],
     postOrder: [ 5, 4, 3, 2, 6, 1 ]
 }
 
 assert.deepStrictEqual(TreeInArray(t1), t1Results.inOrder)
 assert.deepStrictEqual(TreePreArray(t1), t1Results.preOrder)
 assert.deepStrictEqual(TreePostArray(t1), t1Results.postOrder)
 
 assert.deepStrictEqual(TreeInArray(t2), t2Results.inOrder)
 assert.deepStrictEqual(TreePreArray(t2), t2Results.preOrder)
 assert.deepStrictEqual(TreePostArray(t2), t2Results.postOrder)
 
 assert.deepStrictEqual(TreeInArray(t3), t3Results.inOrder)
 assert.deepStrictEqual(TreePreArray(t3), t3Results.preOrder)
 assert.deepStrictEqual(TreePostArray(t3), t3Results.postOrder)

//-----------------------------------GBintree Test-------------------------------
    //GBinTree1
    let gt1:GBinTree<string> = 
    {root:"g", 
        left: {root:"c", 
            left:{ root:"a"}, 
            right:{root:"b"}
        },
        right: {root:"f",
            left:{root:"d"},
            right:{root:"e"}
        }
    }
    //BinTree2
    let gt2:GBinTree<any> = 
    {root:"a", 
        left: {root:"b", 
            left:
                { root:"d",
                left:{root:"h"},
                right:{root:"i"}
            }, 
            right:
                {root:"e",
                left:
                    {root:"j"}
            }
        },
        right: {root:"c",
            left:{root:"f"},
            right:{root:"g"}
                }
            }
    //Bintree 3
    let gt3:GBinTree<boolean> = 
    {root:false,
        left:{ root:true,
            left:{root:false,
                left: {root:true,
                    left:{root:false}}
            }
        },
    right:{root:true}
    }

    let gt1Results ={
        inOrder:[ "a", "c", "b", "g", "d", "f", "e" ],
        preOrder:[ "g", "c", "a", "b", "f", "d", "e" ],
        postOrder: [ "a", "b", "c", "d", "e", "f", "g" ]
    }
    
    let gt2Results ={
        inOrder: [ "h", "d", "i", "b", "j", "e", "a", "f", "c", "g"],
        preOrder: [ "a", "b", "d", "h", "i", "e", "j", "c", "f", "g"],
        postOrder: [ "h", "i", "d", "j", "e", "b", "f", "g", "c", "a" ]
    }
    
    let gt3Results ={
        inOrder: [ false, true, false, true, false, true ],
        preOrder:[ false, true, false, true, false, true ],
        postOrder: [ false, true, false, true, true, false ]
    }

    assert.deepStrictEqual(GBinTreeInArray(gt1), gt1Results.inOrder)
    assert.deepStrictEqual(GBinTreePreArray(gt1), gt1Results.preOrder)
    assert.deepStrictEqual(GBinTreePostArray(gt1), gt1Results.postOrder)
    
    assert.deepStrictEqual(GBinTreeInArray(gt2), gt2Results.inOrder)
    assert.deepStrictEqual(GBinTreePreArray(gt2), gt2Results.preOrder)
    assert.deepStrictEqual(GBinTreePostArray(gt2), gt2Results.postOrder)
    
    assert.deepStrictEqual(GBinTreeInArray(gt3), gt3Results.inOrder)
    assert.deepStrictEqual(GBinTreePreArray(gt3), gt3Results.preOrder)
    assert.deepStrictEqual(GBinTreePostArray(gt3), gt3Results.postOrder)

//-----------------------------------KSubsets Test-------------------------------

let group1:number[] = [1,2,3]

let group1subsets3:number[][] = [[ 3, 2, 1 ]]
let group1subsets2:number[][] = [[2,1],[3,1],[3,2]]
let group1subsets1:number[][] = [[1],[2],[3]]

let group2:number[] = [1,2,3,4,5]

let group2subsets4:number[][] = 
    [ [ 4, 3, 2, 1 ],
    [ 5, 3, 2, 1 ],
    [ 5, 4, 2, 1 ],
    [ 5, 4, 3, 1 ],
    [ 5, 4, 3, 2 ] ]
let group2subsets1:number[][] = [[1],[2],[3],[4],[5]]
let group2subsets0:number[][] = [[]]

let group3:number[] = [1,2,3,4]

let group3subsets2:number[][] =  [ [ 2, 1 ], [ 3, 1 ], [ 3, 2 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ] ]

assert.deepStrictEqual(KSubsets(group1,2), group1subsets2)
assert.deepStrictEqual(KSubsets(group1,1), group1subsets1)
assert.deepStrictEqual(KSubsets(group1,3), group1subsets3)

assert.deepStrictEqual(KSubsets(group2,0), group2subsets0)
assert.deepStrictEqual(KSubsets(group2,1), group2subsets1)
assert.deepStrictEqual(KSubsets(group2,4), group2subsets4)

assert.deepStrictEqual(KSubsets(group3,2), group3subsets2)


//-----------------------------------AllSubsets Test-------------------------------

let group1allSubsets:number[][] =  [ [], [ 1 ], [ 2 ], [ 2, 1 ], [ 3 ], [ 3, 1 ], [ 3, 2 ], [ 3, 2, 1 ] ]

let group3allSubsets:number[][] =
[ [],[ 1 ],[ 2 ],[ 2, 1 ],[ 3 ],[ 3, 1 ],
[ 3, 2 ],[ 3, 2, 1 ],[ 4 ],[ 4, 1 ],
[ 4, 2 ],[ 4, 2, 1 ],[ 4, 3 ],[ 4, 3, 1 ],
[ 4, 3, 2 ],[ 4, 3, 2, 1 ] ]


let group4:number[] = [1]    

let group4allSubsets:number[][] = [[],[1]]

assert.deepStrictEqual(AllSubsets(group1), group1allSubsets)

assert.deepStrictEqual(AllSubsets(group3), group3allSubsets)

assert.deepStrictEqual(AllSubsets(group4), group4allSubsets)

//-----------------------------------Flatmap Test-------------------------------

let flatTest1:number[][][] = [[[1,2], [3,4]], [[5,6], [7,8]]]
let flat1Result:number[] =  [1,2,5,6]
let flat1Result2:number[] =  [1,5]

let flatTest2:string[][]= [ ["a","b"], ["c","d"], ["e","f"] ]
let flat2Result:string[] = ["a","b","c","d","e","f"]

assert.deepStrictEqual(flatmap((x)=>x,flatTest2 ),flat2Result )

assert.deepStrictEqual(flatmap((x)=>x[0], flatTest1), flat1Result)

assert.deepStrictEqual(flatmap((x)=>x[0][0], flatTest1), flat1Result2)


//-----------------------------------Using Flatmap Test----------------------------

// Movies Lists :

// Movie list 1

let movieList1 = [
    {
        name: "Instant Queue",
        videos : [
            {
                "id": 70111470,
                "title": "Die Hard",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 654356453,
                "title": "Bad Boys",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    },
    {
        name: "New Releases",
        videos: [
            {
                "id": 65432445,
                "title": "The Chamber",
                "boxarts": [
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 675465,
                "title": "Fracture",
                "boxarts": [
                    { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                    { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                    { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    }
]

// Movie List 2

let movieList2 = 
[
    {
        name: "Category1",
        videos : [
            {
                "id": 1,
                "title": "Harry Potter and the Test that Doesn't End (but works)",
                "boxarts": [
                    { width: 150, height: 200, url: "http://img1.jpg" },
                    { width: 200, height: 200, url: "http://img2.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 2,
                "title": "The Assmeblers",
                "boxarts": [
                    { width: 200, height: 200, url: "http://img3.jpg" },
                    { width: 150, height: 200, url: "http://img4.jpg" }

                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    },
    {
        name: "Category2",
        videos: [
            {
                "id": 3,
                "title": "Long time no C",
                "boxarts": [
                    { width: 150, height: 200, url: "http://img5.jpg" },
                    { width: 200, height: 200, url: "http://img6.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 4,
                "title": "Fracture in my motivation",
                "boxarts": [
                    { width: 200, height: 200, url: "http://img7.jpg" },
                    { width: 150, height: 200, url: "http://img8.jpg" },
                    { width: 300, height: 200, url: "http://img9.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    },
    {
        name: "Category3",
        videos: [
            {
                "id": 5,
                "title": "The Empty Fridge",
                "boxarts": [
                    { width: 150, height: 200, url: "http://img10.jpg" },
                    { width: 200, height: 200, url: "http://img12.jpg"},
                    { width: 300, height: 200, url: "http://img13.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 6,
                "title": "Factor",
                "boxarts": [
                    { width: 200, height: 200, url:"http://img11.jpg" },
                    { width: 150, height: 200, url:"http://img12.jpg"},
                    { width: 300, height: 200, url: "http://img13.jpg" },
                    { width: 400, height: 200, url: "http://img13.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    }
]

// Movie List 3

let movieList3 = 
[
    {
        name: "Empty Category",
        videos : []
    },
    {
        name: "Category2",
        videos: [
            {
                "id": 43,
                "title": "Daydreams about Thailand",
                "boxarts": [
                    { width: 150, height: 200, url: "http://img151.jpg" },
                    { width: 150, height: 300, url: "http://img162.jpg" },
                    { width: 600, height: 200, url: "http://img163.jpg" },
                    { width: 900, height: 200, url: "http://img164.jpg" },
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 24,
                "title": "Eran, make some coffee bro",
                "boxarts": [
                    { width: 200, height: 200, url: "http://img170.jpg" },
                    { width: 150, height: 200, url: "http://img180.jpg" },
                    { width: 300, height: 200, url: "http://img190.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    },
    {
        name: "Category3",
        videos: [
            {
                "id": 15,
                "title": "The Empty Fridge",
                "boxarts": [
                    { width: 150, height: 200, url: "http://img110.jpg" },
                    { width: 200, height: 200, url: "http://img112.jpg"},
                    { width: 300, height: 200, url: "http://img113.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 16,
                "title": "",
                "boxarts": [
                    { width: 200, height: 200, url:"http://img111.jpg" },
                    { width: 150, height: 200, url:"http://img1122.jpg"},
                    { width: 300, height: 200, url: "http://img123.jpg" },
                    { width: 400, height: 200, url: "http://img153.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            },
            {
                "id": 7,
                "title": "Harry Potter and the Lost Vacation",
                "boxarts": [
                    { width: 150, height: 150, url:"http://img1190.jpg" },
                    { width: 150, height: 200, url:"http://img1902.jpg"},
                    { width: 300, height: 200, url: "http://img9013.jpg" },
                    { width: 400, height: 200, url: "http://img00913.jpg" }
                ],
                "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id: 432534, time: 65876586 }]
            }
        ]
    }
]

let movieLis1output = 
[
    { id: 70111470,
      title: 'Die Hard',
      boxart: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg' },
    { id: 654356453,
      title: 'Bad Boys',
      boxart: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg' },
    { id: 65432445,
      title: 'The Chamber',
      boxart: 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg' },
    { id: 675465,
      title: 'Fracture',
      boxart: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg' } 
  ]


  let movieLis2output =
  [ 
    { id: 1,
    title: 'Harry Potter and the Test that Doesn\'t End (but works)',
    boxart: 'http://img1.jpg' },
    { id: 2, title: 'The Assmeblers', boxart: 'http://img4.jpg' },
    { id: 3, title: 'Long time no C', boxart: 'http://img5.jpg' },
    { id: 4,
    title: 'Fracture in my motivation',
    boxart: 'http://img8.jpg' },
    { id: 5, title: 'The Empty Fridge', boxart: 'http://img10.jpg' },
    { id: 6, title: 'Factor', boxart: 'http://img12.jpg' } 
]


let movieLis3output =
[ 
    { id: 43,
      title: 'Daydreams about Thailand',
      boxart: 'http://img151.jpg' },
    { id: 24,
      title: 'Eran, make some coffee bro',
      boxart: 'http://img180.jpg' },
    { id: 15,
      title: 'The Empty Fridge',
      boxart: 'http://img110.jpg' },
    { id: 16, title: '', boxart: 'http://img1122.jpg' },
    { id: 7,
      title: 'Harry Potter and the Lost Vacation',
      boxart: 'http://img1902.jpg' } 
  ]

  assert.deepStrictEqual(getBoxarts(movieList1), movieLis1output)
  assert.deepStrictEqual(getBoxarts(movieList2), movieLis2output)
  assert.deepStrictEqual(getBoxarts(movieList3), movieLis3output)