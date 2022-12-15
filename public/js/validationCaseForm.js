function validateForm(event) {
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const startingDateInput = document.getElementById('startingDate');
    const closingDateInput = document.getElementById('closingDate');

    const errorName = document.getElementById('errorName');
    const errorDescription = document.getElementById('errorDescription');
    const errorStartingDate = document.getElementById('errorStartingDate');
    const errorClosingDate = document.getElementById('errorClosingDate');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([nameInput, descriptionInput, startingDateInput, closingDateInput],
        [errorName, errorDescription, errorStartingDate, errorClosingDate],
        errorsSummary);

    let valid = true;

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(nameInput.value, 2, 50)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierać od 2 do 50 znaków";
    }

    if (descriptionInput.value != "") {
        if (!checkTextLengthRange(descriptionInput.value,1,100)) {
            valid = false;
            descriptionInput.classList.add("error-input");
            errorDescription.innerText = "Pole powinno zawierać od 1 do 100 znaków";
        }
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = '' + nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if(day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(startingDateInput.value)) {
        valid = false;
        startingDateInput.classList.add("error-input");
        errorStartingDate.innerText = "Pole jest wymagane";
    } else if (!checkDate(startingDateInput.value)) {
        valid = false;
        startingDateInput.classList.add("error-input");
        errorStartingDate.innerText = "Pole powinnno zwierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(startingDateInput.value, nowString)) {
        valid = false;
        startingDateInput.classList.add("error-input");
        errorStartingDate.innerText = "Data nie może być z przyszłości";
    } else if (checkRequired(closingDateInput.value) && checkDate(closingDateInput.value)
                && !checkDateIfAfter(closingDateInput.value, startingDateInput.value)) {
        valid = false;
        closingDateInput.classList.add("error-input");
        errorClosingDate.innerText = "Data zakończenia powinna być późniejsza niż data rozpoczęcia";
    }

    if (closingDateInput.value != "") {
        if (!checkDate(closingDateInput.value)) {
            valid = false;
            startingDateInput.classList.add("error-input");
            errorClosingDate.innerText = "Pole powinnno zwierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
        } else if (checkDateIfAfter(closingDateInput.value, nowString)) {
            valid = false;
            closingDateInput.classList.add("error-input");
            errorClosingDate.innerText = "Data nie może być z przyszłości";
        }
    }

    if(!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy"
    }

    return valid;
}