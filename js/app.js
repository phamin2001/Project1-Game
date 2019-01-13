let moveChoicesForNum = {
    up     : false,
    right  : false,
    down   : false,
    left   : false
}

let positionOfEmptyObject = {};
let positionOfEligibleNumberObject = {};
let swapObject = {};
let eligibleNumVal;

let sizeOfY;
let sizeOfPuzzleFromUser;

let arrayOfRandumNums = [];
let arrayOfPuzzleNums = [];
let arrayOfEachColumn = [];
let sortArray = [];

let userMoveFlag = false;
let fakeArrayOfPuzzleNums = [];

let winFlag = false;

const createSortArray = () => {
    let arrayOfRow = [];
    let sortNum = 1;

    for(let row = 0; row < sizeOfY; row++) {
        arrayOfRow = [];
        for(let index = 0; index < sizeOfY; index++) {
            sortNum === sizeOfPuzzle ? arrayOfRow.push(0) : arrayOfRow.push(sortNum);
            sortNum++;
        }
        sortArray.unshift(arrayOfRow);
    }
    console.log('sortArray: '); console.log(sortArray);
}

const checkForWin = () => {
    if(JSON.stringify(arrayOfPuzzleNums) == JSON.stringify(sortArray)) {
        alert('Congradulation! You Win');
        winFlag = true;
        $('body').off('keydown');
    }
}

const resetAllArrays = () => {
    arrayOfRandumNums = [];
    arrayOfPuzzleNums = [];
    arrayOfEachColumn = [];
    sortArray         = [];
}

const resetMoveChoicesForNumObject = () => {
    moveChoicesForNum = {
        up     : false,
        right  : false,
        down   : false,
        left   : false
    }
}

const resetArrowKeyObject = () => {
    arrowKey = {
        up     : false,
        right  : false,
        down   : false,
        left   : false
    }
}

const swapNumbers = (userMoveFlag) => {
    
    if(userMoveFlag) {
        // update arrayOfPuzzleNums after swap:
        for(let key in positionOfEmptyObject) {
            swapObject[key] = positionOfEmptyObject[key];
        }
        console.log('swapObject: '); console.log(swapObject);
        for(let key in positionOfEligibleNumberObject) {
            positionOfEmptyObject[key] = positionOfEligibleNumberObject[key];
        }
        console.log('New position of empty(0) after swap should be: '); console.log(positionOfEmptyObject);
        for(let key in swapObject) {
            positionOfEligibleNumberObject[key] = swapObject[key];
        }
        console.log('New position of eligibleNumber after swap should be: '); console.log(positionOfEligibleNumberObject);
    
        arrayOfPuzzleNums[positionOfEmptyObject.row][positionOfEmptyObject.index] = 0;
        arrayOfPuzzleNums[positionOfEligibleNumberObject.row][positionOfEligibleNumberObject.index] = eligibleNumVal;
        console.log('New arrayOfPuzzleNums after swap is: '); console.log(arrayOfPuzzleNums);
    
        // update numbers in game-board after swap
        // y = row + 1 , x = index + 1
        // set empty postion on game-board
        $(`.game-square[x=${positionOfEmptyObject.index + 1}][y=${positionOfEmptyObject.row + 1}]`).text('');
        $(`.game-square[x=${positionOfEligibleNumberObject.index + 1}][y=${positionOfEligibleNumberObject.row + 1}]`).text(`${eligibleNumVal}`);
        checkForWin();
        eligibleMoveForNum();
        
    } else if(!userMoveFlag) {

         // update fakeArrayOfPuzzleNums after swap:
        for(let key in positionOfEmptyObject) {
            swapObject[key] = positionOfEmptyObject[key];
        }
        console.log('in fakeSwap, swapObject: '); console.log(swapObject);
        for(let key in positionOfEligibleNumberObject) {
            positionOfEmptyObject[key] = positionOfEligibleNumberObject[key];
        }
        console.log('in fakeSwap, New position of empty(0) after swap should be: '); console.log(positionOfEmptyObject);
        for(let key in swapObject) {
            positionOfEligibleNumberObject[key] = swapObject[key];
        }
        console.log('in fakeSwap, New position of eligibleNumber after swap should be: '); console.log(positionOfEligibleNumberObject);
    
        fakeArrayOfPuzzleNums[positionOfEmptyObject.row][positionOfEmptyObject.index] = 0;
        fakeArrayOfPuzzleNums[positionOfEligibleNumberObject.row][positionOfEligibleNumberObject.index] = eligibleNumVal;
        console.log('in fakeSwap, New fakeArrayOfPuzzleNums after swap is: '); console.log(fakeArrayOfPuzzleNums);
        console.log('arrayOfPuzzleNums after fakeSwap is: '); console.log(arrayOfPuzzleNums);
    }
}

