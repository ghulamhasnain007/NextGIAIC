"use strict";
const form = document.querySelector('.new-item-form');
const type = document.querySelector('#type');
const tofrom = document.querySelector('#tofrom');
const details = document.querySelector('#details');
const amount = document.querySelector('#amount');
const viewfinance = document.querySelector('#view-finance');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newEntry = {
        type: type.value,
        tofrom: tofrom.value,
        details: details.value,
        amount: amount.valueAsNumber,
    };
    let storedData = localStorage.getItem('finance');
    let finance = [];
    if (storedData) {
        finance = JSON.parse(storedData);
    }
    finance.unshift(newEntry); // Add the newEntry object directly to the finance array
    localStorage.setItem('finance', JSON.stringify(finance));
    displayFinance(); // Update the view after adding a new entry
});
function displayFinance() {
    const storedData = localStorage.getItem('finance');
    let finance = [];
    if (storedData) {
        finance = JSON.parse(storedData);
    }
    viewfinance.innerHTML = ''; // Clear the current view
    finance.forEach(entry => {
        const div = document.createElement('div');
        div.classList.add('finance-entry');
        // Use entry properties correctly
        div.innerHTML = `
            <p><strong>Type:</strong> ${entry.type}</p>
            <p><strong>To/From:</strong> ${entry.tofrom}</p>
            <p><strong>Details:</strong> ${entry.details}</p>
            <p><strong>Amount:</strong> £${entry.amount}</p>
            <hr>
        `;
        viewfinance.appendChild(div);
    });
}
// Initial display of finance data
displayFinance();
