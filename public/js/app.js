const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const msgOne = document.querySelector('#massage-1');
const msgTwo = document.querySelector('#massage-2');
msgOne.textContent = '';
msgTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    msgOne.textContent = 'Loading the location..'
    msgTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgOne.textContent = data.error;
                msgTwo.textContent = '';
            } else {
                msgOne.textContent = data.location;
                msgTwo.textContent = data.forecast;
            }
        })
    })
})