const positionOfEligibleNumber = (val) => {
    switch (val) {
        case 'left': 
            positionOfEligibleNumberObject = {
                row    : positionOfEmptyObject.row,
                index  : positionOfEmptyObject.index + 1
            }
            eligibleNumVal = arrayOfPuzzleNums[positionOfEligibleNumberObject.row][positionOfEligibleNumberObject.index];
            console.log(`Eligible number in arrayOfPuzzle is: ${eligibleNumVal}`);
            console.log('positionOfEligibleNumberObject: '); console.log(positionOfEligibleNumberObject);
            break;
        case 'right':
            positionOfEligibleNumberObject = {
                row    : positionOfEmptyObject.row,
                index  : positionOfEmptyObject.index - 1
            }
            eligibleNumVal = arrayOfPuzzleNums[positionOfEligibleNumberObject.row][positionOfEligibleNumberObject.index];
            console.log(`Eligible number in arrayOfPuzzle is: ${eligibleNumVal}`);
            console.log('positionOfEligibleNumberObject: '); console.log(positionOfEligibleNumberObject);
            break;
        case 'up':
            positionOfEligibleNumberObject = {
                row    : positionOfEmptyObject.row - 1,
                index  : positionOfEmptyObject.index
            }
            eligibleNumVal = arrayOfPuzzleNums[positionOfEligibleNumberObject.row][positionOfEligibleNumberObject.index];
            console.log(`Eligible number in arrayOfPuzzle is: ${eligibleNumVal}`);
            console.log('positionOfEligibleNumberObject: '); console.log(positionOfEligibleNumberObject);
            break;
        case 'down':
            positionOfEligibleNumberObject = {
                row    : positionOfEmptyObject.row + 1,
                index  : positionOfEmptyObject.index
            }
            eligibleNumVal = arrayOfPuzzleNums[positionOfEligibleNumberObject.row][positionOfEligibleNumberObject.index];
            console.log(`Eligible number in arrayOfPuzzle is: ${eligibleNumVal}`);
            console.log('positionOfEligibleNumberObject: '); console.log(positionOfEligibleNumberObject);
            break;            
    }
}

const moveNumber = (val) => {
    for(let key in moveChoicesForNum) {
        if(key === val && moveChoicesForNum[key] === true) {
            console.log(`number can move on ${val} direction`);
            positionOfEligibleNumber(val);
            // setTimeout(swapNumbers(), 1000);
            userMoveFlag = true;
            swapNumbers(userMoveFlag);
            break;
        }
    } 
}

$('body').keydown(function (e) { 
    resetArrowKeyObject();
    e.preventDefault();

    switch (e.which) {
        case 37: //left arrow key
            console.log('arrowKey: left'); 
            moveNumber('left');
            break;
        case 38: //up arrow key
            console.log('arrowKey: up'); 
            moveNumber('up');
            break;
        case 39: // right arrow key
            console.log('arrowKey: right'); 
            moveNumber('right');
            break;
        case 40: //bottom arrow key
            console.log('arrowKey: down'); 
            moveNumber('down');
            break;
    }
});

