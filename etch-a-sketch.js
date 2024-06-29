const container = document.querySelector('#container');
const changeGridButton = document.querySelector('button');
let countStorage = {};

changeGridButton.addEventListener('click', getNumber);

function getNumber() {
    let squares = prompt('How many squares per side?');

    if (Number(squares) <= 100 && Number(squares) > 0) {
        let boxHeight = 600 / squares;
        let boxFlex = 100 / squares;
        container.textContent = ''; // Clear previous grid
        countStorage = {}; // Clear count for each box

        createGrid(squares);

        const getElement = document.querySelectorAll('.flex-container div');

        getElement.forEach(box => { // Make grid the same size no matter the number of boxes
            box.style.height = `${boxHeight}px`;
            box.style.flex = `1 1 ${boxFlex}%`;
        });
    } else {
        alert('Try again. Only numbers 1-100 are allowed.')
        getNumber(); // Recursion until a valid number is entered
    }
}

function createGrid(squares = 4) { // Default grid is 4 by 4 boxes
    for (i = 1; i <= Number(squares * squares); i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.setAttribute('id', `box${i}`); // Set ID for the box
        countStorage[`box${i}`] = 0; // Store box ID for darkening calculation in changeColor
        container.appendChild(box);
    }

    const allBoxes = document.querySelectorAll('.box');

    allBoxes.forEach(box => {
        box.addEventListener('mouseover', changeColor.bind(this, box));
        box.addEventListener('touchstart', changeColor.bind(this, box));
    });
}

function changeColor(box) {
    let randomRed = Math.floor(Math.random()*(255 + 1));
    let randomGreen = Math.floor(Math.random()*(255 + 1));
    let randomBlue = Math.floor(Math.random()*(255 + 1));

    box.style.background = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
    box.style.filter = `brightness(${100 - (countStorage[box.id] * 10)}%)`; // Darken just for this box

    if (countStorage[box.id] < 10) {
        countStorage[box.id] += 1;
    }
}

createGrid();