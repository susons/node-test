
const weatherForm = document.querySelector('form');
const search = document.querySelector('form input')
const message1 = document.querySelector('p.message1')
const message2 = document.querySelector('p.message2')

weatherForm.addEventListener('submit',  (e) => {
  e.preventDefault();
  message1.textContent = 'Loading...';
  message2.textContent = '';
  const location = search.value;

  fetch(`/weather?address=${location}`).then(r => {
    r.json().then((data) => {
        if (data.error) message1.textContent = data.error;
        else {
          message1.textContent = data.location;
          message2.textContent = data.forecast;
        }
      })
  })
  
})
