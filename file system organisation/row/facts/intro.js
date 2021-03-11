///no name
///top->bottom left -> right
///
console.log("sanyam");
let varable;


///variable define kiya hai isme hmne
varable = "sam";
console.log(varable);
varable = 10;
console.log(varable);
varable = 1.3;
varable = true;
varable = null;
console.log(varable);
let num = 23;
let flag = true;


/////loops
for(let n = 2;n*n<num;n++){
if (num%n==0){
    flag = false;
    break;
}
}
if(flag==true){
    console.log(num,"is prime");
}
else{
    console.log(num,"is not prime");
}