const eligibleMoveForNum = () => {
    resetMoveChoicesForNumObject();

    let maxRow   = arrayOfPuzzleNums.length - 1;
    let minRow   = 0;
    let maxIndex = arrayOfPuzzleNums[maxRow - 1].length - 1;
    let minIndex = 0;

    let positionOfEmptyRow   = positionOfEmptyObject.row;
    let positionOfEmptyIndex = positionOfEmptyObject.index;

    if(positionOfEmptyRow === maxRow) {
        moveChoicesForNum.up = true;
    } else if(positionOfEmptyRow === minRow) {
        moveChoicesForNum.down = true;
    } else {
        moveChoicesForNum.up   = true;
        moveChoicesForNum.down = true;
    }

    if(positionOfEmptyIndex === minIndex) {
        moveChoicesForNum.left = true;
    } else if(positionOfEmptyIndex === maxIndex) {
        moveChoicesForNum.right = true;
    } else {
        moveChoicesForNum.right = true;
        moveChoicesForNum.left = true;
    }
    console.log('moveChoicesForNum = '); console.log(moveChoicesForNum);
}

const findEmptyBox = () => {
    for(let row = 0;row < arrayOfPuzzleNums.length; row++) {
        for(let index = 0; index < arrayOfPuzzleNums[row].length; index++) {
            if(arrayOfPuzzleNums[row][index] === 0) {
                positionOfEmptyObject = {
                    row   : row,
                    index : index
                }
                break;
            }
        }
    }
    console.log("porisionOfEmptyBoxObject: "); console.log(positionOfEmptyObject);
}

const gameBoard = () => {
    for (let y = sizeOfY; y > 0; y--) {
        const $row = $('<div/>').addClass('game-row');
        arrayOfEachColumn = [];
        for (let x = 1; x < sizeOfY + 1; x++) {
            const $gameSquare = $('<div/>').addClass('game-square').attr('x', x).attr('y', y);
            const ranNum = arrayOfRandumNums.splice(0,1)[0];
            arrayOfEachColumn.push(ranNum);
            ranNum === 0 ? $gameSquare.text('') : $gameSquare.text(`${ranNum}`);
            $gameSquare.css('text-align', 'center').css('vertical-align', 'middle')
                        .css('line-height', '150px').css('font-size', '35px');
            $row.append($gameSquare);
        }
        arrayOfPuzzleNums.unshift(arrayOfEachColumn);
        $('.game-board').append($row);
    }
    console.log('arrayOfPuzzleNums: [y=row+1, x=index+1]'); console.log(arrayOfPuzzleNums);
}

const generateArrayOfUniqueRandumNumbers = () => {
    while(arrayOfRandumNums.length < sizeOfPuzzle) {
        let randumNum = Math.floor(Math.random() * sizeOfPuzzle);
        if(arrayOfRandumNums.indexOf(randumNum) === -1) arrayOfRandumNums.push(randumNum);
    }
}

$('#start').on('click', () => {
    $('.game-board').empty();
    resetMoveChoicesForNumObject();
    resetAllArrays();
    $('body').on('keydown');
    let sizeOfPuzzleFromUser = prompt("Enter a size of puzzle from 3 to 6");
    sizeOfY = parseInt(sizeOfPuzzleFromUser);
    sizeOfPuzzle = Math.pow(parseInt(sizeOfPuzzleFromUser), 2);
    console.log(`Size of puzzle is: ${sizeOfPuzzle}`);

    createSortArray();

    generateArrayOfUniqueRandumNumbers(sizeOfPuzzle);
    gameBoard(sizeOfY);
    findEmptyBox();
    eligibleMoveForNum();
})

$('#reset').on('click', () => {
    $('.game-board').empty();
    resetMoveChoicesForNumObject();
    resetAllArrays();
})

$('#next-level').on('click', () => {
    $('.game-board').empty();
    resetMoveChoicesForNumObject();
    resetAllArrays();
    alert("Press the Start button for next Challenge");
})

