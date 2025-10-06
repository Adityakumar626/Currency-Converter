let BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies/"

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let swapIcon = document.querySelector(".fa-arrow-right-arrow-left");


swapIcon.addEventListener("click", () => {
    [fromCurr.value, toCurr.value] = [toCurr.value, fromCurr.value];
    updateFlag(fromCurr);
    updateFlag(toCurr);
    updateExchangerate();
});


for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    };
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


const updateFlag = (element) => {
    let currCode = element.value; // inr usd 
    let countryCode = countryList[currCode]; // in us 
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const updateExchangerate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 0) {
        amtVal = 1;
        amount.value = "1";
    }
    
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    console.log(fromCurr.value, toCurr.value);
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[`${fromCurr.value.toLowerCase()}`][`${toCurr.value.toLowerCase()}`];
    // console.log(response);
    // console.log(data);
    // console.log(rate);
    let finalAmt = rate * amtVal;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${toCurr.value}`
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangerate();
});

window.addEventListener("load", () => {
    updateExchangerate();
})