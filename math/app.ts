function findMean(data: number[]) {
  return data.reduce((a, b) => a + b, 0) / data.length;
}

function findMedian(data: number[]) {
  data = data.sort((a, b) => a - b);
  const half = data.length / 2;
  if (data.length % 2) {
    return data[half - 0.5];
  }
  return findMean([data[half - 1], data[half]]);
}

function findMode(data: number[]) {
  let occurences: { [num: string]: number } = {};
  data.forEach((num) => {
    if (num in occurences) {
      occurences[num] += 1;
    } else {
      occurences[num] = 1;
    }
  });
  let max = 0;
  let maxKey: string[] = [];
  for (let num in occurences) {
    if (occurences[num] > max) {
      max = occurences[num];
      maxKey = [num];
    } else if (occurences[num] === max) {
      maxKey.push(num);
    }
  }
  if (maxKey.length === data.length) {
    return "no mode";
  }
  return maxKey.join(", ");
}

function findVariance(data: number[]) {
  const mean = findMean(data);
  let sigma = 0;
  for (let i = 0; i < data.length; i++) {
    let x = data[i];
    sigma += (x - mean) ** 2;
  }
  return sigma / data.length;
}

function findStandardDeviation(data: number[]) {
  const variance = findVariance(data);
  return Math.sqrt(variance);
}

function findRange(data: number[]) {
  let max = Math.max(...data);
  let min = Math.min(...data);
  return max - min;
}

function findQ1(data: number[]) {
  data = data.sort((a, b) => a - b);
  const half = data.length / 2;
  data = data.slice(0, half); // since the second parameter is exclusive, the modulo if statement is not needed
  let median = findMedian(data);
  return median;
}

function findQ3(data: number[]) {
  data = data.sort((a, b) => a - b);
  const half = data.length / 2;
  if (data.length % 2) {
    data = data.slice(half + 0.5);
  } else {
    data = data.slice(half);
  }
  let median = findMedian(data);
  return median;
}

function findIQR(data: number[]) {
  let q1 = findQ1(data);
  let q3 = findQ3(data);
  return q3 - q1;
}

function addMatrices(matrix: number[][], ...rest: number[][][]) {
  let nRows = matrix.length;
  let nCols = nRows > 0 ? matrix[0].length : 0;

  let newMatrix: number[][] = new Array(nRows);

  // Assign original matrix values to the new matrix
  for (let r = 0; r < nRows; r++) {
    if (matrix[r].length !== nCols) {
      return "Error: the number of columns in the first matrix is inconsistent";
    }
    newMatrix[r] = new Array(nCols);
    for (let c = 0; c < nCols; c++) {
      newMatrix[r][c] = matrix[r][c];
    }
  }

  // Add the other matrices to the new matrix
  for (let k = 0; k < rest.length; k++) {
    if (rest[k].length !== nRows) {
      return `Error: matrix ${
        k + 1
      } contains a different number of rows than the first matrix`;
    }
    for (let r = 0; r < nRows; r++) {
      if (rest[k][r].length !== nCols) {
        return `Error: row ${r + 1} of matrix ${
          k + 1
        } contains a different number of columns than the first matrix`;
      }
      for (let c = 0; c < nCols; c++) {
        newMatrix[r][c] += rest[k][r][c];
      }
    }
  }

  return newMatrix;
}

function multiplyMatrix(matrix: number[][], multiplier: number | number[][]) {
  if (typeof multiplier === "number") {
    let nRows = matrix.length;
    let nCols = nRows > 0 ? matrix[0].length : 0;

    if (nCols === 0) {
      return "Error: no data in the matrix";
    }

    let newMatrix: number[][] = new Array(nRows);

    // Assign original matrix values to the new matrix
    for (let r = 0; r < nRows; r++) {
      if (matrix[r].length !== nCols) {
        return "Error: the number of columns in the matrix is inconsistent";
      }
      newMatrix[r] = new Array(nCols);
      for (let c = 0; c < nCols; c++) {
        newMatrix[r][c] = matrix[r][c];
      }
    }

    // Multiply the matrix times the number
    for (let r = 0; r < nRows; r++) {
      for (let c = 0; c < nCols; c++) {
        newMatrix[r][c] *= multiplier;
      }
    }
    return newMatrix;
  } else if (Array.isArray(multiplier[0])) {
    let nRowsMatrix1 = matrix.length;
    let nColsMatrix1 = nRowsMatrix1 > 0 ? matrix[0].length : 0;

    if (nColsMatrix1 === 0) {
      return "Error: no data in the first matrix";
    }

    let nRowsMatrix2 = multiplier.length;
    let nColsMatrix2 = nRowsMatrix2 > 0 ? multiplier[0].length : 0;

    if (nColsMatrix2 === 0) {
      return "Error: no data in the second matrix";
    }

    for (let r = 0; r < nRowsMatrix1; r++) {
      if (matrix[r].length !== nColsMatrix1) {
        return "Error: the number of columns in the first matrix is inconsistent";
      }
    }

    for (let r = 0; r < nRowsMatrix2; r++) {
      if (multiplier[r].length !== nColsMatrix2) {
        return "Error: the number of columns in the second matrix is inconsistent";
      }
    }

    if (nColsMatrix1 !== nRowsMatrix2) {
      return "Error: the dimensions of the given matrices are not compatible for multiplication";
    }

    let nRowsNewMatrix = nRowsMatrix1;
    let nColsNewMatrix = nColsMatrix2;

    let newMatrix: number[][] = new Array(nRowsNewMatrix);

    for (let r = 0; r < nRowsNewMatrix; r++) {
      newMatrix[r] = new Array(nColsNewMatrix);
    }

    for (let x = 0; x < nRowsMatrix1; x++) {
      for (let y = 0; y < nColsMatrix2; y++) {
        for (let z = 0; z < nRowsMatrix2; z++) {
          if (newMatrix[x][y] === undefined) {
            newMatrix[x][y] = matrix[x][z] * multiplier[z][y];
          } else {
            newMatrix[x][y] += matrix[x][z] * multiplier[z][y];
          }
        }
      }
    }

    return newMatrix;
  } else {
    return "Error: multiplier is not a number or matrix";
  }
}

console.clear();

console.log(`Mean: ${findMean([7, 24, 13, 12])}`); // should return 14
console.log(`Median: ${findMedian([7, 24, 13, 12])}`); // should return 12.5
console.log(`Mode: ${findMode([7, 24, 13, 12])}`); // should return "no mode"
console.log(`Range: ${findRange([7, 24, 13, 12])}`); // should return 17
console.log(`Q1: ${findQ1([7, 24, 13, 12])}`); // should return 9.5
console.log(`Q3: ${findQ3([7, 24, 13, 12])}`); // should return 18.5
console.log(`Interquartile Range: ${findIQR([7, 24, 13, 12])}`); // should return 9
console.log(`Variance: ${findVariance([7, 24, 13, 12])}`); // should return 38.5
console.log(`Standard Deviation: ${findStandardDeviation([7, 24, 13, 12])}`); // should return 6.2048368229954285

console.log(multiplyMatrix([[2, 4, 6]], 2)); // should return [[4, 8, 12]]
console.log(multiplyMatrix([[2, 4, 6]], [[3, 2, 4]])); // should error "not possible"
console.log(multiplyMatrix([[2, 4, 6]], [[3], [2], [4]])); // should return [[38]]
console.log(
  multiplyMatrix(
    [
      [-1, 5],
      [5, 2],
      [0, -4],
    ],
    [
      [4, -3],
      [6, 8],
    ]
  )
); // should return [[26, 43], [32, 1], [-24, -32]]

console.log("\n");
