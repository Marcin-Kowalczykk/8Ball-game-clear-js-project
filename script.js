const input = document.querySelector('#question');
const answer = document.querySelector('.answer');
const error = document.querySelector('.error');
const ball = document.querySelector('img');

const ans1 = 'YES !!!';
const ans2 = 'Yes';
const ans3 = 'Probably yes';
const ans4 = 'Probably not';
const ans5 = 'Never... sorry';
const ans6 = 'Oh yes';
const ans7 = 'NO';
const ans8 = 'Maybe Yess...     Maybe not :(';

const ansTable = [ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8];

// random answers generator for table
const randFcn = (table) => {
    const randAnsGen = Math.floor(Math.random() * table.length);
    return table[randAnsGen];
}

// animation function
const addAnimation = (element) => {
    element.classList.add('animation');
    setTimeout(checkInput, 1000);
}
const removeAnimation = (element) => {
    element.classList.remove('animation');
}

// error function
const showError = (err, text) => {
    err.textContent = text;
    removeAnimation(ball);
}

// answer function
const giveAnswer = (answer) => {
    showError(error, '');
    answer.textContent = randFcn(ansTable);
    removeAnimation(ball);
}

//checking errors
const checkInput = () => { 
    if(input.value === '' ) {
        showError(error, 'please ask a question');
        answer.textContent = '';
    }
    else if(!(input.value.slice(-1) === '?')) { // na koncu ma byc
        showError(error, 'You need "?" at the end');
        answer.textContent = '';
    }
    else { 
        giveAnswer(answer);
    }
}

//events 
ball.addEventListener('click', () => {
    addAnimation(ball);
})