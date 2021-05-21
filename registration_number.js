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

window.onload = (event) => {
    let reggies = Object.keys(regNumLocal)

    for (let i = 0; i < reggies.length; i++) {
        let spanElem = document.createElement("span");
        spanElem.classList.add("spanClass");
        spanElem.innerHTML = reggies[i];
        regNumSpan.appendChild(spanElem);
    }
};

//instantiation of factory function
var regPlateInstance = regNumbersFactory(regNumLocal);

//add button event listener
addBtn.addEventListener("click", function () {
    var regNumber = regNumEntered.value;
    var regPlate = regNumber.toUpperCase();
    var regex = /^((CA|CY|CK|CL)\s\d{3}\-\d{3})$|^((CA|CY|CK|CL)\s\d{3}\d{3})$|^((CA|CY|CK|CL)\s\d{3}\s\d{3})$/;
    var testRegularExp = regex.test(regPlate)

    if (testRegularExp) {
        spanElem = document.createElement("span");

        regPlateInstance.storedReg(regPlate);

        var regies = regPlateInstance.showStoredReg()

        localStorage.setItem('regNumbers', JSON.stringify(regies));

        if (regNumLocal[regPlate] > 0) {
            error.innerHTML = "This registration number has already been entered!"
        } else {
            regNumSpan.appendChild(spanElem);
            spanElem.classList.add("spanClass")
            spanElem.innerHTML = regPlate;
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

        for (let i = 0; i < regContainer.length; i++) {
            let spanElem = document.createElement("span");
            spanElem.classList.add("spanClass");
            spanElem.innerHTML = regContainer[i];
            regNumSpan.appendChild(spanElem);
        }
    } else if (!rad) {
        error.innerHTML = "Please select a town!"
    }

    //removes error message after 3 seconds
    setTimeout(function () {
        error.innerHTML = "";
    }, 3000);

    rad.checked = false;
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
    localStorage.clear();
    location.reload();
});