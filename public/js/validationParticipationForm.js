function validateForm(event) {
    const policeOfficerInput = document.getElementById('policeOfficer');
    const caseInput = document.getElementById('case');
    const startingDateInput = document.getElementById('startingDate');
    const endingDateInput = document.getElementById('endingDate');
    const actionTakenInput = document.getElementById('actionTaken');

    const errorPoliceOfficer = document.getElementById('errorPoliceOfficer');
    const errorCase = document.getElementById('errorCase');
    const errorStartingDate = document.getElementById('errorStartingDate');
    const errorEndingDate = document.getElementById('errorEndingDate');
    const errorActionTaken = document.getElementById('errorActionTaken');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([policeOfficerInput, caseInput, startingDateInput, endingDateInput, actionTakenInput],
        [errorPoliceOfficer, errorCase, errorStartingDate, errorEndingDate, errorActionTaken], errorsSummary);

    let valid = true;

    if (!checkSelected(policeOfficerInput.value)) {
        valid = false;
        policeOfficerInput.classList.add("error-input");
        errorPoliceOfficer.innerText = "Należy wybrać funkcjonariusza";
    }

    if(!checkSelected(caseInput.value)) {
        valid = false;
        caseInput.classList.add("error-input");
        errorCase.innerText = "Należy wybrać sprawę";
    }

    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = '' + nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
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
    } else if (checkRequired(endingDateInput.value) && checkDate(endingDateInput.value)
                && !checkDateIfAfter(endingDateInput.value, startingDateInput.value)) {
        valid = false;
        endingDateInput.classList.add("error-input");
        errorEndingDate.innerText = "Data zakończenia powinna być późniejsza niż data rozpoczęcia";

    }

    if (endingDateInput.value != "") {
        if (!checkDate(endingDateInput.value)) {
            valid = false;
            endingDateInput.classList.add("error-input");
            errorEndingDate.innerText = "Pole powinnno zwierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
        } else if (checkDateIfAfter(endingDateInput.value, nowString)) {
            valid = false;
            endingDateInput.classList.add("error-input");
            errorEndingDate.innerText = "Data nie może być z przyszłośći"
        }
    }

    if (actionTakenInput.value != "") {
        if (!checkTextLengthRange(actionTakenInput.value, 1, 100)) {
            valid = false;
            actionTakenInput.classList.add("error-input");
            errorActionTaken.innerText = "Pole powinno zawierać od 1 do 100 znaków"
        }
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy"
    }

    return valid;
}