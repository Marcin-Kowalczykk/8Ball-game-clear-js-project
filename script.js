const input = document.querySelector('#question');
const answer = document.querySelector('.answer');
const error = document.querySelector('.error');
const question = document.querySelector('.question');
const ball = document.querySelector('img');
const wrapper = document.querySelector('.wrapper');
const color1 = document.querySelector('#color1');
const color2 = document.querySelector('#color2');
const buttonClc = document.querySelector('.buttonClear');

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

// dictionary for saving questions and answers
let Dictionary = function() { 
  this.data = {};
  this.add = (key, value) => {
    this.data[key] = value;
  };
  this.has = key => {
    return key in this.data;
  };
  this.get = key => {
    return this.has(key) ? this.data[key] : undefined;
  };
  this.keys = () => {
    var keys = [];
    for (var key in this.data) {
      keys.push(key);
    }
    return keys;
  };
  this.values = () => {
    var values = [];
    for (var key in this.data) {
      if (this.has(key)) {
        values.push(this.data[key]);
      }
    }
    return values;
  };
}
let dict = new Dictionary();

// array with input elements for saving questions and answers
const items = [];
const valuesToArray = () => {
    const text = input.value.toLowerCase();
    items.push(text);
    //console.log(`Inputs: ${items}`);
}
// array with answers for saving information
const answers = [];
const answersToArray = () => {
    answers.push(answer.textContent);
    //console.log(`Answers: ${answers}`);
}
// saving information to dictionary (for correct questions only)
const diction = () => {
  const text = input.value.toLowerCase();
  if(text !== '' && text.slice(-1) === '?' && items[items.length - 2] !== items[items.length - 1] && (text.includes('czy ') || text.includes('do ') || text.includes('did ') || text.includes('are ') || text.includes('is ') || text.includes('should ') || text.includes('can ') || text.includes('have ') || text.includes('will ') || text.includes('would ') || text.includes('may ') || text.includes('shall '))) {

    dict.add(text, answer.textContent);
    console.log(`QUESTIONS: ${dict.keys()}`);
    console.log(`ANSWERS: ${dict.values()}`);
  }
}
// checking input values and answers (unused in code)
const checkAnswers = () => {
  if(dict.has(input.value)) {
    console.log(dict.has(input.value));
    console.log(dict.get(input.value)); 
  }
}

// call functions for saving information
const saveInfo = () => {
  // arrays
  setTimeout(valuesToArray, 400); // inputs
  setTimeout(answersToArray, 1050); // answers

  // dictionary
  setTimeout(diction, 1060);
}

// random answers generator for table
const randFcn = (table) => {
    const randAnsGen = Math.floor(Math.random() * table.length);
    return table[randAnsGen];
}
// functions for changing colors 
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

// function for showing instruction
const instruction = (quest) => {
  if(input.value === '') {
    quest.textContent = 'ask a question by click on the ball or press "Enter"';
  }
}

// main function 
const mainFcn = () => {
    // checkAnswers();
    showError(error, '');
    clearCom(answer, question);
    addAnimation(ball);
    question.textContent = `${input.value} ...`
    setTimeout(checkInput, 1000);
    saveInfo();
}
// animation functions
const addAnimation = (element) => {
    element.classList.add('animation');
}
const removeAnimation = (element) => {
    element.classList.remove('animation');
}

// clear input value
const clearInput = (inp) => {
    inp.value = '';
}

// clear messages
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

// Reply answer
const giveEarlierAnswer = () => {
  const text = input.value.toLowerCase();
  console.log(`Question for ${text}: ${dict.has(text)}`); // if question was there, show it
  console.log(`Answer for ${text}: ${dict.get(text)}`); // show the answer for this question
  answer.textContent = dict.get(text);  // return the same answer that was already there
  removeAnimation(ball);
}

// checking errors
const checkInput = () => { 
    const text = input.value.toLowerCase();
    if(text === '' ) {
        showError(error, 'please ask a question !');
        clearCom(answer, question);
    }
    else if(!(text.slice(-1) === '?')) { 
        showError(error, 'You need "?" at the end !');
        clearCom(answer, question);
    }
    else if(!text.includes('czy ') && !text.includes('do ') && !text.includes('did ') && !text.includes('are ') && !text.includes('is ') && !text.includes('should ') && !text.includes('can ') && !text.includes('have ') && !text.includes('will ') && !text.includes('would ') && !text.includes('may ') && !text.includes('shall ')) { 
      showError(error, 'Question should include question operator !');
      clearCom(answer, question);
    }
    else if(items[items.length - 2] === items[items.length - 1]) {
        showError(error, "its the same question, put the other one");
        clearCom(answer, question);
    }
    else if(dict.has(text)) { 
        giveEarlierAnswer();
    }
    else { 
        giveAnswer(answer);
        //clearInput(input);
    }
}

// calling instruction
instruction(question);

//event for click
ball.addEventListener('click', () => {
    mainFcn();
});
//event for enter
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    mainFcn();
  }
});
// event for button
buttonClc.addEventListener('click', () => {
  clearInput(input);
  showError(error, '');
  clearCom(answer, question);
  instruction(question);
});

