const formatCurrencyLBP = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LBP",
    minimumFractionDigits: 2,
  }).format(number);
};
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("convertForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      fetch("https://rate.onrender.com/api/v1/dollarRate", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          const userInput = document.getElementById("numberInput").value;
          const givenNumber = userInput;
          let conversionRate = result.buy_rate;
          conversionRate = conversionRate.replace(/,/g, ".");
          console.log("conversionRate", conversionRate);
          const totalInDollars = givenNumber * conversionRate;
          console.log("given ", givenNumber);
          document.getElementById(
            "result"
          ).innerHTML = `Result: ${formatCurrencyLBP(totalInDollars)}`;
        })
        .catch((error) => console.log("error", error));
    });
});

var requestOptions = {
  method: "GET",
  redirect: "follow",
};
let resetBtn = document.getElementById("limpar");
resetBtn.addEventListener("click", () => {
  document.getElementById("result").innerHTML = "";
});

fetch("https://rate.onrender.com/api/v1/dollarRate", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    let conversionRate = result.buy_rate;
    conversionRate = conversionRate.replace(/,/g, ".");
    let dollarDisabledInput = document.getElementById("dollarInp");
    dollarDisabledInput.value = conversionRate;
  })
  .catch((error) => console.log("error", error));
