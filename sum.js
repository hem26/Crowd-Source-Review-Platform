function sum(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function sumOfNumbers(totalSum){
    for(let i=1; i<=10; i++){
        totalSum+=i;
    }
    return totalSum;
}



module.exports = {
    sum, 
    subtract,
    sumOfNumbers
};