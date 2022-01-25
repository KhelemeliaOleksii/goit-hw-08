
/*     
    1. Отслеживай на форме событие input, и каждый раз записывай 
        в локальное хранилище объект с полями email и message, 
        в которых сохраняй текущие значения полей формы. 
    Пусть ключом для хранилища будет строка "feedback-form-state".
    2. При загрузке страницы проверяй состояние хранилища, 
        и если там есть сохраненные данные, заполняй ими поля формы. 
        В противном случае поля должны быть пустыми.
    3. При сабмите формы очищай хранилище и поля формы, 
        а также выводи объект с полями email, message 
        и текущими их значениями в консоль.
    4. Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. 
        Для этого добавь в проект и используй библиотеку lodash.throttle.
 */
// use library  lodash.throttle
// import dependencies
import {_} from 'lodash';
import {throttle} from "lodash.throttle";

// key of feedback data for local storage
const keyDataLocalStorage = "feedback-form-state";

// feedback object
const feedbackObj = {
    email:null,
    message:null
}

const feedbackForm = document.querySelector(".feedback-form");
const emailInput = feedbackForm.querySelector("input");
const commentInput = feedbackForm.querySelector("textarea");

// fill feedback fields from local storage
feedbackFill();

feedbackForm.addEventListener("input", _.throttle(feedbackInputListener, 500));

feedbackForm.addEventListener('submit', feedbackSubmitListener);

//feedbackSubmitListener 
// in: event
// do:  - print to console feeback data
//      - clean fields of feedback form
//      - remove temprory record "feedback-form-state" from local storage    
function feedbackSubmitListener (event) {
    event.preventDefault();

    console.log("email:", emailInput.value);
    console.log("message:", commentInput.value);
    emailInput.value = null;
    commentInput.value = null;
    localStorage.removeItem(keyDataLocalStorage);
}

//feedbackInputListener
//in: event 
//do:   - record data from feedback form to 
//          localstorage
function feedbackInputListener(event) {
    // if event target email input
    if (event.target === emailInput) {
        feedbackObj.email = event.target.value;
        feedbackObj.message = commentInput.value;
    }
    // if event terget textarea
    if (event.target === commentInput) {
        feedbackObj.message = event.target.value;
        feedbackObj.email = emailInput.value;
    }
    
    // if feedback fields is empty don't record to local storage 
    if (!(feedbackObj.email || feedbackObj.message)) {
        if (localStorage.getItem(keyDataLocalStorage)) {
            localStorage.removeItem(keyDataLocalStorage);
        } 
        return;
    }
    // record feedback object to local storage
    localStorage.setItem(keyDataLocalStorage, JSON.stringify(feedbackObj));
}

//feedbackFill
//do:   - fill feedback form after reloading webpage 
//          if user do records before
function feedbackFill(){
    const isFilled = localStorage.getItem(keyDataLocalStorage);
    if (!isFilled) {
        return;
    } 
    const parseData = JSON.parse(isFilled);
    emailInput.value = parseData.email;
    commentInput.value = parseData.message;    
//    console.log(parseData);
}

