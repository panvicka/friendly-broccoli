let totalSeconds = 3700;

window.onload = function () {
  const quoteDiv = document.querySelector('.quote');
  console.log(quoteDiv);

  calculateAndSetText(totalSeconds);

  

  fetch('https://type.fit/api/quotes')
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
          const rand = Math.floor(Math.random() * data.length);
          console.log(data[rand].text);
          quoteDiv.textContent = data[rand].text;
        });
      }
    )
    .catch(function (err) {
      console.log('Fetch Error :-S', err);
    });

}



function removeIfExists(dom) {
  if (document.contains(dom)) {
    dom.classList.add('hide');
 }
}

function addHTMLifDomExists(dom, text) {
  if (document.contains(dom)) {
    dom.remove();
  }
}

function calculateAndSetText(totseconds, firstLoad = false) {

  const spanSeconds = document.querySelector('#seconds span.unit');
  const spanMinutes = document.querySelector('#minutes span.unit');
  const spanHours = document.querySelector('#hours span.unit');

  const spanSecondsNumber = document.querySelector('#seconds span.num');
  const spanMinutesNumber = document.querySelector('#minutes span.num');
  const spanHoursNumber = document.querySelector('#hours span.num');


  let hoursLeft = Math.floor(totseconds / 3600);
  let minutesLeft = Math.floor(totseconds % 3600 / 60);
  let secondsLeft = Math.floor(totseconds % 3600 % 60);

 
  const hDisplay = hoursLeft > 0 ? (hoursLeft == 1 ? "hour" : " hours") : "hours";
  const mDisplay = minutesLeft > 0 ? (minutesLeft == 1 ? "minute" : " minutes") : "minutes";
  const sDisplay = secondsLeft > 0 ? (secondsLeft == 1 ? "second" : " seconds") : "seconds";


    if (hoursLeft == 0) {
      removeIfExists(document.querySelector('#hours'));
      if (minutesLeft == 0) {
        removeIfExists(document.querySelector('#minutes'));
        if (secondsLeft == 0) {
          removeIfExists(document.querySelector('#seconds'));
          removeIfExists(document.querySelector('.container-numbers'));
        }
      }
    }
  


  spanSecondsNumber.textContent = secondsLeft;
  spanMinutesNumber.textContent = minutesLeft;
  spanHoursNumber.textContent = hoursLeft;
 


  spanSeconds.textContent = secondsLeft == 1 ? "second" : " seconds";
  spanMinutes.textContent = minutesLeft == 1 ? "minute" : " minutes";
  spanHours.textContent = hoursLeft == 1 ? "hour" : " hours";
 

}


window.setInterval(function () {
  (totalSeconds - 1 >= 0) ? totalSeconds-- : totalSeconds = 0;
  console.log(totalSeconds);
  calculateAndSetText(totalSeconds);
}, 200);