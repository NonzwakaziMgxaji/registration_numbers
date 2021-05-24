function regNumbersFactory(existingReg) {

    var regNumbersEntered = existingReg || {};
    var countRegNumbers = 0;

    function storedReg(regPlate) {
        var regPlate = regPlate.toUpperCase();
        var regex = /^((CA|CY|CK|CL)\s\d{3}\-\d{3})$|^((CA|CY|CK|CL)\s\d{3}\d{3})$|^((CA|CY|CK|CL)\s\d{3}\s\d{3})$/;
        var testRegularExp = regex.test(regPlate)

        if (regNumbersEntered[regPlate] === undefined) {
            regNumbersEntered[regPlate] = 0;
            countRegNumbers++;
        } else {
            regNumbersEntered[regPlate]++;
        }
        return testRegularExp;
    }

    function showStoredReg() {
        return regNumbersEntered;
    }

    function numOfReg() {
        return countRegNumbers
    }

    return {
        storedReg,
        showStoredReg,
        numOfReg,
    }
}
