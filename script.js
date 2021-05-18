const input = document.querySelector('#question');
const answer = document.querySelector('.answer');
const error = document.querySelector('.error');
const question = document.querySelector('.question');
const ball = document.querySelector('img');
const wrapper = document.querySelector('.wrapper');
const color1 = document.querySelector('#color1');
const color2 = document.querySelector('#color2');

const ans1 = 'YES !!!';
const ans2 = 'Yes';
const ans3 = 'Probably yes';
const ans4 = 'Probably not';
const ans5 = 'Never... sorry';
const ans6 = 'Oh yes';
const ans7 = 'NO';
const ans8 = 'Maybe Yess...     Maybe not :(';

// array with answers
const ansTable = [ans1, ans2, ans3, ans4, ans5, ans6, ans7, ans8];

//array with input elements
const items = [];
const valuesToArray = () => {
    items.push(input.value);
    console.log(items);
}

// random answers generator for table
const randFcn = (table) => {
    const randAnsGen = Math.floor(Math.random() * table.length);
    return table[randAnsGen];
}
// 
const changeColor1 = (c1) => {
    wrapper.style.background = c1.value;
}
const changeColor2 = (c2) => {
    wrapper.style.background = c2.value;
}
const changeColorGradient = (c1, c2) => {
    wrapper.style.background = "linear-gradient(to right," + c1.value + "," + c2.value + ")";
}
color1.addEventListener('input', () => {
    changeColorGradient(color1, color2);
});
color2.addEventListener('input', () => {
    changeColorGradient(color1, color2);
});


// main function 
const mainFcn = () => {
    valuesToArray();
    showError(error, '');
    clearCom(answer, question);
    addAnimation(ball);
    question.textContent = `${input.value} ...`
    setTimeout(checkInput, 1000);
}
// animation function
const addAnimation = (element) => {
    element.classList.add('animation');
}
const removeAnimation = (element) => {
    element.classList.remove('animation');
}

// clear input
const clearInput = (inp) => {
    inp.value = '';
}

//clear comunicate
const clearCom = (ans, quest) => {
    ans.textContent = '';
    quest.textContent = ``;
}

// error function
const showError = (err, text) => {
    err.textContent = text;
    removeAnimation(ball);
}

// answer function
const giveAnswer = (ans) => {
    showError(error, '');
    removeAnimation(ball);
    ans.textContent = `${randFcn(ansTable)}`;
}

//checking errors
const checkInput = () => { 
    if(input.value === '' ) {
        showError(error, 'please ask a question');
        clearCom(answer, question);
    }
    else if(!(input.value.slice(-1) === '?')) { 
        showError(error, 'You need "?" at the end');
        clearCom(answer, question);
    }
    else if(items[items.length - 2] === items[items.length - 1]) {
        showError(error, "its the same question, put the other one");
        clearCom(answer, question);
    }
    else { 
        giveAnswer(answer);
        clearInput(input);
    }
}

//event for click
ball.addEventListener('click', () => {
    mainFcn();
})
//event for enter
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    mainFcn();
  }
});


