"use strict";

//run functions after browser reloads
window.addEventListener("load", function () {
    var cartForm = document.forms.cart;
    //calculate cost of the order
    calcCart();//call

    //event handler for web form to change
    cartForm.elements.modelQty.onchange = calcCart;

    //loops thru every option in group of shipping option buttons
    var shippingOptions = document.querySelectorAll("input[name='shipping']");
    for (var i = 0; i < shippingOptions.length; i++) {
        shippingOptions[i].onclick = calcCart;
    }
});
//Calculates the cost of the customer order
function calcCart() {
    //create variables by getting name attributes

    //model cost value for expresso machine
    var cartForm = document.forms.cart;
    var mCost = cartForm.elements.modelCost.value;

    //quantity value for number of machines ordered from select menu
    var qIndex = cartForm.elements.modelQty.selectedIndex;
    var quantity = cartForm.elements.modelQty[qIndex].value;

    //cost of espresso machine stored in modelCost field * qty of machines ordered stored in modelQty field
    var orderCost = mCost * quantity;

    //display orderCost value in orderCost field formatted as U.S. currency
    cartForm.elements.orderCost.value = formatUSCurrency(orderCost);

    //cost = to value of selected shipping options from group of shipping option buttons * qty
    var shipCost = document.querySelector("input[name='shipping']:checked").value * quantity;

    //display input value of Shipping Cost displayed in Shipping field formatted with 1000s separator and 2 decimal places
    cartForm.elements.shippingCost.value = formatNumber(shipCost, 2);

    //display Subtotal before tax for sum of orderCost and shipCost formatted with 1000s separatar and to 2 decimal places
    cartForm.elements.subTotal.value = formatNumber(orderCost + shipCost, 2);

    //display value of Tax in salesTax field formatted with thousands separator to 2 decimals
    var salesTax = 0.05 * (orderCost + shipCost);
    cartForm.elements.salesTax.value = formatNumber(salesTax, 2);

    //display TOTAL for sum of orderCost,shipCost,and salesTax.Format the value as U.S. currency
    cartForm.elements.cartTotal.value = formatUSCurrency(orderCost + shipCost + salesTax);

    //store label text of shipping options selected by user from shipping field in hidden field
    cartForm.elements.shippingType.value = document.querySelector("input[name='shipping']:checked").nextSibling.nodeValue;
}

/*Format a numeric value, val, using the local
numeric format to the number of decimal
places specified by decimals*/
function formatNumber(val, decimals) {
    return val.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

//Formats val as U.S.A. currency 
function formatUSCurrency(val) {
    return val.toLocaleString('en-US', { style: "currency", currency: "USD" });
}









