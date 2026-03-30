
//task 1


const obj1 = {prop : 1}
const obj2 = obj1      //{prop : 1} same reference in memory
const obj3 = {...obj1}
obj1.prop = 2

console.log(obj1) 
console.log(obj2) 
console.log(obj3) 

//task 2

function func(){
    var par1 = []
    for (var i = 0; i < 10; i++){
        par1[i] = function(){
            return i
        }
    }
    return par1
}

var par1 =func()
par1[5]()

//task 3
let instabugObject = {
    bug : "instabug",
    func : function(){
        let self = this
        console.log(this.bug)
        console.log(self.bug)
        (function(){
            console.log(this.bug)
            console.log(self.bug)
        }
        )()
    }
}
instabugObject.func()


//task 4 event loop how works
(function(){
    console.log(1);
    setTimeout(function(){console.log(2)}, 1000);
    setTimeout(function(){console.log(3)}, 0);
    console.log(4);
})();

//specifity rules for css inline style > id > class > element

//task 5
let perfTechniques = ["web workers", "code splitting"];
perfTechniques[100] = 'service workers';  //important js will extend the array to 100 length but the elements between 2 and 99 will be empty
console.log(perfTechniques.length); //101

//what is the primary purpose of code spiliting in modern javascript applications?
//answer: to divide the code into smaller chunks that can be loaded on demand, improving the initial load time and overall performance of the application.


//task 6
async function fetchData() {
    return await Promise.resolve("data");
}
const data = fetchData();
console.log(data); //output: Promise { <pending> }
fetchData().then(result => console.log(result)); //output: "data"


//--------------------------------------------------------------------------------------------
//task 7
//counter.js file inside it this code 
let counter = 0;
export default counter;

//main.js
import counter from './counter.js';
counter++;
console.log(counter); //output: Error becouse counter is read-only

//------------------------------------------------------------------------------------------------

//task 8 => what does setinterval method return in the browser besides the noraml logging for 'Hi'?

setInterval(() => console.log('Hi'), 1000); //it returns a unique identifier (interval ID) that can be used to clear the interval later using clearInterval() method.

//-------------------------------------------------------------------------------------------------------


//task 8
//primitive checking by value and object checking by reference in memory
function guessMyIdentity(data) {
    if(data === {name : 'Ahmed' , age : 25}){
        console.log("object 1")
    }
    else if(data == {name : 'Ahmed' , age : 25}){
        console.log("object 2")
    }
    else{
        console.log("object 3")
    }
}

guessMyIdentity({name : 'Ahmed' , age : 25}) 



//task 9
(function(){
    var savings = [2,4 ,16 , 28 , 1 ,32 , 8 , 10]
    savings.sort() //sort convert value to string and sort by unicode code point value so the result will be [1, 10, 16, 2, 28, 32, 4, 8] 
    console.log(savings) 
})()

//task 10
const obj = {1: 'one', 2: 'two', 3: 'three'};
const set = new Set([1, 2, 3]);
//under the hood , oject store keys as string if the key is number it will be converted to string
obj.hasOwnProperty('1') //true
obj.hasOwnProperty(1) //true because 1 will be converted to '1' and it exist in the object keys

set.has('1') //false because set store values as they are without converting them to string so '1' is not exist in the set but 1 is exist
set.has(2) //true



//what is the javascript compiler babel used for?
//answer: it is a compiler that converts modern javascript code to older javascript code that is compatible with older browsers.


//task 11 => which of these values ar falsy values in javascript?
0; //fasly
new Number(0); //not falsy because it is an object that contain a 0 value but the object itself is truthy 
('')  //falsy   
(' ') //not falsy because it contain a space character
new Boolean(false); //not falsy because it is an object that contain a false value but the object itself is truthy
undefined //falsy
null //falsy
NaN //falsy

//task 12 
(() => {
    let x , y;
    try{
        throw new Error("An error occurred");
    }
    catch(x){
        (x = 1) , (y = 2)
        console.log(x) //1 because x in catch block is a new variable that is only exist in the catch block and it is assigned to 1
    }
    console.log(x) //undefined
    console.log(y) //2

})()

//task 13 =>revision it
[[0,1] , [2,3]].reduce((acc , val) => {return acc.concat(acc)},[1,2]) 

//task 14
let auth = {
    username : "admin",
    token : "z2z21z",
    getUserId(){
        return this.username + this.token
    }
}
let stoleUserId = auth.getUserId;
console.log(auth.getUserId()) //adminz2z21z
console.log(stoleUserId()) //undefined because this in stoleUserId function refer to the global object window and it doesn't have username property but it has token property so it return undefinedz2z21z

//task 15

const fruit = ['apple', 'banana', 'cherry'];
if(fruit.indexOf('apple')){ //false because indexOf return 0 for 'apple' and 0 is falsy value in javascript
    console.log('Found it!');
}
else{
    console.log('Not found!');
}