let total = 0;
let buffer = '0';
let prevOp = null;
let result = document.querySelector(".result")

document.querySelector('.buttons').addEventListener('click', function(event) {
    buttonClick(event.target.innerText);
});

function buttonClick (value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    rerender();
}

function handleSymbol(value) {
    switch(value) {
        case '=':
            if (prevOp === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            prevOp = null;
            buffer = '' + total;
            total = 0;
            break;
        case 'C':
            buffer = '0';
            total = 0
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default: handleMath(value);
            break;
    } 
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
    rerender()
}

function rerender() {
    result.innerText = buffer;
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (total === 0) {
        total = intBuffer
    } else {
        flushOperation(intBuffer);
    }

    prevOp = value;
    buffer = '0';
}

function flushOperation(intBuffer) {
    if (prevOp === '+') {
        total += intBuffer;
    } else if (prevOp === '-') {
        total -= intBuffer;
    } else if (prevOp === '×') {
        total *= intBuffer;
    } else {
        total /= intBuffer;
    }
}