var regNumEntered = document.querySelector(".RegTextbox");
var addBtn = document.querySelector(".addBtn");
var radioBtnSelected = document.querySelector(".radio");
var showBtn = document.querySelector(".showBtn");
var regNumSpan = document.querySelector(".showRegNum");
var error = document.querySelector(".errorMsg");
var showAll = document.querySelector(".showAllBtn");
var reset = document.querySelector(".resetBtn")

var regNumLocal = {};

// var displayRegNumbers = []

if (localStorage["regNumbers"]) {
    regNumLocal = JSON.parse(localStorage.getItem("regNumbers"));
}

var regPlateInstance = regNumbersFactory();

// regPlateInstance.inputReg(regNumLocal);

// function regNum() {
//     var getRegNum = regNumEntered.value;
//     getRegNum = getRegNum.toUpperCase();

//     return  getRegNum;
// }


addBtn.addEventListener("click", function () {
    let regNumber = regNumEntered.value;
    if (regPlateInstance.storedReg(regNumber)) {

        localStorage.setItem('regNumbers', JSON.stringify(regPlateInstance.showStoredReg()));

        let spanElem = document.createElement("li");

        regNumSpan.appendChild(spanElem);
        spanElem.innerHTML = regNumber;

        if (regNumLocal[regNumber] > 0) {
            // console.log()
            error.innerHTML = "This registration number has already been entered!"
        } else {
            regNumSpan.appendChild(spanElem);
            spanElem.innerHTML = regNumber;
        }

    } else {
        error.innerHTML = "Enter a valid registration number using format shown in textbox!"
    }

    regNumEntered.value = "";


});



showBtn.addEventListener("click", function () {
    // let clearExisting = regNumSpan.children;
    // for (let i = clearExisting.length -1; i>= 0; i--){
    //     regNumSpan.removeChild(clearExisting[i]);
    // }

// let emptyArray =[];
    var rad = document.querySelector("input[name='town']:checked");
    if (rad) {
    
        let spanElem = document.createElement("li");
        localStorageData = Object.keys(regNumLocal);
        for (let i = 0; i < localStorageData.length; i++) {
            let regNombolo = localStorageData[i];
            if (radioBtnSelected.value === "capetown") {
                if (regNombolo.startsWith("CA")) {
                    let emptyArray =[];
                    emptyArray.push(regNombolo);
                    console.log(emptyArray);
                    for( let i = 0; i < emptyArray.length; i++){
                        let spanElem = document.createElement("li");
                        spanElem.innerHTML =emptyArray[i];
                        regNumSpan.appendChild(spanElem);
                    }
                }
            } else if (radioBtnSelected.value === "bellville") {
                if (regNombolo.startsWith("CY")) {
                    let emptyArray =[];
                    emptyArray.push(regNombolo);
                    for( let i = 0; i < emptyArray.length; i++){
                        let spanElem = document.createElement("li");
                        spanElem.innerHTML =emptyArray[i];
                        regNumSpan.appendChild(spanElem);
                    }
                }
            } else if (radioBtnSelected.value === "malmesbury") {
                if (regNombolo.startsWith("CK")) {
                    let emptyArray=[];
                    emptyArray.push(regNombolo);
                    for( let i = 0; i < emptyArray.length; i++){
                        let spanElem = document.createElement("li");
                        spanElem.innerHTML =emptyArray[i];
                        regNumSpan.appendChild(spanElem);
                    }
                }
            }
            else if (radioBtnSelected.value === "stellenbosch"){
                if (regNombolo.startsWith("CL")) {
                    let emptyArray =[];
                    emptyArray.push(regNombolo);
                    for( let i = 0; i < emptyArray.length; i++){
                        let spanElem = document.createElement("li");
                        spanElem.innerHTML =emptyArray[i];
                        regNumSpan.appendChild(spanElem);
                    }
                }
            } 
        }
    }
});

showAll.addEventListener("click", function () {
    var localStorageData = JSON.parse(localStorage.getItem("regNumbers"));
    document.getElementById("showRegNumID").innerHTML = "";

    for (var i = 0; i < localStorageData.length; i++) {
        localStorageData = Object.keys(regNumLocal);
        document.getElementById("showRegNumID").innerHTML += localStorageData[i];
    }
});


reset.addEventListener('click', function () {
    localStorage.clear();
    location.reload();
});
