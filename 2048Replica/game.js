document.addEventListener('DOMContentLoaded', function () {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('.score span');
    const bestDisplay = document.querySelector('.best span');
    let cells = []; // This holds each tile
    let score = 0;


    // Make the Board
    function makeBoard() {
        for (let i = 0; i < 16; i++) {
            let cell = document.createElement('div');
            cell.innerHTML = 0;
            gridDisplay.appendChild(cell);
            cells.push(cell);
        }
        randomNum(); // Start the game with two cells filled
        randomNum();
    }
    makeBoard();


    // Generate a Random Number between 0-15
    function randomNum() {
        let rand = Math.floor(Math.random() * cells.length);
        if (cells[rand].innerHTML == 0) {
            cells[rand].innerHTML = 2;
            assignColors();
            isGameOver();
        } else {
            randomNum();
        }
    }

    // Shifting Right
    function shiftRight() {
        let direction = 1;
        shiftRows(direction);
    }

    // Shifting Left
    function shiftLeft() {
        let direction = 0;
        shiftRows(direction);
    }   

    function shiftRows(direction) {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let row = extractRow(i);

                let shiftedRow = filterRow(row, direction);

                updateRow(i, shiftedRow);
            }
            
        }
    }

    function extractRow(i) {
        let first = cells[i].innerHTML;
        let second = cells[i + 1].innerHTML;
        let third = cells[i + 2].innerHTML;
        let fourth = cells[i + 3].innerHTML;
        let row = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth)];
        return row;
    }

    function filterRow(row, direction) {
        let filteredRow = row.filter(num => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let shiftedRow;

        if (direction === 1) { // if we shift right
            shiftedRow = zeros.concat(filteredRow); 
        }
        else { // direction = 0 so we shift left 
            shiftedRow = filteredRow.concat(zeros);
        }

        return shiftedRow;  
    }
    
    function updateRow(i, shiftedRow) {
        cells[i].innerHTML = shiftedRow[0];
        cells[i + 1].innerHTML = shiftedRow[1];
        cells[i + 2].innerHTML = shiftedRow[2];
        cells[i + 3].innerHTML = shiftedRow[3];
    }

    // Shifting Down
    function shiftDown() {
        let direction = 1;
        shiftCols(direction);
    }

    // Shifting Up
    function shiftUp() {
        let direction = 0;
        shiftCols(direction);
    }

    function shiftCols(direction) {
        for (let i = 0; i < 4; i++) {
            let col = extractCol(i);

            let shiftedCol = filterCol(col, direction);

            updateCol(i, shiftedCol);
        }
    }

    function extractCol(i) {
        let first = cells[i].innerHTML;
        let second = cells[i + 4].innerHTML;
        let third = cells[i + 8].innerHTML;
        let fourth = cells[i + 12].innerHTML;
        let col = [parseInt(first), parseInt(second), parseInt(third), parseInt(fourth)];
        return col;
    }

    function filterCol(col, direction) {
        let filteredCol = col.filter(num => num);
        let missing = 4 - filteredCol.length;
        let zeros = Array(missing).fill(0);
        let shiftedCol;

        if (direction === 1) { // if we shift down
            shiftedCol = zeros.concat(filteredCol); 
        }
        else { // direction = 0 so we shift up
            shiftedCol = filteredCol.concat(zeros);
        }

        return shiftedCol;  
    }
    
    function updateCol(i, shiftedCol) {
        cells[i].innerHTML = shiftedCol[0];
        cells[i + 4].innerHTML = shiftedCol[1];
        cells[i + 8].innerHTML = shiftedCol[2];
        cells[i + 12].innerHTML = shiftedCol[3];
    }
    
    // Add like-numbers together in rows
    function combineRow() {
        for (let i = 0; i < 15; i++) { 
            if (cells[i].innerHTML === cells[i + 1].innerHTML) {
                let sum = parseInt(cells[i].innerHTML) + parseInt(cells[i + 1].innerHTML);
                cells[i].innerHTML = sum;
                cells[i + 1].innerHTML = 0;
                score += sum;
                scoreDisplay.innerHTML = score;
            }
        }
        isWinner();
    }

    // Add like-numbers together in cols
    function combineCol() {
        for (let i = 0; i < 12; i++) { 
            if (cells[i].innerHTML === cells[i + 4].innerHTML) {
                let sum = parseInt(cells[i].innerHTML) + parseInt(cells[i + 4].innerHTML);
                cells[i].innerHTML = sum;
                cells[i + 4].innerHTML = 0;
                score += sum;
                scoreDisplay.innerHTML = score;
            }
        }
        isWinner();
    }

    // For when the right arrow key is pressed
    function keyRight() {
        shiftRight();
        combineRow();
        shiftRight();
        randomNum();
    }

    // For when the left arrow key is pressed
    function keyLeft() {
        shiftLeft();
        combineRow();
        shiftLeft();
        randomNum();
    }

    // For when the down arrow key is pressed
    function keyDown() {
        shiftDown();
        combineCol();
        shiftDown();
        randomNum();
    }

    // For when the up arrow key is pressed
    function keyUp() {
        shiftUp();
        combineCol();
        shiftUp();
        randomNum();
    }
    
    const control = function(e) {
        switch(e.code) {
            case 'ArrowUp':
                keyUp();
                break;
            case 'ArrowDown':
                e.preventDefault(); // Prevents page from scrolling down on keypress
                keyDown();
                break;
            case 'ArrowLeft':
                keyLeft();
                break;
            case 'ArrowRight':
                keyRight();
                break;
        }
    }

    // Listening for each type of key press
    document.addEventListener('keydown', control);

    // Check for a Win
    function isWinner() {
        for (let i = 0; i < 16; i++) {
            if (cells[i].innerHTML == 2048) {
                alert("YOU WIN!");
                document.removeEventListener('keydown', control);
            }
        }
    }

    // Check for a Loss
    function isGameOver() {
        let zeros = 0;
        for (let i = 0; i < 16; i++) {
            if (cells[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            alert("YOU LOSE!");
            document.removeEventListener('keydown', control);
        }
    }

    // Assign Colors for each Tile
    function assignColors() {
        for (let i = 0; i < 16; i++) {
            let cell = cells[i].innerHTML;

            switch(cell) {
                case '0':
                    cells[i].style.backgroundColor = '#95d5b2';
                    break;
                case '2':
                    cells[i].style.backgroundColor = '#ffb5a7ff';
                    break;
                case '4':
                    cells[i].style.backgroundColor = '#f0907d';
                    break;
                case '8':
                    cells[i].style.backgroundColor = '#8e7dbe';
                    break;
                case '16':
                    cells[i].style.backgroundColor = '#f4d35e';
                    break;
                case '32':
                    cells[i].style.backgroundColor = '#a9def9';
                    break;
                case '64':
                    cells[i].style.backgroundColor = '#007ea7';
                    break;
                case '128':
                    cells[i].style.backgroundColor = '#e4c1f9';
                    break;
                case '256':
                    cells[i].style.backgroundColor = '#758bfd';
                    break;
                case '512':
                    cells[i].style.backgroundColor = '#d66ba0';
                    break;
                case '1024':
                    cells[i].style.backgroundColor = '#9ad1d4';
                    cells[i].style.fontSize = '30px';
                    break;
                case '2048':
                    cells[i].style.backgroundColor = '#ee964b';
                    cells[i].style.fontSize = '30px';
                    break;              
            }
    
        }
    }

});