const currentSession = {
    total: 10,
    current: 1,
    correct: 0,
    currentCorrectAnswer: '',
};

let questions;
document.querySelector(".submit-btn").addEventListener('click', sumbitAnswer);

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function evaluateResult() {
    document.querySelector(".question-number").textContent = ` `;
    document.querySelector(".question-body").innerHTML = `You have answered ${currentSession.correct} questions correctly!`;
    document.querySelector("ul").classList.add("hidden");

}

function loadQuestion(number) {
    currentSession.current = number;
    document.querySelector(".question-number").innerHTML = ` 
                Question   <span class="highli">${currentSession.current + 1}</span> 
                of <span class="highli">${currentSession.total}</span>`;
    document.querySelector(".question-body").innerHTML = `${questions.results[currentSession.current].question}`;

    randomArray = shuffle(['choice-one', 'choice-two', 'choice-three', 'choice-four']);

    document.querySelector(`label[for="${randomArray[2]}"]`).innerHTML = questions.results[currentSession.current].incorrect_answers[0];
    document.querySelector(`label[for="${randomArray[0]}"]`).innerHTML = questions.results[currentSession.current].incorrect_answers[1];
    document.querySelector(`label[for="${randomArray[1]}"]`).innerHTML = questions.results[currentSession.current].incorrect_answers[2];
    currentSession.currentCorrectAnswer = randomArray[3];
    console.log(`current correct answer ${currentSession.currentCorrectAnswer}`);
    document.querySelector(`label[for="${randomArray[3]}"]`).innerHTML = questions.results[currentSession.current].correct_answer;


}


function sumbitAnswer() {

    let selected = document.querySelector('input[name="choice"]:checked');

    if (selected === null) {
        document.querySelector(".warning-no-selected").classList.remove("hidden");
    } else {
        selected = document.querySelector('input[name="choice"]:checked').value;
        document.querySelector(".warning-no-selected").classList.add("hidden");
      
        if (selected === currentSession.currentCorrectAnswer) {
            currentSession.correct++;

        }
        if (currentSession.current + 1 >= currentSession.total) {
            evaluateResult();
            document.querySelector("button").classList.add("hidden");
        } else {
            loadQuestion(currentSession.current + 1);
        }
        document.querySelector('input[name="choice"]:checked').checked = false;


    }

}


window.onload = function () {

    const spinner = document.getElementById("spinner");
    const form = document.querySelector('.quiz');
    console.log(form);
    spinner.removeAttribute('hidden');
    fetch('https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function (data) {
                    questions = data;
                    spinner.setAttribute('hidden', '');
                    form.classList.remove("hidden");
                    //   document.getElementById("#options-form").removeAttribute('hidden');
                    //  console.log(questions);
                    loadQuestion(0);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });




}