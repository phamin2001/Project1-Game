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
    
let arrayOfRandumNums = [];
let arrayOfPuzzleNums = [];
let arrayOfEachColumn = [];

const checkForWin = () => {
    let sortArray = [[7, 8, 0],
                     [4, 5, 6],
                     [1, 2, 3]];
    if(JSON.stringify(arrayOfPuzzleNums) == JSON.stringify(sortArray)) {
        alert('Congradulation! You Win');
        $('body').off('keydown');
    }
}

const resetAllArrays = () => {
    arrayOfRandumNums = [];
    arrayOfPuzzleNums = [];
    arrayOfEachColumn = [];
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

const swapNumbers = () => {
    // update arrayOfPuzzleNums after swap
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
            setTimeout(swapNumbers(), 1000);
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
    for (let y = 3; y > 0; y--) {
        const $row = $('<div/>').addClass('game-row');
        arrayOfEachColumn = [];
        for (let x = 1; x < 4; x++) {
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

const generateArrayOfUniqueRandumNumbers = (sizeOfPuzzle) => {
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
    let sizeOfPuzzle = Math.pow(parseInt(sizeOfPuzzleFromUser), 2);
    console.log(`Size of puzzle is: ${sizeOfPuzzle}`);

    generateArrayOfUniqueRandumNumbers(sizeOfPuzzle);
    gameBoard();
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