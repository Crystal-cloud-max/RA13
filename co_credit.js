"use strict";

window.addEventListener("load", function () {
    //retrieve field/value pairs from URL
    var orderData = location.search.slice(1);
    orderData = orderData.replace(/\+/g, " ");
    orderData = decodeURIComponent(orderData);

    //write field values to order form fields
    var orderFields = orderData.split(/[&=]/g);
    document.forms.order.modelName.value = orderFields[3];
    document.forms.order.modelQty.value = orderFields[5];
    document.forms.order.orderCost.value = orderFields[7];
    document.forms.order.shippingType.value = orderFields[9];
    document.forms.order.shippingCost.value = orderFields[13];
    document.forms.order.subTotal.value = orderFields[15];
    document.forms.order.salesTax.value = orderFields[17];
    document.forms.order.cartTotal.value = orderFields[19];
});

//run functions after browser reloads upon click or input
window.addEventListener("load", function () {
    document.getElementById("subButton").onclick = runSubmit;
    document.getElementById("cardHolder").oninput = validateName;
    document.getElementById("cardNumber").oninput = validateNumber;
    document.getElementById("expDate").oninput = validateDate;
    document.getElementById("cvc").oninput = validateCVC;

});

//Runs validation tests when the submit button is clicked
function runSubmit() {
    validateName();
    validateCredit();
    validateNumber();
    validateDate();
    validateCVC();
}

//Validates that the user has entered a valid expiration date for the credit card
function validateDate() {
    var cardDate = document.getElementById("expDate");
    if (cardDate.validity.valueMissing) {//if no user input for exp date
        cardDate.setCustomValidity("Enter the expiration date");
    }
    else if (/^(0[1-9]|1[0-2])\/20[12]\d$/.test(cardDate.value) === false) {
        cardDate.setCustomValidity("Enter a valid expiration date");//invalid
    }
    else {//validate
        cardDate.setCustomValidity("");
    }
}

//Validates that the user has specified the name on the credit card
function validateName() {
   var cardName = document.getElementById("cardHolder");
   if (cardName.validity.valueMissing) {//if no user input for name
      cardName.setCustomValidity("Enter the card holder");
   }
   else {//validate
      cardName.setCustomValidity("");
   }
}

//Validates that the user has selected a credit card type
function validateCredit() {
    //get 1st credit card selected for user buttons
   var creditCard = document.forms.credit.elements.company[0];
   if (creditCard.validity.valueMissing) {//if no card selected
      creditCard.setCustomValidity("Select your credit card");
   }
   else {//validate
      creditCard.setCustomValidity("");
   }
}
////Validates that the user has entered a valid and legitimate card number
function validateNumber() {
   var cardNumber = document.getElementById("cardNumber");
   if (cardNumber.validity.valueMissing) {//if no credit card no input
      cardNumber.setCustomValidity("Enter your card number");
   }
   else if (cardNumber.validity.patternMismatch) {//if invalid cc no
      cardNumber.setCustomValidity("Enter a valid card number");
   }
   else if (luhn(cardNumber.value) === false) {//if inlegitimate entered
      cardNumber.setCustomValidity("Enter a legitimate card number");
   }
   else {//validate
      cardNumber.setCustomValidity("");
   }
}

//Validates the credit card CVC number
function validateCVC() {
   var cardCVC = document.getElementById("cvc");
   var creditCard = document.querySelector('input[name="company"]:checked').value;
   
  if (cardCVC.validity.valueMissing) {//if no user input for cvc
    cardCVC.setCustomValidity("Enter your code CVC number");
  }
  else if ((creditCard === "amex") && (/^\d{4}$/.test(cardCVC.value) === false)) {//if amex input
   cardCVC.setCustomValidity("Enter a 4-digit CVC number");
  }
  else if ((creditCard !== "amex") && (/^\d{3}$/.test(cardCVC.value) === false)) {
   cardCVC.setCustomValidity("Enter a 3-digit CVC number");//other card than amex
  }
  else {//validate
   cardCVC.setCustomValidity("");
  }
}

//Sums the digits characters in a text string
function sumDigits(numStr) {
    var digitTotal = 0; 
    //loop to add character of num string to a float to total
   for (var i = 0; i < numStr.length; i++) {
      digitTotal += parseInt(numStr.charAt(i));
   }
   return digitTotal;
}

//Returns true of idNum satisfies the Luhn Algorithm
function luhn(idNum) {
   var string1 = "";
   var string2 = "";
   
   // Retrieve the odd-numbered digits
   for (var i = idNum.length - 1; i >= 0; i-= 2) {
      string1 += idNum.charAt(i);
   }
   // Retrieve the even-numbered digits and double them
   for (var i = idNum.length - 2; i >= 0; i-= 2) {
      string2 += 2 * idNum.charAt(i);
   }
   
   // Return whether the sum of the digits is divisible by 10
   return sumDigits(string1 + string2) % 10 === 0;
}
