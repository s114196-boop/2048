let grid = [];
let gridElement = document.getElementById("grid");

function startGame() {
    grid = Array(16).fill(0);
    addNumber();
    addNumber();
    render();
}

function addNumber() {
    let empty = [];
    grid.forEach((v, i) => {
        if (v === 0) empty.push(i);
    });
    let index = empty[Math.floor(Math.random() * empty.length)];
    grid[index] = 2;
}

function render() {
    gridElement.innerHTML = "";
    grid.forEach(v => {
        let div = document.createElement("div");
        div.className = "cell";
        div.textContent = v === 0 ? "" : v;
        gridElement.appendChild(div);
    });
}

document.addEventListener("keydown", e => {
    let old = grid.toString();

    if (e.key === "ArrowLeft") moveLeft();
    if (e.key === "ArrowRight") moveRight();
    if (e.key === "ArrowUp") moveUp();
    if (e.key === "ArrowDown") moveDown();

    if (grid.toString() !== old) {
        addNumber();
        render();
    }
});

function moveLeft() {
    for (let r = 0;r < 4; r++) {
        let row = grid.slice(r * 4, r * 4 + 4);
        row = compress(row);
        grid.splice(r * 4, 4, ...row);
    }
}

function moveRight() {
    for (let r = 0; r < 4; r++) {
        let row = grid.slice(r * 4, r * 4 + 4).reverse();
        row = compress(row).reverse();
        grid.splice(r * 4, 4, ...row);
    }
}

function moveUp() {
    for (let c = 0; c < 4; c++) {
        let col = [grid[c], grid[c+4], grid[c+8], grid[c+12]];
        col = compress(col);
        [grid[c], grid[c+4], grid[c+8], grid[c+12]] = col;
    }
}

function moveDown() {
    for (let c = 0; c < 4; c++) {
        let col = [grid[c], grid[c+4], grid[c+8], grid[c+12]].reverse();
        col = compress(col).reverse();
        [grid[c], grid[c+4], grid[c+8], grid[c+12]] = col;
    }
}

function compress(arr) {
    arr = arr.filter(v => v !== 0);

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            arr[i] *= 2;
            arr[i + 1] = 0;
        }
}

    arr = arr.filter(v => v !== 0);

    while (arr.length < 4) arr.push(0);
    return arr;
}

startGame();


