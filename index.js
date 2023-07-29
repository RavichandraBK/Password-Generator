let genBtn = document.getElementsByClassName("gen");
let chUpper = document.getElementById("ch1");
let chLower = document.getElementById("ch2");
let chNum = document.getElementById("ch3");
let chSym = document.getElementById("ch4");
let strBar = document.getElementsByClassName("strength-bar");
let passStr = document.getElementById("pass-strength");
let strInd1 = document.getElementById("sr1");
let strInd2 = document.getElementById("sr2");
let strInd3 = document.getElementById("sr3");
let strInd4 = document.getElementById("sr4");
let pwdBox = document.getElementById("gen-pass");
let copyPass = document.getElementsByClassName("cpy-img");
let lenCheck = false;
let chkCount = 0;
let lenCheckVal = 0;
let pwdString = "";

const types = {
    upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowerCase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*"
}
const getTypes = [
    function ch1() {
        return types.upperCase[Math.floor(Math.random() * types.upperCase.length)];
    },

    function ch2() {
        return types.lowerCase[Math.floor(Math.random() * types.lowerCase.length)];
    },
    function ch3() {
        return types.numbers[Math.floor(Math.random() * types.numbers.length)];
    },
    function ch4() {
        return types.symbols[Math.floor(Math.random() * types.symbols.length)];
    }

]
genBtn[0].addEventListener("click", generate)
function generate() {
    console.log("genFun")

    const indx = getTypes.map((item) => {
        if (document.getElementById(item.name).checked) {
            return getTypes.indexOf(item);
        }
       
    }).filter((item) => {
        return item != undefined;
    })

    console.log(indx);

    let i = 0;
    while (lenCheckVal > pwdString.length) {

        while (chkCount > i) {
            pwdString += getTypes[indx[i++]]();
        }
        const typeAdder = getTypes[Math.floor(Math.random() * getTypes.length)]

        const isChecked = document.getElementById(typeAdder.name).checked;
        if (isChecked) {
            pwdString += typeAdder();
        }

    }
    pwdBox.innerHTML = pwdString;
}


strBar[0].addEventListener("input", function (event) {
    const tmpVal = event.target.value;
    passStr.textContent = tmpVal;
    const progrs = (tmpVal / this.max) * 100;
    console.log(progrs)
    strBar[0].style.background = `linear-gradient(to right,#A4FFAF ${progrs}%,#19171F ${progrs}%)`;
    lenCheckVal = this.value;

    (this.value >= "4") ? lenCheck = true : lenCheck = false;
    BarColor(lenCheck);
    console.log(lenCheck)


})

chUpper.addEventListener("input", () => {


    console.log(lenCheckVal);
    if (lenCheckVal < 4 && chkCount >= lenCheckVal) {

    }

    else {

        if (chUpper.checked) {
            if (chkCount < 4) chkCount++;
        }
        else {
            if (chkCount > 0) chkCount--;
        }

        BarColor(lenCheck);
    }


})



function BarColor(check) {
    if (check && chkCount) {
        (chkCount >= 1) ? strInd1.style.background = `#A4FFAF` : strInd1.style.background = `none`;
        (chkCount >= 2) ? strInd2.style.background = `#A4FFAF` : strInd2.style.background = `none`;
        (chkCount >= 3) ? strInd3.style.background = `#A4FFAF` : strInd3.style.background = `none`;
        (chkCount == 4) ? strInd4.style.background = `#A4FFAF` : strInd4.style.background = `none`;
    }
    else {
        strInd1.style.background = `none`;
        strInd2.style.background = `none`;
        strInd3.style.background = `none`;
        strInd4.style.background = `none`;
    }


    // console.log(chkCount);

}
chLower.addEventListener("input", () => {
    console.log(lenCheck)
    if (chLower.checked) {
        if (chkCount < 4) chkCount++;
    }
    else {
        if (chkCount > 0) chkCount--;
    }
    BarColor(lenCheck);

})
chNum.addEventListener("input", () => {
    console.log(lenCheck)

    if (chNum.checked) {
        if (chkCount < 4) chkCount++;
    }
    else {
        if (chkCount > 0) chkCount--;
    }
    BarColor(lenCheck);

})
chSym.addEventListener("input", () => {
    console.log(lenCheck)

    if (chSym.checked) {
        if (chkCount < 4) chkCount++;
    }
    else {
        if (chkCount > 0) chkCount--;
    }

    BarColor(lenCheck);
})

copyPass[0].addEventListener("click", () => {
    if (pwdBox.innerHTML == "P4$5W0rD!" ||pwdBox.innerHTML == "" ) {
        alert("No password generated");
    }
    else {
        navigator.clipboard.writeText(pwdBox.innerHTML);
        document.getElementsByClassName("cpy")[0].innerHTML = "password copied";
    }
})