/* eslint-disable no-unused-vars */
function findLargestOneSetIndices(input) {
    
    let rowIndices = [];
    let colIndices = [];

     for(let i = 0; i< input.length; i++){
        for(let j = 0; j < input[i].length; j++){
            if(input[i][j] === 1 && (input[i-1] == 1 && input[j-1] == 1) && (input[i+1] == 1 && input[j+1] ==1)){
                rowIndices.push(i);
                colIndices.push(j);
            }
        }
    }

    

    console.log("Row Indices: ", rowIndices);
    console.log("Column Indices: ", colIndices);
    return [rowIndices, colIndices];
}

let x = [
    [1,0,1,1,0],
    [1,1,1,1,1],
    [0,1,1,1,1],
    [1,1,1,1,0]
];

// []