/////////////////////////////////////////////////////////////////////////////
//////////////////////////////Solve Solution/////////////////////////////////
/////////////////////////Using A* Search Algorithm///////////////////////////
////////////////G: Cost(Number of steps taken to current state)//////////////
/////////H: Total Estimate Distance to Goal for all numbers in puzzle////////
//////MD: Manhattan Distance (Estimate Distance to Goal for each number)/////
/////////////////////////////F = G + H //////////////////////////////////////

let g = 0;
let fakeG = 0;
let fakeGflag = false;

let h_sumOfMD = 0;
let f = 0;
let fakeF = 0;

let arrayOfObjectForSortArrayWithRowIndex = [];
let arrayOfObjectForPuzzleNumWithRowIndex = [];
let arrayOfFakeFwithDirection = [];
let arrayOfFakeF = [];
let arrayOfFirstTwoSelectedMove = [];

let selectMove = '';
let oppositeOfPreviousSelectMove = '';

const findOppositeOfPreviousSelectMove = () => {
    if(selectMove === 'up') {
        oppositeOfPreviousSelectMove = 'down';
    } else if(selectMove === 'down') {
        oppositeOfPreviousSelectMove = 'up';
    } else if(selectMove === 'left') {
        oppositeOfPreviousSelectMove = 'right';
    } else if(selectMove === 'right') {
        oppositeOfPreviousSelectMove = 'left';
    }
}

const resetArraysforSolvingSolution = () => {
    arrayOfObjectForSortArrayWithRowIndex = [];
    arrayOfObjectForPuzzleNumWithRowIndex = [];
}

const calculateF = (fakeGflag) => {
    if(fakeGflag) {
        fakeF = h_sumOfMD + fakeG;
        console.log(`fakeF: ${fakeF}`);
    }
}

const calculateH_SumOfMD = () => {
    h_sumOfMD = 0;
    arrayOfObjectForPuzzleNumWithRowIndex.forEach(function (element, index, array) {
        h_sumOfMD += parseInt(element.MD);
    })
    console.log(`h_sumOfMD: ${h_sumOfMD}`);
}

const addMDtoArrayOfObjectForNumWithRowIndex = () => {
    arrayOfObjectForPuzzleNumWithRowIndex.forEach(function (element, index, array) {
        for (let i = 0; i < arrayOfObjectForSortArrayWithRowIndex.length; i++) {
            // console.log(`element is : ${element.val}`);
            // console.log('arrayOfObjectForSortArrayWithRowIndex[i].val: '); console.log(arrayOfObjectForSortArrayWithRowIndex[i].val);
            if (element.val === arrayOfObjectForSortArrayWithRowIndex[i].val) {
                let rowDifference = Math.abs(parseInt(element.row) - parseInt(arrayOfObjectForSortArrayWithRowIndex[i].row));
                let indexDifference = Math.abs(parseInt(element.index) - parseInt(arrayOfObjectForSortArrayWithRowIndex[i].index));
                let MD = rowDifference + indexDifference;
                element.MD = `${MD}`;
                break;
            }
        }
    })
    console.log("arrayOfObjectForPuzzleNumWithRowIndex with MD: "); console.log(arrayOfObjectForPuzzleNumWithRowIndex);
}

const createArrayOfObjectForSortArrayWithRowIndex = () => {
    sortArray.forEach(function (element, index, array) {
        element.forEach(function (element2d, index2d, array2d) {
            console.log(`row: ${index}, index: ${index2d}`);
            arrayOfObjectForSortArrayWithRowIndex.push({val: `${element2d}`, row: `${index}`, index: `${index2d}`});
            console.log(`arrayOfObjectForSortArrayWithRowIndex: `); console.log(arrayOfObjectForSortArrayWithRowIndex);
        })
    })
}

