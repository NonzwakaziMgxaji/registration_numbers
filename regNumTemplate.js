var regNumEnteredTemp = document.querySelector(".RegTextboxTemp");
var addBtnTempElem = document.querySelector(".addBtnTemp");
var radioBtnSelectedTemp = document.querySelector(".radioTemp");
var showBtnTemp = document.querySelector(".showBtnTemp");
var regNumSpanTemp = document.querySelector(".showRegNumTemp");
var errorTemp = document.querySelector(".errorMsgTemp");
var showAllTemp = document.querySelector(".showAllBtnTemp");
var resetTemp = document.querySelector(".resetBtnTemp");

// get a reference to template
var regElemTemp = document.querySelector(".registrationTemplate");

//compile the template
var regElemCompile = Handlebars.compile(regElemTemp.innerHTML);

//store reg numbers
var regNumLocalTemp = {};

//retrieving data from local storage
if (localStorage["regNumbers1"]) {
    regNumLocalTemp = JSON.parse(localStorage.getItem("regNumbers1"));
}

window.onload = (event) => {
    localStorageData = Object.keys(regNumLocalTemp);
    regNumSpanTemp.innerHTML = "";

    for (var i = 0; i < localStorageData.length; i++) {
        let spanElem = document.createElement("span");
        spanElem.classList.add("spanClassTemp");
        spanElem.innerHTML += localStorageData[i] + " ";
        regNumSpanTemp.appendChild(spanElem);
        regNumSpanTemp.innerHTML = regElemCompile({ reg: localStorageData });
    }
};


//instantiation of factory function
var regPlateInstanceTemp = regNumbersFactory(regNumLocalTemp);

//add button event listener
addBtnTempElem.addEventListener("click", function () {
    var regNumberTemp = (regNumEnteredTemp.value).trim().toUpperCase();


    if (regPlateInstanceTemp.storedReg(regNumberTemp)) {
        let spanElem = document.createElement("span");

        var regies = regPlateInstanceTemp.showStoredReg();


        let reggies = Object.keys(regNumLocalTemp)

        if (regNumLocalTemp[regNumberTemp] > 0) {
            errorTemp.innerHTML = "This registration number has already been entered!"
        } else {
            localStorage.setItem('regNumbers1', JSON.stringify(regies));

            regNumSpanTemp.appendChild(spanElem);
            regNumSpanTemp.innerHTML = regElemCompile({ reg: reggies });
            spanElem.classList.add("spanClassTemp");
            spanElem.innerHTML = regNumberTemp;
            errorTemp.classList.remove("errorMsgTemp");
            errorTemp.classList.add("displayFeedbackTemp");
            errorTemp.innerHTML = "Registration number added"
        }
    } else {
        errorTemp.innerHTML = "Enter a valid registration number using format shown in textbox!"
    }


    // clears textbox
    regNumEnteredTemp.value = "";

    //settimeout for error message to disappear after 3 seconds
    setTimeout(function () {
        errorTemp.innerHTML = "";
    }, 3000);


});

//show button event shows only reg numbers of selected town
showBtnTemp.addEventListener("click", function () {
    regNumSpanTemp.innerHTML = "";

    var rad = document.querySelector("input[name='town']:checked");
    if (rad) {
        if (localStorage["regNumbers1"]) {
            regNumLocalTemp = JSON.parse(localStorage.getItem("regNumbers1"));
        }

        localStorageData = Object.keys(regNumLocalTemp);

        let regContainer = localStorageData.filter(localStorageReg => localStorageReg.startsWith(rad.value));

        if (regContainer.length >= 1) {
            for (let i = 0; i < regContainer.length; i++) {
                let spanElem = document.createElement("span");
                spanElem.classList.add("spanClass");
                spanElem.innerHTML = regContainer[i];
                // regNumSpanTemp.appendChild(spanElem);
                regNumSpanTemp.innerHTML = regElemCompile({ reg: regContainer });
            }

        } else {
            errorTemp.classList.remove("errorMsg");
            errorTemp.classList.add("displayFeedback");
            errorTemp.innerHTML = "No registration number for this town yet!";
        }

    } else if (!rad) {
        errorTemp.innerHTML = "Please select a town!"
    }

    //removes error message after 3 seconds
    setTimeout(function () {
        errorTemp.innerHTML = "";
    }, 3000);

    rad.checked = false;
});

//showAll button event display all the reg numbers in local storage
showAllTemp.addEventListener("click", function () {

    localStorageData = Object.keys(regNumLocalTemp);

    regNumSpanTemp.innerHTML = "";

    for (var i = 0; i < localStorageData.length; i++) {
        let spanElem = document.createElement("span");
        spanElem.classList.add("spanClass");
        spanElem.innerHTML += localStorageData[i] + " ";
        regNumSpanTemp.innerHTML = regElemCompile({ reg: localStorageData });
    }
});

//reset button event to clear local storage
resetTemp.addEventListener('click', function () {
    window.localStorage.removeItem('regNumbers1')
    location.reload();
    regNumSpanTemp.innerHTML = "";

    errorTemp.classList.remove("errorMsgTemp");
    errorTemp.classList.add("displayFeedbackTemp");
    errorTemp.innerHTML = "Local storage has been reset";

    setTimeout(function () {
        errorTemp.innerHTML = "";
    }, 3000);
});