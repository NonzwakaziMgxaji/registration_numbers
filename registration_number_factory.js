function regNumbersFactory(existingReg) {

    var regNumbersEntered = existingReg || {};

    function storedReg(regPlate) {
        if (regNumbersEntered[regPlate] === undefined) {
            regNumbersEntered[regPlate] = 0;
        } else {
            regNumbersEntered[regPlate]++;
        }
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