const createArrayOfObjectForNumWithRowIndex = (arrayOfNums) => {
    arrayOfNums.forEach(function (element, index, array) {
        element.forEach(function (element2d, index2d, array2d) {
            console.log(`row: ${index}, index: ${index2d}`);
            arrayOfObjectForPuzzleNumWithRowIndex.push({val: `${element2d}`, row: `${index}`, index: `${index2d}`});
            console.log(`arrayOfObjectForPuzzleNumWithRowIndex: `); console.log(arrayOfObjectForPuzzleNumWithRowIndex);
        })
    })
}

const fakeSolve = () => {
    eligibleMoveForNum();
    fakeG = g + 1;
    console.log(`fakeG: ${fakeG}`);

    arrayOfFakeFwithDirection = [];
    arrayOfFakeF = [];

    for(let key in moveChoicesForNum) {
        if(moveChoicesForNum[key] === true) {
            fakeArrayOfPuzzleNums = JSON.parse(JSON.stringify(arrayOfPuzzleNums));
            console.log(`fakeArrayOfPuzzleNums before fakeSwap: `); console.log(fakeArrayOfPuzzleNums);
            findEmptyBox();
            positionOfEligibleNumber(key);
            userMoveFlag = false;
            swapNumbers(userMoveFlag);

            resetArraysforSolvingSolution();
            createArrayOfObjectForSortArrayWithRowIndex();
            createArrayOfObjectForNumWithRowIndex(fakeArrayOfPuzzleNums);
            addMDtoArrayOfObjectForNumWithRowIndex();
           
            calculateH_SumOfMD();
           
            fakeGflag = true;
            calculateF(fakeGflag);
            arrayOfFakeFwithDirection.push({ [key]:fakeF });
            console.log(`arrayOfFakeFwithDirection: `); console.log(arrayOfFakeFwithDirection);
            arrayOfFakeF.push(fakeF);
            arrayOfFakeF.sort();
            console.log("Array of fakeF: "); console.log(arrayOfFakeF);
        }
    }
}

const findSelectMove = () => {
    arrayOfFirstTwoSelectedMove = [];
    for (let i = 0; i < 2; i++) {
        for(let j = 0; j < arrayOfFakeFwithDirection.length; j++) {
            for(let key in arrayOfFakeFwithDirection[j]) {
                if(arrayOfFakeFwithDirection[j][key] === arrayOfFakeF[i]) {
                    arrayOfFirstTwoSelectedMove.push(key);
                }
            }
        }       
    }
    if (arrayOfFirstTwoSelectedMove.length > 2) {
        arrayOfFirstTwoSelectedMove = arrayOfFirstTwoSelectedMove.slice(0,2);
    } 
    console.log('arrayOfFirstTwoSelectedMove: '); console.log(arrayOfFirstTwoSelectedMove);
}

const solve = () => {
    findEmptyBox();
    g++;

    findSelectMove();
    findOppositeOfPreviousSelectMove();

    console.log(`selectMove: ${selectMove}`);
    console.log(`oppositeOfPreviousSelectMove: ${oppositeOfPreviousSelectMove}`);


    if (selectMove === '') {
        selectMove = arrayOfFirstTwoSelectedMove[0];
        moveNumber(selectMove);
    } else if (oppositeOfPreviousSelectMove === arrayOfFirstTwoSelectedMove[0]) {
        selectMove = arrayOfFirstTwoSelectedMove[1];
        moveNumber(selectMove);
    } else if (oppositeOfPreviousSelectMove === arrayOfFirstTwoSelectedMove[1]) {
        selectMove = arrayOfFirstTwoSelectedMove[0];
        moveNumber(selectMove);
    } else {
        selectMove = arrayOfFirstTwoSelectedMove[0];
        moveNumber(selectMove);
    }
}

$('#solve').on('click', () => {
    console.log('start a auto solve algorithm');
    g = 0;
    resetArraysforSolvingSolution();
    createArrayOfObjectForSortArrayWithRowIndex();
    createArrayOfObjectForNumWithRowIndex(arrayOfPuzzleNums);
    addMDtoArrayOfObjectForNumWithRowIndex(arrayOfPuzzleNums);
    calculateH_SumOfMD();
    fakeSolve();
    solve();
})