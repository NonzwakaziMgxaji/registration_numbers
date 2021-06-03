var regNumEntered = document.querySelector(".RegTextbox");
var addBtn = document.querySelector(".addBtn");
var radioBtnSelected = document.querySelector(".radio");
var showBtn = document.querySelector(".showBtn");
var regNumSpan = document.querySelector(".showRegNum");
var error = document.querySelector(".errorMsg");
var showAll = document.querySelector(".showAllBtn");
var reset = document.querySelector(".resetBtn")

//store reg numbers
var regNumLocal = {};

//retrieving data from local storage
if (localStorage["regNumbers"]) {
    regNumLocal = JSON.parse(localStorage.getItem("regNumbers"));
}

reggies = Object.keys(regNumLocal)
console.log("dfghjkl");
for (let i = 0; i < reggies.length; i++) {
    let spanElem = document.createElement("span");
    spanElem.classList.add("spanClass");
    spanElem.innerHTML += reggies[i];
    regNumSpan.appendChild(spanElem);
}

//instantiation of factory function
var regPlateInstance = regNumbersFactory(regNumLocal);

//add button event listener
addBtn.addEventListener("click", function () {
    var regNumber = (regNumEntered.value).trim().toUpperCase();

    if (regPlateInstance.storedReg(regNumber)) {
        spanElem = document.createElement("span");

        var regies = regPlateInstance.showStoredReg();

        if (regNumLocal[regNumber] > 0) {
            error.innerHTML = "This registration number has already been entered!"
        } else {
            localStorage.setItem('regNumbers', JSON.stringify(regies));

            regNumSpan.appendChild(spanElem);
            spanElem.classList.add("spanClass");
            spanElem.innerHTML = regNumber;
            error.classList.remove("errorMsg");
            error.classList.add("displayFeedback");
            error.innerHTML = "Registration number added"
        }
    } else {
        error.innerHTML = "Enter a valid registration number using format shown in textbox!"
    }

    // clears textbox
    regNumEntered.value = "";

    //settimeout for error message to disappear after 3 seconds
    setTimeout(function () {
        error.innerHTML = "";
    }, 3000);
});

//show button event shows only reg numbers of selected town
showBtn.addEventListener("click", function () {
    regNumSpan.innerHTML = "";

    var rad = document.querySelector("input[name='town']:checked");
    if (rad) {
        if (localStorage["regNumbers"]) {
            regNumLocal = JSON.parse(localStorage.getItem("regNumbers"));
        }

        localStorageData = Object.keys(regNumLocal);

        let regContainer = localStorageData.filter(localStorageReg => localStorageReg.startsWith(rad.value));

        if (regContainer.length >= 1) {
            for (let i = 0; i < regContainer.length; i++) {
                let spanElem = document.createElement("span");
                spanElem.classList.add("spanClass");
                spanElem.innerHTML = regContainer[i];
                regNumSpan.appendChild(spanElem);
            }

        } else {
            error.classList.remove("errorMsg");
            error.classList.add("displayFeedback");
            error.innerHTML = "No registration number for this town yet!";
        }

    } else if (!rad) {
        error.innerHTML = "Please select a town!"
    }
    rad.checked = false;
    //removes error message after 3 seconds
    setTimeout(function () {
        error.innerHTML = "";
    }, 3000);

    // rad.checked = false;
});

//showAll button event display all the reg numbers in local storage
showAll.addEventListener("click", function () {

    localStorageData = Object.keys(regNumLocal);

    regNumSpan.innerHTML = "";

    for (var i = 0; i < localStorageData.length; i++) {
        let spanElem = document.createElement("span");
        spanElem.classList.add("spanClass");
        spanElem.innerHTML += localStorageData[i] + " ";
        regNumSpan.appendChild(spanElem);
    }
});

//reset button event to clear local storage
reset.addEventListener('click', function () {
    window.localStorage.removeItem('regNumbers');
    location.reload();
    regNumSpan.innerHTML = "";

    error.classList.remove("errorMsg");
    error.classList.add("displayFeedback");
    error.innerHTML = "Local storage has been reset";

    setTimeout(function () {
        error.innerHTML = "";
    }, 3000);
});