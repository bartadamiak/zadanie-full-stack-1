const form = document.querySelector('#form');

const positionChosen = document.querySelector('.position-chosen');
const testerPosition = document.querySelector('.position-tester');


const firstName = document.querySelector('#name');
const lastName = document.querySelector('#lastname');
const email = document.querySelector('#email');
const position = document.querySelector('#position');
const desc = document.querySelector('#desc');
const answer1 = document.querySelector('#answer1');
const answer2 = document.querySelector('#answer2');
const answer3 = document.querySelector('#answer3');

const confirmation = document.querySelector('.confirmation');
const confirmationButton = document.querySelector('.confirmation-button');


/// Zmiana pól po wybraniu stanowiska
position.addEventListener('change', function () {

    if (position.value == 'tester') {
        positionChosen.classList.remove('hide');
        answer1.placeholder = "Systemy testujące";
        answer2.placeholder = "Systemy raportowe";
        answer3.nextElementSibling.innerText = "Zna selenium"
        answer3.value = "Zna selenium"
    }

    if (position.value == 'developer') {
        positionChosen.classList.remove('hide');
        answer1.placeholder = "Środowiska ide";
        answer2.placeholder = "Języki programowania";
        answer3.nextElementSibling.innerText = "Zna mysql"
        answer3.value = "Zna mysql"
    }

    if (position.value == 'pm') {
        positionChosen.classList.remove('hide');
        answer1.placeholder = "Metodologie prowadzenia projektów";
        answer2.placeholder = "Systemy raportowe";
        answer3.nextElementSibling.innerText = "Zna scrum"
        answer3.value = "Zna scrum"
    }
})

/// Walidacja formularza

form.addEventListener("submit", function (ev) {

    ev.preventDefault();


    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const descValue = desc.value;
    const positionValue = position.value;
    const answer1Value = answer1.value.trim();
    const answer2Value = answer2.value.trim();
    const answer3Value = answer3.value ? "Zna" : "Nie zna";

    const firstNameError = document.querySelector('.first-name-error');
    const lastNameError = document.querySelector('.last-name-error');
    const emailError = document.querySelector('.email-error');
    const positionError = document.querySelector('.position-error')

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (firstNameValue == "") {
        if (!firstNameError) {
            let error = document.createElement('p');
            error.classList.add('error', 'first-name-error');
            error.textContent = 'To pole jest wymagane'
            firstName.insertAdjacentElement("afterend", error);

            firstName.focus()
        }

    }

    else {
        if (firstNameError) {
            firstNameError.remove();

        }
    }


    if (!emailValue.match(emailPattern)) {
        if (!emailError) {
            let error = document.createElement('p');
            error.classList.add('error', 'email-error')
            error.textContent = 'Wpisz poprawny adres email'
            email.insertAdjacentElement("afterend", error);

            email.focus()
        }
    }

    else {
        if (emailError) {
            emailError.remove();

        }
    }

    if (lastNameValue == "") {

        if (!lastNameError) {
            let error = document.createElement('p');
            error.classList.add('error', 'last-name-error');
            error.textContent = 'To pole jest wymagane'
            lastName.insertAdjacentElement("afterend", error);

            lastName.focus()
        }
    }

    else {
        if (lastNameError) {
            lastNameError.remove();

        }
    }

    if (positionValue == "") {
        if (!positionError) {
            let error = document.createElement('p');
            error.classList.add('error', 'position-error');
            error.textContent = 'Wybierz stanowisko'
            position.insertAdjacentElement("afterend", error);

            position.focus()
        }
    }

    else {
        if (positionError) {
            positionError.remove();

        }
    };

    if (answer3.checked) {
        answer3.value = answer3.nextElementSibling.innerText + "- TAK";
    } else {
        answer3.value = "NIE ZNA";
    }

    const er = document.querySelectorAll('.error');

    if (er.length == 0) {

        confirmation.classList.toggle('hide');

        const newData = new FormData(this);
        
        fetch('server.php', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(newData))
           
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                console.log(data.data)
                form.reset();
            })
            .catch(error => {
                console.error(error)
            })
    }
})

confirmationButton.addEventListener('click', function(e) {
    e.preventDefault;
    confirmation.classList.toggle('hide');

})

