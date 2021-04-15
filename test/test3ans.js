////////////////ques 1 
// ans 2 
///////ques 2 

// let p = new Promise(function (resolve, reject) {
//     reject(new Error("some error"));
//     setTimeout(function(){
//     reject(new Error("some error"));
//     },1000)
//     reject(new Error("some error"));
//    });
//    p.then(null, function (err) {
//     console.log(1);
//     console.log(err);
//    }).catch(function (err) {
//     console.log(2);
//     console.log(err);
//    });

// ans 3

// ques 3
// let p = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//     reject(new Error("some value"));
//     }, 2000);
//     resolve("some error");
//     setTimeout(function () {
//     reject(new Error("some value"));
//     }, 2000);
//     resolve("some error");
//     setTimeout(function () {
//     reject(new Error("some value"));
//     }, 2000);
//    });
//    p.then(null, function (err) {
//     console.log(1);
//     console.log(err);
//    });
//    p.catch(function (err) {
//     console.log(2);
//     console.log(err);
//    });
//    p.finally(function () {
//     console.log(1);
//    })
//    p.finally(function () {
//     console.log(2);
//    }).then(function (val) {
//     console.log(val);
//    })
//    p.then(
//     function (val) {
//     console.log(val);
//     },
//     function (err) {
//     console.log(err);
//     }
//    );

// ans 2

// ques 4
// function f(x) {
//     return x*x;
//    }
//    f.description = "This function returns the square"
//    let arr = [1, 2, 3, 4, 5]
//    console.log(arr.length);
//    arr.length = 6
//    arr.pop()
//    console.log(arr.length);
//    console.log(f);
//    console.log(f());
//    console.log(f());

// ans 1
// ques 5
// function cloneObject(obj) {
//     var clone = {};
//     for(var i in obj) {
//         if(typeof(obj[i])=="object" && obj[i] != null)
//             clone[i] = cloneObject(obj[i]);
//         else
//             clone[i] = obj[i];
//     }
//     return clone;
// }

// ques 6
// console.log(1);
// setTimeout(function () {
//  console.log(3);
// });
// console.log(4);
// setTimeout(function () {
//  console.log(2);
// });
// Promise.resolve().then(function () {
//  console.log(5);
// });
// console.log(6);   
// ans 1

// ques 7
// setTimeout(function () {
//     console.log(4);
//    });
//    setTimeout(function () {
//     console.log(5);
//    });
//    let p = new Promise(function (resolve, reject) {
//     resolve();
//    });
//    console.log(1);
//    p.then(function () {
//     console.log(2);
//    });
//    p.then(function () {
//     console.log(3);
//    });
//    setTimeout(function () {
//     console.log(6);
//    });
   



// ques 8
// try {
//     let a = null;
//     b = a;
//     delete a;
//     b = undefined;
//     console.log(a);
//     console.log(b);
//     console.log(c);
//    } catch (err) {
//     console.log(err.message);
//    }
//    ans 2 


// ques 9 
// console.log(div(10,3));
// function div(num1,num2){
//     try{
//         if(num1%2==0&&num1%num2==0){
//             return num1/num2;
//         }else{
//            return "error: incompatible types"
//         }
//     }catch(err){
//         return console.log(err);
//     }
// }