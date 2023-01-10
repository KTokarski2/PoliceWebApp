


function validateForm(event) {

    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const rankInput = document.getElementById('rank');
    const departmentInput = document.getElementById('department');
    const salaryInput = document.getElementById('salary');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorRank = document.getElementById('errorRank');
    const errorDepartment = document.getElementById('errorDepartment');
    const errorSalary = document.getElementById('errorSalary');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors(
        [firstNameInput, lastNameInput, rankInput, departmentInput, salaryInput],
        [errorFirstName, errorLastName, errorRank, errorDepartment, errorSalary],
        errorsSummary);

    let valid = true;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 50)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 50 znaków";
    }

    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 50)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zwierać od 2 do 50 znaków";
    }

    if (!checkSelected(rankInput.value)) {
        valid = false;
        rankInput.classList.add("error-input");
        errorRank.innerText = "Należy wybrać stopień";
    }

    if (!checkRequired(departmentInput.value)) {
        valid = false;
        departmentInput.classList.add("error-input");
        errorDepartment.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(departmentInput.value, 2, 50)) {
        valid = false;
        departmentInput.classList.add("error-input");
        errorDepartment.innerText = "Pole powinno zawierać od 2 do 50 znaków";
    }

     if (!checkNumber(salaryInput.value)) {
        valid = false;
        salaryInput.classList.add("error-input");
        errorSalary.innerText = "Wartość powinna być liczbą";
    }


    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }




    return valid;
}

