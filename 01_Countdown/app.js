window.onload = function () { 
  const quoteDiv = document.querySelector('.quote');
  console.log(quoteDiv);
  
  fetch('https://type.fit/api/quotes')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        const rand = Math.floor(Math.random() * data.length);
       console.log(data[rand].text);
       quoteDiv.textContent =data[rand].text;
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

}